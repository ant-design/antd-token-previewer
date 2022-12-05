import { CaretRightOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import {
  Button,
  Checkbox,
  Collapse,
  ConfigProvider,
  Dropdown,
  Popover,
  Switch,
  theme as antdTheme,
  Tooltip,
  Typography,
} from 'antd';
import type { MutableTheme } from 'antd-token-previewer';
import type { ThemeConfig } from 'antd/es/config-provider/context';
import classNames from 'classnames';
import type { FC } from 'react';
import React, { useEffect, useMemo, useState } from 'react';
import { useDebouncyFn } from 'use-debouncy';
import ColorPanel from '../ColorPanel';
import { DarkTheme, Light, Pick } from '../icons';
import type { IconSwitchProps } from '../IconSwitch';
import IconSwitch from '../IconSwitch';
import type { SelectedToken } from '../interface';
import type { TokenCategory, TokenGroup } from '../meta/interface';
import tokenMeta from '../meta/token-meta.json';
import { mapRelatedAlias } from '../meta/TokenRelation';
import getDesignToken from '../utils/getDesignToken';
import makeStyle from '../utils/makeStyle';
import { getRelatedComponents } from '../utils/statistic';
import InputNumberPlus from './InputNumberPlus';
import TokenDetail from './TokenDetail';
import TokenPreview from './TokenPreview';

const { Panel } = Collapse;
const { darkAlgorithm } = antdTheme;

const useStyle = makeStyle('ColorTokenContent', (token) => ({
  '.token-panel-pro-color': {
    height: '100%',
    display: 'flex',
    '.token-panel-pro-color-seeds': {
      height: '100%',
      flex: 1,
      width: 0,
      borderInlineEnd: `1px solid ${token.colorBorderSecondary}`,
      display: 'flex',
      flexDirection: 'column',
      boxSizing: 'border-box',

      '.token-panel-pro-color-themes': {
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
        flex: '0 0 60px',

        '> span': {
          fontSize: token.fontSizeLG,
          fontWeight: token.fontWeightStrong,
        },
      },
    },
    [`.token-panel-pro-token-collapse${token.rootCls}-collapse`]: {
      flex: 1,
      overflow: 'auto',
      [`> ${token.rootCls}-collapse-item-active`]: {
        backgroundColor: '#fff',
        boxShadow:
          '0 6px 16px -8px rgba(0,0,0,0.08), 0 9px 28px 0 rgba(0,0,0,0.05), 0 12px 48px -8px rgba(0,0,0,0.03), inset 0 0 0 2px #1677FF',
        transition: 'box-shadow 0.2s ease-in-out',
        borderRadius: 8,
      },
      [`> ${token.rootCls}-collapse-item > ${token.rootCls}-collapse-content > ${token.rootCls}-collapse-content-box`]:
        {
          paddingBlock: '0 12px',
        },

      '.token-panel-pro-token-collapse-description': {
        color: token.colorTextTertiary,
        marginBottom: 16,
      },

      '.token-panel-pro-token-collapse-subtitle': {
        color: token.colorTextSecondary,
        fontSize: 12,
      },

      '.token-panel-pro-token-collapse-seed-block': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',

        '+ .token-panel-pro-token-collapse-seed-block': {
          marginTop: 8,
        },

        '&-name-cn': {
          fontWeight: token.fontWeightStrong,
          marginInlineEnd: 4,
        },

        '&-name': {
          color: token.colorTextTertiary,
        },

        '&-sample': {
          '&:not(:last-child)': {
            marginInlineEnd: 16,
          },

          '&-theme': {
            color: token.colorTextTertiary,
            marginBottom: 2,
            fontSize: 12,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          },

          '&-card': {
            cursor: 'pointer',
            border: `1px solid ${token.colorBorderSecondary}`,
            borderRadius: 4,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '4px 8px',

            '&-value': {
              fontFamily: 'Monaco,'.concat(token.fontFamily),
            },
          },
        },
      },

      [`.token-panel-pro-token-collapse-map-collapse${token.rootCls}-collapse`]:
        {
          borderRadius: 4,
          backgroundColor: '#fff',

          [`> ${token.rootCls}-collapse-item`]: {
            '&:not(:first-child)': {
              [`> ${token.rootCls}-collapse-header`]: {
                [`> ${token.rootCls}-collapse-header-text`]: {
                  '.token-panel-pro-token-collapse-map-collapse-preview': {
                    '.token-panel-pro-token-collapse-map-collapse-preview-color':
                      {
                        marginTop: -1,
                      },
                  },
                },
              },
            },
            [`> ${token.rootCls}-collapse-header`]: {
              padding: { value: '0 12px 0 16px', _skip_check_: true },

              [`> ${token.rootCls}-collapse-expand-icon`]: {
                alignSelf: 'center',
              },

              [`> ${token.rootCls}-collapse-header-text`]: {
                flex: 1,

                '.token-panel-pro-token-collapse-map-collapse-token': {
                  color: token.colorTextSecondary,
                  marginInlineStart: 4,
                  marginInlineEnd: 8,
                },

                '.token-panel-pro-token-collapse-map-collapse-preview': {
                  display: 'flex',
                  flex: 'none',
                  '.token-panel-pro-token-collapse-map-collapse-preview-color':
                    {
                      height: 56,
                      width: 56,
                      position: 'relative',
                      borderInline: '1px solid #e8e8e8',
                    },
                  '> *': {
                    marginInlineEnd: 8,
                  },
                },
              },
            },

            [`> ${token.rootCls}-collapse-content > ${token.rootCls}-collapse-content-box`]:
              {
                padding: '0',
              },
          },
        },
    },

    '.token-panel-pro-token-collapse-map-collapse-count': {
      color: token.colorTextSecondary,
      display: 'inline-block',
      fontSize: 12,
      lineHeight: '16px',
      padding: '0 6px',
      backgroundColor: token.colorFillAlter,
      borderRadius: 999,
    },

    '.token-panel-pro-token-pick': {
      transition: 'color 0.3s',
    },

    '.token-panel-pro-token-picked': {
      color: token.colorPrimary,
    },

    [`.token-panel-pro-grouped-map-collapse${token.rootCls}-collapse`]: {
      borderRadius: 4,
      [`> ${token.rootCls}-collapse-item`]: {
        [`> ${token.rootCls}-collapse-header`]: {
          padding: '6px 12px',
          color: token.colorIcon,
          fontSize: 12,
          lineHeight: token.lineHeightSM,
          [`${token.rootCls}-collapse-expand-icon`]: {
            lineHeight: '20px',
            height: 20,
          },
        },
        [`> ${token.rootCls}-collapse-content > ${token.rootCls}-collapse-content-box`]:
          {
            padding: 0,

            [`.token-panel-pro-token-collapse-map-collapse${token.rootCls}-collapse`]:
              {
                border: 'none',

                [`${token.rootCls}-collapse-item:last-child`]: {
                  borderBottom: 'none',
                },
              },
          },
      },
    },
  },
}));

