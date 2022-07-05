import React from 'react';
import { Input } from '@madccc/antd';
import type { ComponentDemo } from '../../interface';

function onChange() {}

const Demo = () => (
  <Input status={'warning'} defaultValue={3} onChange={onChange} />
);

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorWarningBorder', 'colorWarningHover', 'colorWarningOutline'],
};

export default componentDemo;
