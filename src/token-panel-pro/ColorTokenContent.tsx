import React, { useMemo } from 'react';
import makeStyle from '../utils/makeStyle';
import classNames from 'classnames';
import type { ThemeSelectProps } from '../ThemeSelect';
import ThemeSelect from '../ThemeSelect';
import { componentToken as darkComponentToken } from '../theme/dark';
import { DarkTheme, Pick } from '../icons';
import { Button, Collapse, theme, Tooltip } from 'antd';
import {
  CaretRightOutlined,
  QuestionCircleOutlined,
  ShrinkOutlined,
} from '@ant-design/icons';
import getDesignToken from '../utils/getDesignToken';
import { getRelatedComponents } from '../utils/statistic';
import TokenInput from '../TokenInput';
import getValueByPath from '../utils/getValueByPath';
import type { MapToken, SeedToken } from 'antd/es/theme/interface';
import tokenInfo from '../token-info/TokenInfo';
import { seedRelatedMap } from '../token-info/TokenRelation';

const { darkAlgorithm } = theme;
const { Panel } = Collapse;

const useStyle = makeStyle('ColorTokenContent', (token) => ({
  '.token-panel-pro-color': {
    height: '100%',
    display: 'flex',
    '.token-panel-pro-color-seeds': {
      width: 0,
      flex: '0 0 540px',
      height: '100%',
      borderInlineEnd: `1px solid ${token.colorSplit}`,

      '.token-panel-pro-color-themes': {
        height: 60,
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',

        '> span': {
          fontSize: token.fontSizeLG,
          fontWeight: token.fontWeightStrong,
        },
      },
    },
    '.token-panel-pro-color-alias': {
      width: 0,
      flex: '0 0 320px',

      '&-title': {
        height: 60,
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',

        '&-text': {
          fontSize: token.fontSizeLG,
          fontWeight: token.fontWeightStrong,
        },
      },
    },
    [`.token-panel-pro-token-collapse${token.rootCls}-collapse`]: {
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
        color: token.colorTextSecondary,
        marginBottom: 16,
      },

      '.token-panel-pro-token-collapse-seed-block': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',

        '&-name-cn': {
          fontWeight: token.fontWeightStrong,
          marginInlineEnd: 4,
        },

        '&-name': {
          color: token.colorTextSecondary,
        },

        '&-sample': {
          '&:not(:last-child)': {
            marginInlineEnd: 16,
          },

          '&-theme': {
            color: token.colorTextSecondary,
            marginBottom: 2,
            fontSize: 12,
          },

          '&-card': {
            border: `1px solid ${token.colorBorderSecondary}`,
            borderRadius: 4,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 8px',
            height: 44,
          },
        },
      },

      [`.token-panel-pro-token-collapse-map-collapse${token.rootCls}-collapse`]:
        {
          borderRadius: 4,
          backgroundColor: '#fff',

          [`> ${token.rootCls}-collapse-item`]: {
            [`> ${token.rootCls}-collapse-header`]: {
              paddingBlock: 0,

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

                '.token-panel-pro-token-collapse-map-collapse-count': {
                  color: token.colorTextSecondary,
                  display: 'inline-block',
                  fontSize: 12,
                  lineHeight: '16px',
                  padding: '0 6px',
                  backgroundColor: token.colorBgContainerSecondary,
                  borderRadius: 999,
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

                '.token-panel-pro-token-collapse-map-collapse-token-description':
                  {
                    color: token.colorTextPlaceholder,
                    marginBottom: 8,
                    fontSize: 12,
                  },

                '.token-panel-pro-token-collapse-map-collapse-token-usage-tag':
                  {
                    display: 'inline-block',
                    marginInlineEnd: 8,
                    borderRadius: 4,
                    height: 20,
                    padding: '0 8px',
                    fontSize: 12,
                    backgroundColor: token.colorBgContainerSecondary,
                  },

                '.token-panel-pro-token-collapse-map-collapse-token-inputs': {
                  padding: '8px 10px',
                  backgroundColor: 'rgba(0,0,0,0.02)',
                  marginTop: 12,
                  '> *:not(:last-child)': {
                    marginBottom: 8,
                  },
                },
              },
          },
        },
    },
  },
}));

