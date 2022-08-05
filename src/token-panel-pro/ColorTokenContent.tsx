import type { FC } from 'react';
import React, { useEffect, useMemo, useState } from 'react';
import makeStyle from '../utils/makeStyle';
import classNames from 'classnames';
import { Pick } from '../icons';
import type { SwitchProps } from 'antd';
import {
  Button,
  Checkbox,
  Collapse,
  ConfigProvider,
  Dropdown,
  Switch,
  Tooltip,
  Typography,
} from 'antd';
import { CaretRightOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import getDesignToken from '../utils/getDesignToken';
import { getRelatedComponents } from '../utils/statistic';
import type { MapToken, SeedToken } from 'antd/es/theme/interface';
import tokenInfo from '../token-info/TokenInfo';
import { mapRelatedAlias, seedRelatedMap } from '../token-info/TokenRelation';
import TokenDetail from './TokenDetail';
import type { MutableTheme } from 'antd-token-previewer';
import ColorPanel from '../ColorPanel';
import { useDebouncyFn } from 'use-debouncy';
import type { ThemeConfig } from 'antd/es/config-provider/context';
import type { SelectedToken } from '../interface';
import getColorBgImg from '../utils/getColorBgImg';

const { Panel } = Collapse;

// @ts-ignore
const useStyle = makeStyle('ColorTokenContent', (token) => ({
  '.token-panel-pro-color': {
    height: '100%',
    display: 'flex',
    '.token-panel-pro-color-seeds': {
      height: '100%',
      flex: 1,
      width: 0,
      borderInlineEnd: `1px solid ${token.colorSplit}`,
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
        borderRadius: 4,
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
            padding: '0 8px',
            height: 44,

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

export type ColorSeedTokenProps = {
  theme: MutableTheme;
  tokenName: keyof SeedToken;
  disabled?: boolean;
};

const getSeedValue = (config: ThemeConfig, token: keyof SeedToken) => {
  return (config.token?.[token] ?? getDesignToken(config)[token]) as string;
};

const ColorSeedTokenPreview: FC<ColorSeedTokenProps> = ({
  theme,
  tokenName,
  disabled,
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

  const handleChange = (value: string) => {
    setTokenValue(value);
    debouncedOnChange(value);
  };

  useEffect(() => {
    setTokenValue(getSeedValue(theme.config, tokenName));
  }, [theme.config, tokenName]);

  return (
    <div className="token-panel-pro-token-collapse-seed-block-sample">
      <div className="token-panel-pro-token-collapse-seed-block-sample-theme">
        <span>{theme.name}</span>
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
    </div>
  );
};

type SeedCategory = {
  title: string;
  key: string;
  description: string;
  seedTokens: (keyof SeedToken)[];
};

const seedCategories: SeedCategory[] = [
  {
    title: '品牌色',
    key: 'brandColor',
    description:
      '品牌色是体现产品特性和传播理念最直观的视觉元素之一。在你完成品牌主色的选取之后，我们会自动帮你生成一套完整的色板，并赋予它们有效的设计语义。',
    seedTokens: ['colorPrimary'],
  },
  {
    title: '成功色',
    key: 'successColor',
    description: 'TBD',
    seedTokens: ['colorSuccess'],
  },
  {
    title: '警戒色',
    key: 'warningColor',
    description: 'TBD',
    seedTokens: ['colorWarning'],
  },
  {
    title: '错误色',
    key: 'errorColor',
    description: 'TBD',
    seedTokens: ['colorError'],
  },
  {
    title: '信息色',
    key: 'infoColor',
    description: 'TBD',
    seedTokens: ['colorInfo'],
  },
  {
    title: '中性色',
    key: 'neutralColor',
    description:
      '中性色主要被大量的应用在界面的文字、背景、边框和填充的 4 种场景。合理地选择中性色能够令页面信息具备良好的主次关系，助力阅读体验。',
    seedTokens: ['colorTextBase', 'colorBgBase'],
  },
];

export type MapTokenCollapseContentProps = {
  mapTokens: (keyof MapToken)[];
  themes: MutableTheme[];
  selectedTokens?: SelectedToken;
  onTokenSelect?: (token: string | string[], type: keyof SelectedToken) => void;
};

const MapTokenCollapseContent: FC<MapTokenCollapseContentProps> = ({
  mapTokens,
  themes,
  onTokenSelect,
  selectedTokens,
}) => {
  //
  return (
    <Collapse className="token-panel-pro-token-collapse-map-collapse">
      {mapTokens.map((mapToken) => (
        <Panel
          header={
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ flex: 1 }}>
                <span style={{ fontWeight: 500 }}>
                  {tokenInfo[mapToken]?.name}
                </span>
                <span className="token-panel-pro-token-collapse-map-collapse-token">
                  {mapToken}
                </span>
                <span className="token-panel-pro-token-collapse-map-collapse-count">
                  {
                    getRelatedComponents([
                      mapToken,
                      ...(mapRelatedAlias[mapToken] ?? []),
                    ]).length
                  }
                </span>
              </div>
              <div className="token-panel-pro-token-collapse-map-collapse-preview">
                {themes.map((themeItem) => (
                  <div
                    key={themeItem.key}
                    style={{
                      height: 56,
                      width: 56,
                      position: 'relative',
                      borderInline: '1px solid #e8e8e8',
                      background: `${getColorBgImg(
                        themeItem.key === 'dark',
                      )} 0% 0% / 40px`,
                    }}
                  >
                    <div
                      style={{
                        height: '100%',
                        width: '100%',
                        backgroundColor: (
                          getDesignToken(themeItem.config) as any
                        )[mapToken],
                        transition: 'background-color 0.2s',
                      }}
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
            path={['override', 'derivative']}
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
  mapTokens: (keyof MapToken)[];
  themes: MutableTheme[];
  selectedTokens?: SelectedToken;
  onTokenSelect?: (token: string | string[], type: keyof SelectedToken) => void;
  groupFn?: (token: keyof MapToken) => string;
};

const MapTokenCollapse: FC<MapTokenCollapseProps> = ({
  mapTokens,
  themes,
  onTokenSelect,
  selectedTokens,
  groupFn,
}) => {
  const groupedTokens = useMemo(() => {
    const grouped: Record<string, (keyof MapToken)[]> = {};
    if (groupFn) {
      mapTokens.forEach((token) => {
        const key = groupFn(token) ?? 'default';
        grouped[key] = [...(grouped[key] ?? []), token];
      });
    }
    return grouped;
  }, [mapTokens, groupFn]);

  return groupFn ? (
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
      {Object.keys(groupedTokens).map((key) => (
        <Panel key={key} header={mapGroupTitle[key] ?? ''}>
          <MapTokenCollapseContent
            mapTokens={groupedTokens[key]}
            themes={themes}
            selectedTokens={selectedTokens}
            onTokenSelect={onTokenSelect}
          />
        </Panel>
      ))}
    </Collapse>
  ) : (
    <MapTokenCollapseContent
      mapTokens={mapTokens}
      themes={themes}
      selectedTokens={selectedTokens}
      onTokenSelect={onTokenSelect}
    />
  );
};

const groupMapToken = (token: keyof MapToken): string => {
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
  themes: MutableTheme[];
  selectedTokens?: SelectedToken;
  onTokenSelect?: (token: string | string[], type: keyof SelectedToken) => void;
  infoFollowPrimary?: boolean;
  onInfoFollowPrimaryChange?: (value: boolean) => void;
  activeSeeds: (keyof SeedToken)[];
  onActiveSeedsChange?: (value: (keyof SeedToken)[]) => void;
  activeTheme?: string;
  onActiveThemeChange?: (theme: string) => void;
  onNext?: (nextTokens: (keyof SeedToken)[]) => void;
};

const ColorTokenContent: FC<ColorTokenContentProps> = ({
  themes,
  selectedTokens,
  onTokenSelect,
  infoFollowPrimary,
  onInfoFollowPrimaryChange,
  activeSeeds,
  onActiveSeedsChange,
  activeTheme = 'default',
  onActiveThemeChange,
  onNext,
}) => {
  const [wrapSSR, hashId] = useStyle();

  const handleThemeChange: SwitchProps['onChange'] = (value) => {
    onActiveThemeChange?.(value ? 'dark' : 'default');
  };

  const activeCategory = useMemo(() => {
    return seedCategories.find(
      ({ seedTokens }) => seedTokens.join('') === activeSeeds.join(''),
    )?.key;
  }, [activeSeeds]);

  return wrapSSR(
    <div className={classNames(hashId, 'token-panel-pro-color')}>
      <div className="token-panel-pro-color-seeds">
        <div className="token-panel-pro-color-themes">
          <span style={{ marginRight: 12 }}>定制主题</span>
          {themes.length > 1 && (
            <Switch
              onChange={handleThemeChange}
              checked={activeTheme === 'dark'}
              unCheckedChildren="亮色"
              checkedChildren="暗色"
              style={{ marginLeft: 'auto' }}
            />
          )}
        </div>
        <Collapse
          className="token-panel-pro-token-collapse"
          expandIconPosition="end"
          ghost
          accordion
          activeKey={activeCategory}
          expandIcon={({ isActive }) => (
            <CaretRightOutlined
              rotate={isActive ? 450 : 360}
              style={{ fontSize: 12 }}
            />
          )}
          onChange={(key) => {
            const changedSeedTokens =
              seedCategories.find(({ key: categoryKey }) => key === categoryKey)
                ?.seedTokens || [];
            onActiveSeedsChange?.(changedSeedTokens);
            onTokenSelect?.(changedSeedTokens, 'seed');
          }}
        >
          {seedCategories.map((category, index) => {
            const mapTokens = category.seedTokens.reduce<(keyof MapToken)[]>(
              (result, token) => {
                return result.concat(seedRelatedMap[token] ?? []);
              },
              [],
            );

            return (
              <Panel
                header={
                  <span style={{ fontWeight: 500 }}>{category.title}</span>
                }
                key={category.key}
              >
                <div>
                  <div className="token-panel-pro-token-collapse-description">
                    {category.description}
                  </div>
                  {category.seedTokens.map((seedToken) => (
                    <div
                      key={seedToken}
                      className="token-panel-pro-token-collapse-seed-block"
                    >
                      <div style={{ marginRight: 'auto' }}>
                        <div className="token-panel-pro-token-collapse-subtitle">
                          <span style={{ fontSize: 12 }}>Seed Token</span>
                          <Tooltip title="TBD">
                            <QuestionCircleOutlined
                              style={{ fontSize: 14, marginLeft: 8 }}
                            />
                          </Tooltip>
                        </div>
                        <div>
                          <span className="token-panel-pro-token-collapse-seed-block-name-cn">
                            {tokenInfo[seedToken]?.name}
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
                        <ColorSeedTokenPreview
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
                  <div style={{ marginTop: 16, marginBottom: 24 }}>
                    <div
                      className="token-panel-pro-token-collapse-subtitle"
                      style={{ marginBottom: 10 }}
                    >
                      Map Token
                    </div>
                    <ConfigProvider
                      theme={{
                        override: {
                          derivative: { colorBorder: 'rgba(0,0,0,0.06)' },
                        },
                      }}
                    >
                      <MapTokenCollapse
                        mapTokens={mapTokens}
                        themes={themes}
                        selectedTokens={selectedTokens}
                        onTokenSelect={onTokenSelect}
                        groupFn={
                          category.key === 'neutralColor'
                            ? groupMapToken
                            : undefined
                        }
                      />
                    </ConfigProvider>
                  </div>
                  {index < seedCategories.length - 1 && (
                    <Button
                      type="primary"
                      style={{ borderRadius: 4, marginBottom: 12 }}
                      onClick={() =>
                        onNext?.(seedCategories[index + 1].seedTokens)
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
      </div>
    </div>,
  );
};

export default ColorTokenContent;
