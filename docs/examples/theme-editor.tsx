/**
 * iframe: 800
 */

import React from 'react';
import { ConfigProvider } from 'antd';
import { ThemeEditor } from 'antd-token-previewer';
import 'antd/es/style/reset.css';

const Demo = () => {
  return (
    <React.StrictMode>
      <ConfigProvider
        theme={{
          hashed: true,
        }}
        prefixCls="editor"
      >
        <ThemeEditor />
      </ConfigProvider>
    </React.StrictMode>
  );
};

export default Demo;