const ColorTokenContent = () => {
  const [wrapSSR, hashId] = useStyle();

  const defaultThemes = useMemo<ThemeSelectProps['themes']>(
    () => [
      {
        name: '默认主题',
        key: 'default',
        config: {},
        fixed: true,
      },
      {
        name: '暗色主题',
        key: 'dark',
        config: {
          algorithm: darkAlgorithm,
          override: {
            ...darkComponentToken,
          },
        },
        icon: <DarkTheme style={{ fontSize: 16 }} />,
        closable: true,
      },
    ],
    [],
  );

  return wrapSSR(
    <div className={classNames(hashId, 'token-panel-pro-color')}>
      <div className="token-panel-pro-color-seeds">
        <div className="token-panel-pro-color-themes">
          <span style={{ marginRight: 12 }}>定制主题</span>
          <ThemeSelect
            onEnabledThemeChange={() => {}}
            onShownThemeChange={() => {}}
            enabledThemes={['default', 'dark']}
            shownThemes={['default', 'dark']}
            themes={defaultThemes}
          />
        </div>
        <Collapse
          className="token-panel-pro-token-collapse"
          expandIconPosition="end"
          ghost
          accordion
          defaultActiveKey="brandColor"
          expandIcon={({ isActive }) => (
            <CaretRightOutlined
              rotate={isActive ? 450 : 360}
              style={{ fontSize: 12, color: 'rgba(0,0,0,0.45)' }}
            />
          )}
        >
          {Object.entries(seedRelatedMap).map((tokenRelationship) => {
            const [seedToken, mapTokens] = tokenRelationship as [
              keyof SeedToken,
              (keyof MapToken)[],
            ];

            return (
              <Panel
                header={
                  <span style={{ fontWeight: 500 }}>
                    {tokenInfo[seedToken]?.name}
                  </span>
                }
                key={seedToken}
              >
                <div>
                  <div className="token-panel-pro-token-collapse-description">
                    {tokenInfo[seedToken]?.description}
                  </div>
                  <div className="token-panel-pro-token-collapse-seed-block">
                    <div style={{ marginRight: 'auto' }}>
                      <div>
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
                        <span className="token-panel-pro-token-collapse-seed-block-name">
                          {seedToken}
                        </span>
                      </div>
                    </div>
                    {defaultThemes.map((themeItem) => (
                      <div
                        key={themeItem.key}
                        className="token-panel-pro-token-collapse-seed-block-sample"
                      >
                        <div className="token-panel-pro-token-collapse-seed-block-sample-theme">
                          {themeItem.name}
                        </div>
                        <div className="token-panel-pro-token-collapse-seed-block-sample-card">
                          <div
                            style={{
                              backgroundColor: getDesignToken(themeItem.config)[
                                seedToken as keyof SeedToken
                              ] as string,
                              width: 48,
                              height: 32,
                              borderRadius: 4,
                              marginRight: 14,
                            }}
                          />
                          <div>
                            {
                              getDesignToken(themeItem.config)[
                                seedToken as keyof SeedToken
                              ]
                            }
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: 16, marginBottom: 24 }}>
                    <div style={{ fontSize: 12, marginBottom: 10 }}>
                      Map Token
                    </div>
                    <Collapse className="token-panel-pro-token-collapse-map-collapse">
                      {mapTokens.map((mapToken) => (
                        <Panel
                          header={
                            <div
                              style={{ display: 'flex', alignItems: 'center' }}
                            >
                              <div style={{ flex: 1 }}>
                                <span style={{ fontWeight: 500 }}>
                                  {tokenInfo[mapToken]?.name}
                                </span>
                                <span className="token-panel-pro-token-collapse-map-collapse-token">
                                  {mapToken}
                                </span>
                                <span className="token-panel-pro-token-collapse-map-collapse-count">
                                  {getRelatedComponents(mapToken).length}
                                </span>
                              </div>
                              <div className="token-panel-pro-token-collapse-map-collapse-preview">
                                {defaultThemes.map((themeItem) => (
                                  <div
                                    key={themeItem.key}
                                    style={{
                                      height: 56,
                                      width: 56,
                                      position: 'relative',
                                      // marginTop: -1,
                                      // marginBottom: -1,
                                      background:
                                        'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABGdBTUEAALGPC/xhBQAAAFpJREFUWAntljEKADAIA23p6v//qQ+wfUEcCu1yriEgp0FHRJSJcnehmmWm1Dv/lO4HIg1AAAKjTqm03ea88zMCCEDgO4HV5bS757f+7wRoAAIQ4B9gByAAgQ3pfiDmXmAeEwAAAABJRU5ErkJggg==) 0% 0% / 40px',
                                    }}
                                  >
                                    <div
                                      style={{
                                        height: '100%',
                                        width: '100%',
                                        backgroundColor: (
                                          getDesignToken(
                                            themeItem.config,
                                          ) as any
                                        )[mapToken],
                                      }}
                                    />
                                  </div>
                                ))}
                              </div>
                              <div style={{ flex: 'none', marginLeft: 4 }}>
                                <Pick />
                              </div>
                            </div>
                          }
                          key={mapToken}
                        >
                          <div style={{ padding: 8 }}>
                            <div className="token-panel-pro-token-collapse-map-collapse-token-description">
                              {tokenInfo[mapToken]?.description}
                            </div>
                            {getRelatedComponents(mapToken).length > 0 && (
                              <Tooltip
                                title={getRelatedComponents(mapToken).join(
                                  ', ',
                                )}
                              >
                                <div
                                  style={{
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                  }}
                                >
                                  {getRelatedComponents(mapToken).map(
                                    (item) => (
                                      <span
                                        key={item}
                                        className="token-panel-pro-token-collapse-map-collapse-token-usage-tag"
                                      >
                                        {item}
                                      </span>
                                    ),
                                  )}
                                </div>
                              </Tooltip>
                            )}
                            <div className="token-panel-pro-token-collapse-map-collapse-token-inputs">
                              {defaultThemes.map((themeItem) => {
                                return (
                                  <div key={themeItem.key}>
                                    <TokenInput
                                      theme={themeItem}
                                      // onChange={(value) => handleTokenChange(themeItem, value)}
                                      value={
                                        getValueByPath(themeItem.config, [
                                          'override',
                                          'derivative',
                                        ]) ??
                                        (
                                          getDesignToken(
                                            themeItem.config,
                                          ) as any
                                        )[mapToken]
                                      }
                                    />
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </Panel>
                      ))}
                    </Collapse>
                  </div>
                  <Button
                    type="primary"
                    style={{ borderRadius: 4, marginBottom: 12 }}
                  >
                    下一步
                  </Button>
                </div>
              </Panel>
            );
          })}
        </Collapse>
      </div>
      <div className="token-panel-pro-color-alias">
        <div className="token-panel-pro-color-alias-title">
          <span className="token-panel-pro-color-alias-title-text">
            Alias Token
          </span>
          <Tooltip title="TBD">
            <QuestionCircleOutlined style={{ fontSize: 14, marginLeft: 4 }} />
          </Tooltip>
          <Button
            type="text"
            icon={<ShrinkOutlined />}
            style={{ marginLeft: 'auto' }}
          />
        </div>
        <div />
      </div>
    </div>,
  );
};

export default ColorTokenContent;