export type SeedTokenProps = {
  theme: MutableTheme;
  tokenName: string;
  disabled?: boolean;
  simple?: boolean;
};

const getSeedValue = (config: ThemeConfig, token: string) => {
  // @ts-ignore
  return config.token?.[token] ?? getDesignToken(config)[token];
};

const seedRange: Record<string, { min: number; max: number }> = {
  borderRadius: {
    min: 0,
    max: 16,
  },
  fontSize: {
    min: 12,
    max: 32,
  },
  sizeStep: {
    min: 0,
    max: 16,
  },
  sizeUnit: {
    min: 0,
    max: 16,
  },
};

const SeedTokenPreview: FC<SeedTokenProps> = ({
  theme,
  tokenName,
  disabled,
  simple,
}) => {
  const tokenPath = ['token', tokenName];
  const [tokenValue, setTokenValue] = useState(
    getSeedValue(theme.config, tokenName),
  );

  const debouncedOnChange = useDebouncyFn((newValue: number | string) => {
    theme.onThemeChange?.(
      {
        ...theme.config,
        token: {
          ...theme.config.token,
          [tokenName]: newValue,
        },
      },
      ['token', tokenName],
    );
  }, 500);

  const handleChange = (value: any) => {
    setTokenValue(value);
    debouncedOnChange(value);
  };

  useEffect(() => {
    setTokenValue(getSeedValue(theme.config, tokenName));
  }, [theme.config, tokenName]);

  return (
    <div className="token-panel-pro-token-collapse-seed-block-sample">
      <div className="token-panel-pro-token-collapse-seed-block-sample-theme">
        <span>{simple ? '\u00A0' : theme.name}</span>
        {theme.getCanReset?.(tokenPath) && (
          <Typography.Link
            style={{
              fontSize: 12,
              padding: 0,
            }}
            onClick={() => theme.onReset?.(tokenPath)}
          >
            重置
          </Typography.Link>
        )}
      </div>
      {tokenName.startsWith('color') && (
        <Dropdown
          disabled={disabled}
          trigger={['click']}
          overlay={<ColorPanel color={tokenValue} onChange={handleChange} />}
        >
          <div className="token-panel-pro-token-collapse-seed-block-sample-card">
            <div
              style={{
                backgroundColor: tokenValue,
                width: 48,
                height: 32,
                borderRadius: 4,
                marginRight: 14,
                boxShadow:
                  '0 2px 3px -1px rgba(0,0,0,0.20), inset 0 0 0 1px rgba(0,0,0,0.09)',
              }}
            />
            <div className="token-panel-pro-token-collapse-seed-block-sample-card-value">
              {tokenValue}
            </div>
          </div>
        </Dropdown>
      )}
      {['fontSize', 'sizeUnit', 'sizeStep', 'borderRadius'].includes(
        tokenName,
      ) && (
        <Popover
          trigger="click"
          placement="bottomRight"
          overlayStyle={{ width: 220 }}
          content={
            <InputNumberPlus
              value={tokenValue}
              onChange={handleChange}
              min={seedRange[tokenName].min}
              max={seedRange[tokenName].max}
            />
          }
        >
          <div className="token-panel-pro-token-collapse-seed-block-sample-card">
            <div className="token-panel-pro-token-collapse-seed-block-sample-card-value">
              {tokenValue}
            </div>
          </div>
        </Popover>
      )}
      {tokenName === 'wireframe' && (
        <Switch checked={tokenValue} onChange={handleChange} />
      )}
    </div>
  );
};

