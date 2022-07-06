/**
 * iframe: 800
 */

import React, { useState } from 'react';
import Previewer from 'antd-token-previewer';
import { convertTokenArrToConfig } from '../../src/utils/convertToken';
import { ConfigProvider } from 'antd';
import type { Theme } from 'antd-token-previewer';

const Demo = () => {
  const [theme, setTheme] = useState<Theme>({
    name: '小猪蹄',
    key: 'xiaozhuti',
    config: { token: { colorPrimary: '#5A3CFF' } },
  });

  return (
    <ConfigProvider theme={{ hashed: true }} prefixCls="hitu">
      <Previewer
        theme={theme}
        onThemeChange={(config) => setTheme({ ...theme, config })}
        onSave={(arr, obj) =>
          console.log(arr, obj, convertTokenArrToConfig(arr))
        }
      />
    </ConfigProvider>
  );
};

export default Demo;
