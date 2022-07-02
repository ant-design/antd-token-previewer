import type { SelectProps } from '@madccc/antd';
import { Select } from '@madccc/antd';

import React from 'react';
import type { ComponentDemo } from '../../interface';

const options: SelectProps['options'] = [];

for (let i = 10; i < 36; i++) {
  options.push({ value: i.toString(36) + i, label: i.toString(36) + i });
}

const handleChange = (value: any) => {
  console.log(`selected ${value}`);
};

const Demo = () => (
  <Select
    mode="multiple"
    allowClear
    style={{
      width: '100%',
    }}
    status={'error'}
    options={options}
    placeholder="Please select"
    defaultValue={['a10', 'c12']}
    onChange={handleChange}
  />
);

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorErrorBorder', 'colorErrorHover'],
};

export default componentDemo;
