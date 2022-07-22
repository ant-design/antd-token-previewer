import React, { useState } from 'react';
import TokenPanelPro from './token-panel-pro';
import ComponentDemoGroup from './component-panel/ComponentDemoGroup';
import { antdComponents } from './component-panel';
import { DarkTheme, TokenPanelIcon } from './icons';
import makeStyle from './utils/makeStyle';
import classNames from 'classnames';
import { componentToken as darkComponentToken } from './theme/dark';
import { theme } from 'antd';
import type { MutableTheme } from './interface';
import type { ThemeConfig } from 'antd/es/config-provider/context';

const { darkAlgorithm } = theme;

const useStyle = makeStyle('ThemeEditor', (token) => ({
  '.antd-theme-editor': {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
    height: '100vh',
    display: 'flex',
    '.antd-theme-editor-sidebar': {
      padding: 12,
      width: 52,
      flex: '0 0 52px',
      borderRight: '1px solid rgba(0, 0, 0, 0.04)',
      boxSizing: 'border-box',

      '&-icon-wrapper': {
        width: 28,
        height: 28,
        borderRadius: 4,
        backgroundColor: token.colorPrimaryBg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

        '> svg': {
          fontSize: 20,
          color: token.colorPrimary,
        },
      },
    },
  },
}));

const defaultThemes = [
  {
    name: '默认主题',
    key: 'default',
    config: { token: { colorPrimary: '#1677FF' } },
    fixed: true,
  },
  {
    name: '暗色主题',
    key: 'dark',
    config: {
      token: { colorPrimary: '#1677FF' },
      algorithm: darkAlgorithm,
      override: {
        ...darkComponentToken,
      },
    },
    icon: <DarkTheme style={{ fontSize: 16 }} />,
    closable: true,
  },
];

const ThemeEditor = () => {
  const [wrapSSR, hashId] = useStyle();

  const [themes, setThemes] = useState<MutableTheme[]>(
    defaultThemes.map((themeItem) => ({
      ...themeItem,
      onThemeChange: (themeConfig: ThemeConfig) => {
        setThemes((prev) =>
          prev.map((prevTheme) =>
            themeItem.key === prevTheme.key
              ? {
                  ...prevTheme,
                  config: themeConfig,
                }
              : prevTheme,
          ),
        );
      },
    })),
  );

  return wrapSSR(
    <div className={classNames(hashId, 'antd-theme-editor')}>
      <div
        style={{
          flex: '0 0 912px',
          height: '100%',
          backgroundColor: '#F7F8FA',
          backgroundImage:
            'linear-gradient(180deg, #FFFFFF 0%, rgba(246,247,249,0.00) 100%)',
          display: 'flex',
        }}
      >
        <div className="antd-theme-editor-sidebar">
          <div className="antd-theme-editor-sidebar-icon-wrapper">
            <TokenPanelIcon />
          </div>
        </div>
        <TokenPanelPro themes={themes} style={{ flex: 1 }} />
      </div>
      <div style={{ flex: 1, overflow: 'auto', height: '100%' }}>
        <ComponentDemoGroup themes={[themes[0]]} components={antdComponents} />
      </div>
    </div>,
  );
};

export default ThemeEditor;