export type MapTokenCollapseContentProps = {
  mapTokens?: string[];
  themes: MutableTheme[];
  selectedTokens?: SelectedToken;
  onTokenSelect?: (token: string | string[], type: keyof SelectedToken) => void;
  type?: string;
};

const MapTokenCollapseContent: FC<MapTokenCollapseContentProps> = ({
  mapTokens,
  themes,
  onTokenSelect,
  selectedTokens,
  type,
}) => {
  //
  return (
    <Collapse className="token-panel-pro-token-collapse-map-collapse">
      {mapTokens?.map((mapToken) => (
        <Panel
          header={
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ flex: 1 }}>
                <span style={{ fontWeight: 500 }}>
                  {(tokenMeta as any)[mapToken]?.name}
                </span>
                <span className="token-panel-pro-token-collapse-map-collapse-token">
                  {mapToken}
                </span>
                <span className="token-panel-pro-token-collapse-map-collapse-count">
                  {
                    getRelatedComponents([
                      mapToken,
                      ...((mapRelatedAlias as any)[mapToken] ?? []),
                    ]).length
                  }
                </span>
              </div>
              <div className="token-panel-pro-token-collapse-map-collapse-preview">
                {themes.map((themeItem) => (
                  <div
                    key={themeItem.key}
                    className="token-panel-pro-token-collapse-map-collapse-preview-color"
                  >
                    <TokenPreview
                      theme={themeItem.config}
                      tokenName={mapToken}
                      type={type}
                    />
                  </div>
                ))}
              </div>
              <div
                style={{ flex: 'none', margin: 4 }}
                onClick={(e) => {
                  e.stopPropagation();
                  onTokenSelect?.(mapToken, 'map');
                }}
              >
                <Pick
                  className={classNames('token-panel-pro-token-pick', {
                    'token-panel-pro-token-picked':
                      selectedTokens?.map?.includes(mapToken),
                  })}
                />
              </div>
            </div>
          }
          key={mapToken}
        >
          <TokenDetail
            style={{ margin: 8 }}
            themes={themes}
            path={['token']}
            tokenName={mapToken}
          />
        </Panel>
      ))}
    </Collapse>
  );
};

const mapGroupTitle: any = {
  fill: '填充',
  background: '背景',
  text: '文本',
  border: '描边',
};

export type MapTokenCollapseProps = {
  themes: MutableTheme[];
  group: TokenGroup<string>;
  selectedTokens?: SelectedToken;
  onTokenSelect?: (token: string | string[], type: keyof SelectedToken) => void;
  groupFn?: (token: string) => string;
};

