/**
 * iframe: 800
 */

import { Button, ConfigProvider, message } from 'antd';
import type { Theme } from 'antd-token-previewer';
import { ThemeEditor } from 'antd-token-previewer';
import 'antd/es/style/reset.css';
import React, { useEffect } from 'react';

const ANT_DESIGN_V5_CUSTOM_THEME_PRO = 'ant-design-v5-custom-theme-pro';

const Demo = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [theme, setTheme] = React.useState<Theme>({
    name: '自定义主题',
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

  useEffect(() => {
    const storedConfig = localStorage.getItem(ANT_DESIGN_V5_CUSTOM_THEME_PRO);
    if (storedConfig) {
      setTheme((prev) => ({ ...prev, config: JSON.parse(storedConfig) }));
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem(
      ANT_DESIGN_V5_CUSTOM_THEME_PRO,
      JSON.stringify(theme.config),
    );
    messageApi.success('保存成功');
  };

  return (
    <React.StrictMode>
      {contextHolder}
      <ConfigProvider theme={{ hashed: true }}>
        <div
          style={{
            display: 'flex',
            height: 56,
            alignItems: 'center',
            padding: '0 24px',
            justifyContent: 'space-between',
            borderBottom: '1px solid #F0F0F0',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div
              style={{
                marginRight: 8,
                display: 'inline-block',
                width: 32,
                height: 32,
                borderRadius: 4,
                background: theme.config.token?.colorPrimary,
              }}
            />
            <span>{theme.name}</span>
          </div>
          <Button type="primary" onClick={handleSave}>
            保存
          </Button>
        </div>
        <ThemeEditor
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
