import { CaretRightOutlined, ExpandOutlined } from '@ant-design/icons';
import {
  Collapse,
  ConfigProvider,
  Input,
  Popover,
  Segmented,
  Switch,
  theme as antdTheme,
  Tooltip,
} from 'antd';
import type { MutableTheme } from 'antd-token-previewer';
import type { ThemeConfig } from 'antd/es/config-provider/context';
import seed from 'antd/es/theme/themes/seed';
import tokenMeta from 'antd/lib/version/token-meta.json';
import classNames from 'classnames';
import type { FC } from 'react';
import React, { useEffect, useMemo, useState } from 'react';
import { useDebouncyFn } from 'use-debouncy';
import ColorPanel from '../ColorPanel';
import { useAdvanced } from '../context';
import type { ThemeCode } from '../hooks/useControlledTheme';
import { themeMap } from '../hooks/useControlledTheme';
import { CompactTheme, DarkTheme, Light } from '../icons';
import type { SelectedToken } from '../interface';
import { useLocale } from '../locale';
import type { TokenCategory, TokenGroup } from '../meta/interface';
import { HIGHLIGHT_COLOR } from '../utils/constants';
import getDesignToken from '../utils/getDesignToken';
import makeStyle from '../utils/makeStyle';
import InputNumberPlus from './InputNumberPlus';
import ResetTokenButton from './ResetTokenButton';
import TokenPreview from './TokenPreview';

const { Panel } = Collapse;