const MapTokenCollapse: FC<MapTokenCollapseProps> = ({
  themes,
  onTokenSelect,
  selectedTokens,
  groupFn,
  group,
}) => {
  const groupedTokens = useMemo(() => {
    const grouped: Record<string, string[]> = {};
    if (groupFn) {
      group.mapToken?.forEach((token) => {
        const key = groupFn(token) ?? 'default';
        grouped[key] = [...(grouped[key] ?? []), token];
      });
    }
    return grouped;
  }, [group, groupFn]);

  if (groupFn) {
    return (
      <Collapse
        className="token-panel-pro-grouped-map-collapse"
        defaultActiveKey={Object.keys(groupedTokens)}
        expandIconPosition="end"
        expandIcon={({ isActive }) => (
          <CaretRightOutlined
            rotate={isActive ? 450 : 360}
            style={{ fontSize: 12 }}
          />
        )}
      >
        {(group.mapTokenGroups ?? Object.keys(groupedTokens)).map((key) => (
          <Panel key={key} header={mapGroupTitle[key] ?? ''}>
            <MapTokenCollapseContent
              mapTokens={groupedTokens[key]}
              themes={themes}
              selectedTokens={selectedTokens}
              onTokenSelect={onTokenSelect}
              type={group.type}
            />
          </Panel>
        ))}
      </Collapse>
    );
  }

  if (group.groups) {
    return (
      <Collapse
        className="token-panel-pro-grouped-map-collapse"
        defaultActiveKey={group.groups.map((item) => item.key)}
        expandIconPosition="end"
        expandIcon={({ isActive }) => (
          <CaretRightOutlined
            rotate={isActive ? 450 : 360}
            style={{ fontSize: 12 }}
          />
        )}
      >
        {group.groups.map((item) => (
          <Panel key={item.key} header={item.name}>
            <MapTokenCollapseContent
              mapTokens={item.mapToken}
              themes={themes}
              selectedTokens={selectedTokens}
              onTokenSelect={onTokenSelect}
              type={item.type}
            />
          </Panel>
        ))}
      </Collapse>
    );
  }

  return (
    <MapTokenCollapseContent
      mapTokens={group.mapToken ?? []}
      themes={themes}
      selectedTokens={selectedTokens}
      onTokenSelect={onTokenSelect}
      type={group.type}
    />
  );
};

const groupMapToken = (token: string): string => {
  if (token.startsWith('colorFill')) {
    return 'fill';
  }
  if (token.startsWith('colorBorder') || token.startsWith('colorSplit')) {
    return 'border';
  }
  if (token.startsWith('colorBg')) {
    return 'background';
  }
  if (token.startsWith('colorText')) {
    return 'text';
  }
  return '';
};

export type ColorTokenContentProps = {
  category: TokenCategory<string>;
  themes: MutableTheme[];
  selectedTokens?: SelectedToken;
  onTokenSelect?: (token: string | string[], type: keyof SelectedToken) => void;
  infoFollowPrimary?: boolean;
  onInfoFollowPrimaryChange?: (value: boolean) => void;
  activeGroup: string;
  onActiveGroupChange: (value: string) => void;
  activeTheme?: string;
  onActiveThemeChange?: (theme: string) => void;
  simple?: boolean;
};

