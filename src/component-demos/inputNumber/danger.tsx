import React from 'react';
import { InputNumber } from '@madccc/antd';
import type { ComponentDemo } from '../../interface';

function onChange() {}

const Demo = () => (
  <InputNumber
    status={'error'}
    min={1}
    max={10}
    defaultValue={3}
    onChange={onChange}
  />
);

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorErrorBorder', 'colorErrorHover', 'colorError'],
};

export default componentDemo;