const useStyle = makeStyle('ColorTokenContent', (token) => ({
  '.token-panel-pro-color': {
    height: 'auto',
    display: 'flex',
    '.token-panel-pro-color-seeds': {
      height: '100%',
      flex: 1,
      width: 0,
      display: 'flex',
      flexDirection: 'column',
      boxSizing: 'border-box',
      borderBottom: `1px solid ${token.colorBorderSecondary}`,

      '.token-panel-pro-color-themes': {
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
        flex: '0 0 60px',
        borderBlockEnd: `1px solid ${token.colorBorderSecondary}`,
        color: token.colorText,
        fontWeight: token.fontWeightStrong,

        '> span': {
          fontSize: token.fontSizeLG,
        },
      },
    },
    '.token-panel-pro-token-list': {
      flex: 1,
      overflow: 'auto',

      '.token-panel-pro-token-item': {
        display: 'flex',
        flexWrap: 'wrap',

        '&-seed': {
          width: '100%',
          padding: '18px 18px 8px 14px',
        },

        [`&:not(:last-child)`]: {
          borderBlockEnd: `1px solid ${token.colorBorderSecondary}`,
        },
      },

      '.token-panel-pro-token-item-header': {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        width: '100%',

        '> *': {
          marginBottom: 10,
        },

        '.token-panel-pro-token-item-header-title': {
          marginInlineEnd: 4,
          fontSize: token.fontSize,
          lineHeight: token.lineHeight,
          color: token.colorText,
        },

        '&-follow-primary': {
          marginLeft: 'auto',
          fontSize: 12,
          display: 'flex',
          alignItems: 'center',
          color: token.colorText,
        },
      },

      '.token-panel-pro-token-list-description': {
        color: token.colorTextTertiary,
        marginBottom: 16,
      },

      '.token-panel-pro-token-list-subtitle': {
        color: token.colorTextSecondary,
        fontSize: 12,
      },

      '.token-panel-pro-token-list-seed-block': {
        width: '100%',
        display: 'flex',
        alignItems: 'center',

        '+ .token-panel-pro-token-list-seed-block': {
          marginTop: 12,
        },

        '&-name-cn': {
          fontSize: token.fontSize,
          fontWeight: token.fontWeightStrong,
          marginInlineEnd: 4,
          color: token.colorText,
        },

        '&-subtitle': {
          fontSize: token.fontSizeSM,
          color: token.colorTextTertiary,
          marginInlineEnd: 4,
        },

        '&-sample': {
          flex: 'none',
          position: 'relative',

          '&:not(:last-child)': {
            marginInlineEnd: 16,
          },

          '&-theme': {
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: -8,
            margin: 'auto',
            transform: 'translateX(-100%)',
            height: 22,
          },

          '&-card': {
            cursor: 'pointer',
            border: `1px solid ${token.colorBorderSecondary}`,
            borderRadius: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '6px 8px',

            '&-value': {
              fontFamily: 'Monaco,Monospace'.concat(token.fontFamily),
              fontSize: 14,
              color: token.colorTextSecondary,
            },
          },
        },
      },

      [`.token-panel-pro-token-list-map-collapse${token.rootCls}-collapse`]: {
        borderRadius: 0,
        borderTop: `1px solid ${token.colorBorderSecondary}`,

        [`> ${token.rootCls}-collapse-item`]: {
          [`> ${token.rootCls}-collapse-header`]: {
            padding: `8px 15px`,
            color: token.colorTextSecondary,
            [`> ${token.rootCls}-collapse-expand-icon`]: {
              paddingInlineEnd: 4,
            },
          },

          '.token-panel-pro-token-list-map-collapse-grouped': {
            opacity: 0,
            pointerEvents: 'none',
            transition: 'opacity 0.2s',
            marginLeft: 'auto',
            display: 'flex',
            alignItems: 'center',
            fontSize: 12,
            justifyContent: 'flex-end',
            color: token.colorTextTertiary,
          },

          [`&${token.rootCls}-collapse-item-active`]: {
            '.token-panel-pro-token-list-map-collapse-grouped': {
              opacity: 1,
              pointerEvents: 'auto',
            },
          },
        },
      },

      [`.token-panel-pro-token-collapse-map`]: {
        borderRadius: 0,
        backgroundColor: token.colorBgContainer,
        border: `1px solid ${token.colorSplit}`,
        paddingLeft: 12,
        fontSize: 12,

        '&:not(:last-child)': {
          borderBottom: 'none',
        },

        '.token-panel-pro-token-collapse-map-collapse-token': {
          color: token.colorTextSecondary,
          marginInlineStart: 4,
          marginInlineEnd: 8,
        },

        '.token-panel-pro-token-collapse-map-collapse-preview': {
          display: 'flex',
          flex: 'none',
          borderLeft: `1px solid ${token.colorSplit}`,
          cursor: 'pointer',
          '.token-panel-pro-token-collapse-map-collapse-preview-color': {
            height: 40,
            width: 40,
            position: 'relative',
          },
        },
      },
    },

    '.token-panel-pro-token-collapse-map-collapse-count': {
      color: token.colorTextTertiary,
      display: 'inline-block',
      fontSize: 12,
      lineHeight: '16px',
      padding: '0 6px',
      backgroundColor: token.colorFillTertiary,
      borderRadius: 4,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      marginLeft: 'auto',
      marginRight: 12,
      maxWidth: 100,
      flex: 'none',
      whiteSpace: 'nowrap',
      cursor: 'pointer',
    },

    '.token-panel-pro-token-pick': {
      transition: 'color 0.3s',
    },

    '.token-panel-pro-token-picked': {
      color: token.colorPrimary,
    },

    [`.token-panel-pro-grouped-map-collapse${token.rootCls}-collapse`]: {
      borderRadius: `4px 4px 0 0`,
      [`> ${token.rootCls}-collapse-item`]: {
        [`&:last-child`]: {
          borderRadius: 0,
        },
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

            '.token-panel-pro-token-collapse-map': {
              borderInline: 0,
              '&:last-child': {
                borderBottom: 0,
              },
              '&:first-child': {
                borderTop: 0,
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
  editMode?: boolean;
};

const getSeedValue = (config: ThemeConfig, token: string) => {
  // @ts-ignore
  return config.token?.[token] || seed[token] || getDesignToken(config)[token];
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
  margin: {
    min: 0,
    max: 32,
  },
  padding: {
    min: 0,
    max: 32,
  },
};

const SeedTokenPreview: FC<SeedTokenProps> = ({
  theme,
  tokenName,
  disabled,
  editMode,
}) => {
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

  const tokenGroup = [
    'fontSize',
    'sizeUnit',
    'sizeStep',
    'borderRadius',
    'margin',
    'padding',
  ].find((prefix) => tokenName.startsWith(prefix));

  return (
    <div className="token-panel-pro-token-list-seed-block-sample">
      {tokenName.startsWith('color') &&
        (editMode ? (
          <ColorPanel
            color={tokenValue}
            onChange={handleChange}
            style={{ border: 'none' }}
            alpha
          />
        ) : (
          <Popover
            trigger="click"
            placement="bottomRight"
            overlayInnerStyle={{ padding: 0 }}
            content={
              <ColorPanel
                color={tokenValue}
                onChange={handleChange}
                style={{ border: 'none' }}
              />
            }
          >
            <div
              className="token-panel-pro-token-list-seed-block-sample-card"
              style={{ pointerEvents: disabled ? 'none' : 'auto' }}
            >
              <div
                style={{
                  backgroundColor: tokenValue,
                  width: 48,
                  height: 32,
                  borderRadius: 6,
                  marginRight: 10,
                  boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.09)',
                }}
              />
              <div className="token-panel-pro-token-list-seed-block-sample-card-value">
                {tokenValue}
              </div>
            </div>
          </Popover>
        ))}
      {tokenGroup && (
        <InputNumberPlus
          value={tokenValue}
          onChange={handleChange}
          min={seedRange[tokenGroup].min}
          max={seedRange[tokenGroup].max}
          style={editMode ? { marginInline: 12, paddingBlock: 12 } : undefined}
        />
      )}
      {['boxShadow', 'lineHeight'].some((prefix) =>
        tokenName.startsWith(prefix),
      ) && (
        <div
          style={editMode ? { marginInline: 12, paddingBlock: 12 } : undefined}
        >
          <Input
            value={tokenValue}
            onChange={({ target: { value } }) => handleChange(value)}
          />
        </div>
      )}
      {tokenName === 'wireframe' && (
        <Switch checked={tokenValue} onChange={handleChange} />
      )}
    </div>
  );
};

export type MapTokenCollapseContentProps = {
  mapTokens?: string[];
  theme: MutableTheme;
  selectedTokens?: SelectedToken;
  onTokenSelect?: (token: string | string[], type: keyof SelectedToken) => void;
  type?: string;
};

const MapTokenCollapseContent: FC<MapTokenCollapseContentProps> = ({
  mapTokens,
  theme,
  type,
}) => {
  const locale = useLocale();

  const getMapTokenColor = (token: string) =>
    !!(theme.config.token as any)?.[token] ? HIGHLIGHT_COLOR : '';

  return (
    <>
      {mapTokens?.map((mapToken) => (
        <div
          className="token-panel-pro-token-collapse-map"
          style={{ display: 'flex', alignItems: 'center' }}
          key={mapToken}
        >
          <div
            style={{
              flex: 1,
              whiteSpace: 'nowrap',
              width: 0,
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              marginRight: 8,
            }}
          >
            {locale._lang === 'zh-CN' && (
              <span
                style={{
                  fontWeight: 500,
                  flex: 'none',
                  color: getMapTokenColor(mapToken),
                }}
              >
                {(tokenMeta.global as any)[mapToken]?.name}
              </span>
            )}
            <span
              className="token-panel-pro-token-collapse-map-collapse-token"
              style={{ flex: 'none', color: getMapTokenColor(mapToken) }}
            >
              {mapToken}
            </span>
            <ResetTokenButton theme={theme} tokenName={mapToken} />
          </div>
          <span
            title={(getDesignToken(theme.config) as any)[mapToken]}
            className="token-panel-pro-token-collapse-map-collapse-count"
          >
            {(getDesignToken(theme.config) as any)[mapToken]}
          </span>
          <Popover
            overlayInnerStyle={{ padding: 0 }}
            arrow={false}
            placement="bottomRight"
            trigger="click"
            content={
              <SeedTokenPreview theme={theme} tokenName={mapToken} editMode />
            }
          >
            <div className="token-panel-pro-token-collapse-map-collapse-preview">
              <div className="token-panel-pro-token-collapse-map-collapse-preview-color">
                <TokenPreview
                  theme={theme.config}
                  tokenName={mapToken}
                  type={type}
                />
              </div>
            </div>
          </Popover>
        </div>
      ))}
    </>
  );
};

export type MapTokenCollapseProps = {
  theme: MutableTheme;
  group: TokenGroup<string>;
  selectedTokens?: SelectedToken;
  onTokenSelect?: (token: string | string[], type: keyof SelectedToken) => void;
  groupFn?: (token: string) => string;
};

const MapTokenCollapse: FC<MapTokenCollapseProps> = ({
  theme,
  onTokenSelect,
  selectedTokens,
  groupFn,
  group,
}) => {
  const locale = useLocale();

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
          <Panel key={key} header={(locale as any)[key] ?? ''}>
            <MapTokenCollapseContent
              mapTokens={groupedTokens[key]}
              theme={theme}
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
              theme={theme}
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
      theme={theme}
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
  id: string;
  category: TokenCategory<string>;
  theme: MutableTheme;
  selectedTokens?: SelectedToken;
  onTokenSelect?: (token: string | string[], type: keyof SelectedToken) => void;
  infoFollowPrimary?: boolean;
  onInfoFollowPrimaryChange?: (value: boolean) => void;
  activeGroup: string;
  onActiveGroupChange: (value: string) => void;
};

const TokenContent: FC<ColorTokenContentProps> = ({
  id,
  category,
  theme,
  selectedTokens,
  onTokenSelect,
  infoFollowPrimary,
  onInfoFollowPrimaryChange,
}) => {
  const [wrapSSR, hashId] = useStyle();
  const [grouped, setGrouped] = useState<boolean>(true);
  const locale = useLocale();
  const advanced = useAdvanced();
  const { token } = antdTheme.useToken();

  const switchAlgorithm = (themeStr: 'dark' | 'compact') => () => {
    let newAlgorithm = theme.config.algorithm;
    if (!newAlgorithm) {
      newAlgorithm = themeMap[themeStr];
    } else if (Array.isArray(newAlgorithm)) {
      newAlgorithm = newAlgorithm.includes(themeMap[themeStr])
        ? newAlgorithm.filter((item) => item !== themeMap[themeStr])
        : [...newAlgorithm, themeMap[themeStr]];
    } else {
      newAlgorithm =
        newAlgorithm === themeMap[themeStr]
          ? undefined
          : [newAlgorithm, themeMap[themeStr]];
    }
    theme.onThemeChange?.({ ...theme.config, algorithm: newAlgorithm }, [
      'config',
      'algorithm',
    ]);
  };

  const isLeftChecked = (str: ThemeCode) => {
    if (!theme.config.algorithm) {
      return true;
    }
    return Array.isArray(theme.config.algorithm)
      ? !theme.config.algorithm.includes(themeMap[str])
      : theme.config.algorithm !== themeMap[str];
  };

  return wrapSSR(
    <div className={classNames(hashId, 'token-panel-pro-color')} id={id}>
      <div className="token-panel-pro-color-seeds">
        <div className="token-panel-pro-color-themes">
          <span style={{ marginRight: 12 }}>
            {locale._lang === 'zh-CN' ? category.name : category.nameEn}
          </span>
          {category.nameEn === 'Color' && (
            <Segmented
              options={[
                { icon: <Light style={{ fontSize: 16 }} />, value: 'light' },
                { icon: <DarkTheme style={{ fontSize: 16 }} />, value: 'dark' },
              ]}
              onChange={switchAlgorithm('dark')}
              value={isLeftChecked('dark') ? 'light' : 'dark'}
              style={{ marginLeft: 'auto' }}
            />
          )}
          {category.nameEn === 'Size' && (
            <Segmented
              options={[
                {
                  icon: (
                    <ExpandOutlined style={{ fontSize: 13, marginTop: 1 }} />
                  ),
                  value: 'normal',
                },
                {
                  icon: <CompactTheme style={{ fontSize: 16 }} />,
                  value: 'compact',
                },
              ]}
              onChange={switchAlgorithm('compact')}
              value={isLeftChecked('compact') ? 'normal' : 'compact'}
              style={{ marginLeft: 'auto' }}
            />
          )}
        </div>
        <ConfigProvider
          theme={{
            components: {
              Collapse: {
                colorBorder: token.colorSplit,
              },
            },
          }}
        >
          <div className="token-panel-pro-token-list">
            {category.groups.map((group) => {
              const groupDesc =
                locale._lang === 'zh-CN' ? group.desc : group.descEn;
              return (
                (!!group.seedToken || advanced) && (
                  <div className="token-panel-pro-token-item" key={group.key}>
                    <div className="token-panel-pro-token-item-seed">
                      <div className="token-panel-pro-token-item-header">
                        <Tooltip
                          mouseEnterDelay={0.5}
                          placement="right"
                          arrow={{ pointAtCenter: true }}
                          title={groupDesc}
                        >
                          <div className="token-panel-pro-token-item-header-title">
                            <span>
                              {locale._lang === 'zh-CN'
                                ? group.name
                                : group.nameEn}
                            </span>
                          </div>
                        </Tooltip>
                        {group.seedToken?.[0] === 'colorInfo' && (
                          <div
                            key={group.seedToken[0]}
                            className="token-panel-pro-token-item-header-follow-primary"
                          >
                            <span>{locale.followPrimary}</span>
                            <Switch
                              size="small"
                              style={{ marginLeft: 8 }}
                              checked={infoFollowPrimary}
                              onChange={(e) => onInfoFollowPrimaryChange?.(e)}
                            />
                          </div>
                        )}
                      </div>
                      {group.seedToken?.map((seedToken) => {
                        const multipleSeeds =
                          group.seedToken && group.seedToken.length > 1;
                        return (
                          (seedToken !== 'colorInfo' || !infoFollowPrimary) && (
                            <div
                              key={seedToken}
                              className="token-panel-pro-token-list-seed-block"
                            >
                              <div style={{ marginRight: 'auto' }}>
                                <div>
                                  <span>
                                    <Tooltip
                                      mouseEnterDelay={0.5}
                                      placement="right"
                                      title={
                                        (tokenMeta.global as any)[seedToken]?.[
                                          locale._lang === 'zh-CN'
                                            ? 'desc'
                                            : 'descEn'
                                        ]
                                      }
                                    >
                                      <span>
                                        {multipleSeeds && (
                                          <span
                                            className="token-panel-pro-token-list-seed-block-name-cn"
                                            style={{
                                              marginRight: 4,
                                              color: !!(
                                                theme.config.token as any
                                              )?.[seedToken]
                                                ? HIGHLIGHT_COLOR
                                                : '',
                                            }}
                                          >
                                            {
                                              (tokenMeta.global as any)[
                                                seedToken
                                              ]?.[
                                                locale._lang === 'zh-CN'
                                                  ? 'name'
                                                  : 'nameEn'
                                              ]
                                            }
                                          </span>
                                        )}
                                        <span
                                          className={
                                            multipleSeeds
                                              ? 'token-panel-pro-token-list-seed-block-subtitle'
                                              : 'token-panel-pro-token-list-seed-block-name-cn'
                                          }
                                          style={{
                                            color: !!(
                                              theme.config.token as any
                                            )?.[seedToken]
                                              ? HIGHLIGHT_COLOR
                                              : '',
                                          }}
                                        >
                                          {seedToken}
                                        </span>
                                      </span>
                                    </Tooltip>
                                    <ResetTokenButton
                                      theme={theme}
                                      tokenName={seedToken}
                                      style={{ marginLeft: 8 }}
                                    />
                                  </span>
                                </div>
                              </div>
                              <SeedTokenPreview
                                theme={theme}
                                tokenName={seedToken}
                                disabled={
                                  seedToken === 'colorInfo' && infoFollowPrimary
                                }
                              />
                            </div>
                          )
                        );
                      })}
                    </div>
                    {(group.mapToken || group.groups) &&
                      advanced &&
                      (!group.seedToken?.includes('colorInfo') ||
                        !infoFollowPrimary) && (
                        <Collapse
                          bordered={false}
                          expandIcon={({ isActive }) => (
                            <CaretRightOutlined rotate={isActive ? 90 : 0} />
                          )}
                          style={{ width: '100%', marginBlockStart: 10 }}
                          className="token-panel-pro-token-list-map-collapse"
                        >
                          <Panel
                            header={
                              <div
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'space-between',
                                }}
                              >
                                <span
                                  style={{
                                    color: group.mapToken?.some(
                                      (t) => !!(theme.config.token as any)?.[t],
                                    )
                                      ? HIGHLIGHT_COLOR
                                      : '',
                                  }}
                                >
                                  {locale._lang === 'zh-CN'
                                    ? '梯度变量 Map Token'
                                    : 'Map Token'}
                                </span>
                                {group.mapTokenGroups && (
                                  <div
                                    className="token-panel-pro-token-list-map-collapse-grouped"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <label style={{ marginRight: 4 }}>
                                      {locale.groupView}
                                    </label>
                                    <Switch
                                      checked={grouped}
                                      onChange={(v) => setGrouped(v)}
                                      size="small"
                                    />
                                  </div>
                                )}
                              </div>
                            }
                            key={group.key}
                          >
                            <MapTokenCollapse
                              group={group}
                              theme={theme}
                              selectedTokens={selectedTokens}
                              onTokenSelect={onTokenSelect}
                              groupFn={
                                group.mapTokenGroups && grouped
                                  ? groupMapToken
                                  : undefined
                              }
                            />
                          </Panel>
                        </Collapse>
                      )}
                  </div>
                )
              );
            })}
          </div>
        </ConfigProvider>
      </div>
    </div>,
  );
};

export default TokenContent;
