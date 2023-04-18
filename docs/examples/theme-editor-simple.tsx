import { Button, ConfigProvider, message, Modal } from 'antd';
import type { Theme } from 'antd-token-previewer';
import { enUS, ThemeEditor, zhCN } from 'antd-token-previewer';
import type { OnChange } from 'vanilla-jsoneditor';

import 'antd/es/style/reset.css';
import React, { useCallback, useEffect, useState } from 'react';
import IconSwitch from '../../src/IconSwitch';
const JSONEditor = React.lazy(() => import('../JSONEditor'));

const ANT_DESIGN_V5_CUSTOM_THEME_PRO = 'ant-design-v5-custom-theme-pro';

function isObject(target: any) {
  return Object.prototype.toString.call(target) === '[object Object]';
}

const Demo = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [lang, setLang] = React.useState('zh-CN');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editThemeFormatRight, setEditThemeFormatRight] =
    useState<boolean>(true);

  const defaultTheme = {
    name: '自定义主题',
    key: 'secret theme',
    config: {
      token: {
        colorPrimary: '#1677FF',
      },
    },
  };
  const [theme, setTheme] = React.useState<Theme>(defaultTheme);

  const [themeConfigContent, setThemeConfigContent] = useState<{
    text: string;
    json?: undefined;
  }>({
    text: JSON.stringify(defaultTheme.config),
    json: undefined,
  });

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    setThemeConfigContent({
      text: JSON.stringify(newTheme),
      json: undefined,
    });
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

  const editModelClose = () => {
    setIsModalOpen(false);
  };

  const handleEditConfigChange: OnChange = (newContent, preContent, status) => {
    setThemeConfigContent(newContent as { text: string });
    if (status?.contentErrors && Object.keys(status.contentErrors).length > 0) {
      setEditThemeFormatRight(false);
    } else {
      setEditThemeFormatRight(true);
    }
  };

  const editSave = useCallback(() => {
    if (!editThemeFormatRight) {
      messageApi.error('主题 JSON 格式错误');
      return;
    }

    const themeConfig = {
      ...theme,
      config: JSON.parse(themeConfigContent.text),
    };
    if (!isObject(themeConfig)) {
      messageApi.error('主题 JSON 格式错误');
      return;
    }
    setTheme(themeConfig);
    editModelClose();
    messageApi.success('编辑成功');
  }, [themeConfigContent]);

  const handleExport = () => {
    const file = new File(
      [JSON.stringify(theme, null, 2)],
      `Ant Design Theme.json`,
      {
        type: 'text/json; charset=utf-8;',
      },
    );
    const tmpLink = document.createElement('a');
    const objectUrl = URL.createObjectURL(file);

    tmpLink.href = objectUrl;
    tmpLink.download = file.name;
    document.body.appendChild(tmpLink);
    tmpLink.click();

    document.body.removeChild(tmpLink);
    URL.revokeObjectURL(objectUrl);
  };

  const handleEdit = () => {
    setIsModalOpen(true);
  };

  return (
    <React.StrictMode>
      {contextHolder}
      <ConfigProvider theme={{ hashed: true }}>
        <ThemeEditor
          theme={theme}
          onThemeChange={handleThemeChange}
          locale={lang === 'zh-CN' ? zhCN : enUS}
          actions={
            <>
              <IconSwitch
                leftIcon={<span style={{ fontSize: 14 }}>ZH</span>}
                rightIcon={<span style={{ fontSize: 14 }}>EN</span>}
                leftChecked={lang === 'zh-CN'}
                onChange={(checked) => setLang(checked ? 'zh-CN' : 'en-US')}
                style={{ marginRight: 8 }}
              />
              <Button onClick={handleExport} style={{ marginRight: 8 }}>
                导出
              </Button>
              <Button onClick={handleEdit} style={{ marginRight: 8 }}>
                编辑
              </Button>
              <Button type="primary" onClick={handleSave}>
                保存
              </Button>
            </>
          }
        />
      </ConfigProvider>
      <Modal
        title="编辑配置"
        open={isModalOpen}
        onOk={editSave}
        onCancel={editModelClose}
      >
        <JSONEditor
          content={themeConfigContent}
          onChange={handleEditConfigChange}
          mainMenuBar={false}
        />
      </Modal>
    </React.StrictMode>
  );
};

export default Demo;
