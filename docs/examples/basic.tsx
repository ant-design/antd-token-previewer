/**
 * iframe: 800
 */

import React from 'react';
import Previewer from 'antd-token-previewer';
import { convertTokenArrToConfig } from '../../src/utils/convertToken';

const Demo = () => {
  return (
    <Previewer
      showTheme
      onSave={(arr, obj) => console.log(arr, obj, convertTokenArrToConfig(arr))}
    />
  );
};

export default Demo;
