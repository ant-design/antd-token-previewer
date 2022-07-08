import React from 'react';
import { Radio } from 'antd';
import type { ComponentDemo } from '../../interface';

const Demo = () => <Radio>Radio</Radio>;

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorPrimary'],
};

export default componentDemo;
