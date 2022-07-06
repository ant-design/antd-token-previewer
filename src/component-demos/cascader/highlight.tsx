import React from 'react';
import { Cascader } from '@madccc/antd';
import type { ComponentDemo } from '../../interface';

import options from './data';

const Demo = () => {
  return (
    <Cascader
      options={options}
      placeholder="Please select"
      searchValue={'jiang'}
      showSearch
      popupVisible
    />
  );
};

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorHighlight'],
};

export default componentDemo;
