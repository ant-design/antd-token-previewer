/**
 * iframe: 800
 */

import React from 'react';
import { ConfigProvider } from 'antd';
import ThemeEditor from '../../src/ThemeEditor';
import 'antd/es/style/reset.css';

const Demo = () => {
  return (
    <React.StrictMode>
      <ConfigProvider
        theme={{ hashed: true, token: { colorPrimary: '#1677FF' } }}
        prefixCls="editor"
      >
        <ThemeEditor />
      </ConfigProvider>
    </React.StrictMode>
  );
};

export default Demo;