const TokenContent: FC<ColorTokenContentProps> = ({
  category,
  themes,
  selectedTokens,
  onTokenSelect,
  infoFollowPrimary,
  onInfoFollowPrimaryChange,
  activeGroup,
  onActiveGroupChange,
  activeTheme = 'default',
  onActiveThemeChange,
  simple,
}) => {
  const [wrapSSR, hashId] = useStyle();
  const [grouped, setGrouped] = useState<boolean>(true);

  const handleThemeChange: IconSwitchProps['onChange'] = (value) => {
    onActiveThemeChange?.(value ? themes[0].key : 'dark');
  };

  return wrapSSR(
    <div className={classNames(hashId, 'token-panel-pro-color')}>
      <div className="token-panel-pro-color-seeds">
        <div className="token-panel-pro-color-themes">
          <span style={{ marginRight: 12 }}>定制主题</span>
          <IconSwitch
            onChange={handleThemeChange}
            leftChecked={
              themes.length === 1
                ? themes[0].config.algorithm !== darkAlgorithm
                : activeTheme !== 'dark'
            }
            leftIcon={<Light />}
            rightIcon={<DarkTheme />}
            style={{ marginLeft: 'auto' }}
          />
        </div>
        <ConfigProvider
          theme={{
            token: {
              colorBorder: '#f0f0f0',
            },
          }}
        >
          <Collapse
            className="token-panel-pro-token-collapse"
            expandIconPosition="end"
            ghost
            accordion
            activeKey={activeGroup}
            expandIcon={({ isActive }) => (
              <CaretRightOutlined
                rotate={isActive ? 450 : 360}
                style={{ fontSize: 12 }}
              />
            )}
            onChange={(key) => {
              onActiveGroupChange(key as string);
            }}
          >
            {category.groups.map((group, index) => {
              return (
                <Panel
                  header={<span style={{ fontWeight: 500 }}>{group.name}</span>}
                  key={group.key}
                >
                  <div>
                    <div className="token-panel-pro-token-collapse-description">
                      {group.desc}
                    </div>
                    {group.seedToken?.map((seedToken) => (
                      <div
                        key={seedToken}
                        className="token-panel-pro-token-collapse-seed-block"
                      >
                        <div style={{ marginRight: 'auto' }}>
                          <div className="token-panel-pro-token-collapse-subtitle">
                            <span style={{ fontSize: 12 }}>Seed Token</span>
                            <Tooltip
                              placement="topLeft"
                              arrowPointAtCenter
                              title="基础变量（Seed Token）意味着所有设计意图的起源。在 Ant Design 中，我们会基于 Seed Token 自动派生一套具有设计语义的梯度变量（Map Token）。"
                            >
                              <QuestionCircleOutlined
                                style={{ fontSize: 14, marginLeft: 8 }}
                              />
                            </Tooltip>
                          </div>
                          <div>
                            <span className="token-panel-pro-token-collapse-seed-block-name-cn">
                              {(tokenMeta as any)[seedToken]?.name}
                            </span>
                            {seedToken === 'colorInfo' && (
                              <Checkbox
                                style={{ marginLeft: 12 }}
                                checked={infoFollowPrimary}
                                onChange={(e) =>
                                  onInfoFollowPrimaryChange?.(e.target.checked)
                                }
                              >
                                跟随主色
                              </Checkbox>
                            )}
                          </div>
                        </div>
                        {themes.map((themeItem) => (
                          <SeedTokenPreview
                            simple={simple}
                            key={themeItem.key}
                            theme={themeItem}
                            tokenName={seedToken}
                            disabled={
                              seedToken === 'colorInfo' && infoFollowPrimary
                            }
                          />
                        ))}
                      </div>
                    ))}
                    {(group.mapToken || group.groups) && (
                      <div style={{ marginTop: 16, marginBottom: 24 }}>
                        <div
                          className="token-panel-pro-token-collapse-subtitle"
                          style={{
                            marginBottom: 10,
                            display: 'flex',
                            alignItems: 'center',
                          }}
                        >
                          <span>Map Token</span>
                          <Tooltip
                            placement="topLeft"
                            arrowPointAtCenter
                            title="梯度变量（Map Token） 是基于 Seed 派生的梯度变量，我们精心设计的梯度变量模型具有良好的视觉设计语义，可在亮暗色模式切换时保证视觉梯度的一致性。"
                          >
                            <QuestionCircleOutlined
                              style={{ fontSize: 14, marginLeft: 8 }}
                            />
                          </Tooltip>
                          {group.mapTokenGroups && (
                            <div
                              style={{
                                marginLeft: 'auto',
                                display: 'flex',
                                alignItems: 'center',
                              }}
                            >
                              <label style={{ marginRight: 4 }}>分组显示</label>
                              <Switch
                                checked={grouped}
                                onChange={(v) => setGrouped(v)}
                                size="small"
                              />
                            </div>
                          )}
                        </div>
                        <MapTokenCollapse
                          group={group}
                          themes={themes}
                          selectedTokens={selectedTokens}
                          onTokenSelect={onTokenSelect}
                          groupFn={
                            group.mapTokenGroups && grouped
                              ? groupMapToken
                              : undefined
                          }
                        />
                      </div>
                    )}
                    {index < category.groups.length - 1 && (
                      <Button
                        type="primary"
                        style={{ borderRadius: 4, marginBottom: 12 }}
                        onClick={() =>
                          onActiveGroupChange(category.groups[index + 1]?.key)
                        }
                      >
                        下一步
                      </Button>
                    )}
                  </div>
                </Panel>
              );
            })}
          </Collapse>
        </ConfigProvider>
      </div>
    </div>,
  );
};

export default TokenContent;
