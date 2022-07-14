import React from 'react';
import { Radio } from 'antd';
import type { ComponentDemo } from '../../interface';

const Demo = () => (
  <div>
    <Radio.Button>1</Radio.Button>
    <Radio.Button checked>Button</Radio.Button>
  </div>
);

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorPrimaryActive', 'colorPrimaryHover'],
  key: 'button',
};

export default componentDemo;
