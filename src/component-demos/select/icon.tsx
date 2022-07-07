import { Select } from '@madccc/antd';

import React from 'react';
import type { ComponentDemo } from '../../interface';

import options from './data';

const handleChange = (value: any) => {
  console.log(`selected ${value}`);
};

const Demo = () => (
  <Select
    allowClear
    style={{
      width: '100%',
    }}
    options={options}
    placeholder="Please select"
    value={['a10', 'c12']}
    onChange={handleChange}
  />
);

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorAction', 'colorActionHover'],
};

export default componentDemo;
