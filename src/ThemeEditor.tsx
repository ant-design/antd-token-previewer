import React, { useMemo } from 'react';
import TokenPanelPro from './token-panel-pro';
import ComponentDemoGroup from './component-panel/ComponentDemoGroup';
import type { ThemeSelectProps } from './ThemeSelect';
import { componentToken as darkComponentToken } from './theme/dark';
import { DarkTheme } from './icons';
import { theme } from 'antd';
import { antdComponents } from './component-panel';

const { darkAlgorithm } = theme;

const ThemeEditor = () => {
  const defaultThemes = useMemo<ThemeSelectProps['themes']>(
    () => [
      {
        name: '默认主题',
        key: 'default',
        config: {},
        fixed: true,
      },
      // {
      //   name: '暗色主题',
      //   key: 'dark',
      //   config: {
      //     algorithm: darkAlgorithm,
      //     override: {
      //       ...darkComponentToken,
      //     },
      //   },
      //   fixed: true,
      // },
    ],
    [],
  );

  return (
    <div
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.04)',
        height: '100vh',
        display: 'flex',
      }}
    >
      <div
        style={{ flex: '0 0 860px', backgroundColor: '#fff', height: '100%' }}
      >
        <TokenPanelPro />
      </div>
      <div style={{ flex: 1, overflow: 'auto', height: '100%' }}>
        <ComponentDemoGroup
          themes={defaultThemes}
          components={antdComponents}
        />
      </div>
    </div>
  );
};

export default ThemeEditor;
