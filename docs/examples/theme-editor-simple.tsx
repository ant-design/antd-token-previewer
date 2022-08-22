/**
 * iframe: 800
 */

import { ConfigProvider } from 'antd';
import type { Theme, ThemeEditorRef } from 'antd-token-previewer';
import { ThemeEditor } from 'antd-token-previewer';
import 'antd/es/style/reset.css';
import React, { useRef } from 'react';

const Demo = () => {
  const ref = useRef<ThemeEditorRef>(null);

  const [theme, setTheme] = React.useState<Theme>({
    name: '秘制猪蹄',
    key: 'secret theme',
    config: {
      token: {
        colorPrimary: '#1677FF',
      },
    },
  });

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
  };

  return (
    <React.StrictMode>
      <ConfigProvider theme={{ hashed: true }}>
        <button onClick={() => console.log(ref.current?.getDiff())}>
          Diff
        </button>
        <button onClick={() => ref.current?.updateRef()}>Update</button>
        <ThemeEditor
          ref={ref}
          simple
          theme={theme}
          onThemeChange={handleThemeChange}
          style={{ height: '100vh' }}
        />
      </ConfigProvider>
    </React.StrictMode>
  );
};

export default Demo;
