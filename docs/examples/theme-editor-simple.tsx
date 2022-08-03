/**
 * iframe: 800
 */

import React from 'react';
import type { Theme } from 'antd-token-previewer';
import { ThemeEditor } from 'antd-token-previewer';
import 'antd/es/style/reset.css';
import { ConfigProvider } from 'antd';

const Demo = () => {
  const [theme, setTheme] = React.useState<Theme>({
    name: '秘制猪蹄',
    key: 'secret theme',
    config: {
      token: {
        colorPrimary: '#1677FF',
        radiusBase: 4,
      },
    },
  });

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
  };

  return (
    <React.StrictMode>
      <ConfigProvider theme={{ hashed: true }}>
        <ThemeEditor simple theme={theme} onThemeChange={handleThemeChange} />
      </ConfigProvider>
    </React.StrictMode>
  );
};

export default Demo;
