/**
 * iframe: 800
 */

import React from 'react';
import { Previewer } from 'antd-token-previewer';
import { convertTokenArrToConfig } from '../../src/utils/convertToken';
import { ConfigProvider } from 'antd';

const Demo = () => {
  return (
    <React.StrictMode>
      <ConfigProvider theme={{ hashed: true }} prefixCls="hitu">
        <Previewer
          showTheme
          onSave={(arr, obj) =>
            console.log(arr, obj, convertTokenArrToConfig(arr))
          }
        />
      </ConfigProvider>
    </React.StrictMode>
  );
};

export default Demo;
