import React, { useMemo } from 'react';
import makeStyle from '../utils/makeStyle';
import classNames from 'classnames';
import type { ThemeSelectProps } from '../ThemeSelect';
import ThemeSelect from '../ThemeSelect';
import { componentToken as darkComponentToken } from '../theme/dark';
import { DarkTheme } from '../icons';
import { Button, Collapse, theme, Tooltip } from 'antd';
import {
  CaretRightOutlined,
  QuestionCircleOutlined,
  ShrinkOutlined,
} from '@ant-design/icons';
import getDesignToken from '../utils/getDesignToken';

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
      [`${token.rootCls}-collapse-item-active`]: {
        backgroundColor: '#fff',
        boxShadow:
          '0 6px 16px -8px rgba(0,0,0,0.08), 0 9px 28px 0 rgba(0,0,0,0.05), 0 12px 48px -8px rgba(0,0,0,0.03), inset 0 0 0 2px #1677FF',
        transition: 'box-shadow 0.2s ease-in-out',
        borderRadius: 4,
      },
      [`${token.rootCls}-collapse-content-box`]: {
        paddingBlock: '0 12px !important',
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
          expandIcon={({ isActive }) => (
            <CaretRightOutlined
              rotate={isActive ? 450 : 360}
              style={{ fontSize: 12, color: 'rgba(0,0,0,0.45)' }}
            />
          )}
        >
          <Panel
            header={<span style={{ fontWeight: 500 }}>品牌色</span>}
            key="brandColor"
          >
            <div>
              <div className="token-panel-pro-token-collapse-description">
                品牌色是体现产品特性和传播理念最直观的视觉元素之一。在你完成品牌主色的选取之后，我们会自动帮你生成一套完整的色板，并赋予它们有效的设计语义。
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
                      品牌主色
                    </span>
                    <span className="token-panel-pro-token-collapse-seed-block-name">
                      brandColor
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
                          backgroundColor: getDesignToken(themeItem.config)
                            .colorPrimary,
                          width: 48,
                          height: 32,
                          borderRadius: 4,
                          marginRight: 14,
                        }}
                      />
                      <div>{getDesignToken(themeItem.config).colorPrimary}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div>
                <div>Map Token</div>
              </div>
              <Button type="primary" style={{ borderRadius: 4 }}>
                下一步
              </Button>
            </div>
          </Panel>
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
      </div>
    </div>,
  );
};

export default ColorTokenContent;
