/**
 * iframe: 800
 */

import React, { useEffect, useState } from 'react';
import Previewer from 'antd-token-previewer';
import { ConfigProvider, message } from 'antd';
import type { Theme } from 'antd-token-previewer';

const ANT_DESIGN_V5_CUSTOM_THEME = 'ant-design-v5-custom-theme';

const Demo = () => {
  const [theme, setTheme] = useState<Theme>({
    name: '自定义主题',
    key: 'xiaozhuti',
    config: {},
  });
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    const storedConfig = localStorage.getItem(ANT_DESIGN_V5_CUSTOM_THEME);
    if (storedConfig) {
      setTheme((prev) => ({ ...prev, config: JSON.parse(storedConfig) }));
    }
  }, []);

  return (
    <ConfigProvider theme={{ hashed: true }} prefixCls="hitu">
      {contextHolder}
      <Previewer
        theme={theme}
        onThemeChange={(config) => setTheme({ ...theme, config })}
        onSave={(_, obj) => {
          localStorage.setItem(ANT_DESIGN_V5_CUSTOM_THEME, JSON.stringify(obj));
          messageApi.success('保存成功');
        }}
      />
    </ConfigProvider>
  );
};

export default Demo;
