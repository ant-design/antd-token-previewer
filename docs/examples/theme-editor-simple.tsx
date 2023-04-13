import { Button, ConfigProvider, message, Modal } from 'antd';
import type { Theme } from 'antd-token-previewer';
import { enUS, ThemeEditor, zhCN } from 'antd-token-previewer';
import 'antd/es/style/reset.css';
import React, { useEffect } from 'react';
import IconSwitch from '../../src/IconSwitch';

const ANT_DESIGN_V5_CUSTOM_THEME_PRO = 'ant-design-v5-custom-theme-pro';

const Demo = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [modalApi, modalContextHolder] = Modal.useModal();
  const [lang, setLang] = React.useState('zh-CN');
  const [theme, setTheme] = React.useState<Theme>({
    name: '自定义主题',
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

  const handleOutput = () => {
    modalApi.info({
      title: '导出',
      width: 600,
      content: (
        <div>
          <div style={{ color: 'rgba(0,0,0,0.65)' }}>
            将下面的 JSON 对象复制到 ConfigProvider 的 theme 属性中即可。
          </div>
          <pre
            style={{
              padding: 12,
              background: '#f5f5f5',
              borderRadius: 4,
              marginTop: 12,
            }}
          >
            {JSON.stringify(theme.config, null, 2)}
          </pre>
        </div>
      ),
    });
  };

  const handleEdit = () => {};

  return (
    <React.StrictMode>
      {contextHolder}
      {modalContextHolder}
      <ConfigProvider theme={{ hashed: true }}>
        <ThemeEditor
          theme={theme}
          onThemeChange={handleThemeChange}
          locale={lang === 'zh-CN' ? zhCN : enUS}
          actions={
            <div>
              <IconSwitch
                leftIcon={<span style={{ fontSize: 14 }}>ZH</span>}
                rightIcon={<span style={{ fontSize: 14 }}>EN</span>}
                leftChecked={lang === 'zh-CN'}
                onChange={(checked) => setLang(checked ? 'zh-CN' : 'en-US')}
                style={{ marginRight: 8 }}
              />
              <Button onClick={handleOutput} style={{ marginRight: 8 }}>
                导出
              </Button>
              <Button onClick={handleEdit} style={{ marginRight: 8 }}>
                编辑
              </Button>
              <Button type="primary" onClick={handleSave}>
                保存
              </Button>
            </div>
          }
        />
      </ConfigProvider>
    </React.StrictMode>
  );
};

export default Demo;
