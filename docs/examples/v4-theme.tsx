/**
 * iframe: 800
 */

import { ConfigProvider, theme as antdTheme } from 'antd';
import type { Theme } from 'antd-token-previewer';
import { ThemeEditor } from 'antd-token-previewer';
import 'antd/es/style/reset.css';
import React from 'react';

const { defaultAlgorithmV4, darkAlgorithmV4 } = antdTheme;

const Demo = () => {
  const [theme, setTheme] = React.useState<Theme>({
    name: '秘制猪蹄',
    key: 'secret theme',
    config: {
      token: {
        radiusBase: 2,
      },
      algorithm: defaultAlgorithmV4,
    },
  });

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
  };

  return (
    <React.StrictMode>
      <ConfigProvider theme={{ hashed: true }}>
        <ThemeEditor
          theme={theme}
          onThemeChange={handleThemeChange}
          style={{ height: '100vh' }}
          darkAlgorithm={darkAlgorithmV4}
        />
      </ConfigProvider>
    </React.StrictMode>
  );
};

export default Demo;
