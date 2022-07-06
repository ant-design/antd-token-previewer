import React from 'react';
import { Input } from '@madccc/antd';
import type { ComponentDemo } from '../../interface';

function onChange() {}

const Demo = () => (
  <Input status={'error'} defaultValue={'hello'} onChange={onChange} />
);

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: [
    'colorError',
    'colorErrorOutline',
    'colorErrorBorder',
    'colorErrorHover',
  ],
};

export default componentDemo;
