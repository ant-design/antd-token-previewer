import React, { useMemo } from 'react';
import TokenPanelPro from './token-panel-pro';
import ComponentDemoGroup from './component-panel/ComponentDemoGroup';
import type { ThemeSelectProps } from './ThemeSelect';
import { antdComponents } from './component-panel';
import { TokenPanelIcon } from './icons';
import makeStyle from './utils/makeStyle';
import classNames from 'classnames';

const useStyle = makeStyle('ThemeEditor', (token) => ({
  '.antd-theme-editor': {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
    height: '100vh',
    display: 'flex',
    '.antd-theme-editor-sidebar': {
      padding: 12,
      flex: '0 0 52px',
      borderRight: '1px solid rgba(0, 0, 0, 0.04)',

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

const ThemeEditor = () => {
  const [wrapSSR, hashId] = useStyle();

  const defaultThemes = useMemo<ThemeSelectProps['themes']>(
    () => [
      {
        name: '默认主题',
        key: 'default',
        config: { token: { colorPrimary: '#1677ff' } },
        fixed: true,
      },
    ],
    [],
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
        <TokenPanelPro style={{ flex: 1 }} />
      </div>
      <div style={{ flex: 1, overflow: 'auto', height: '100%' }}>
        <ComponentDemoGroup
          themes={defaultThemes}
          components={antdComponents}
        />
      </div>
    </div>,
  );
};

export default ThemeEditor;
