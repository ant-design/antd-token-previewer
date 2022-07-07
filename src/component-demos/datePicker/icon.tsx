import React from 'react';
import { DatePicker } from 'antd';
import type { ComponentDemo } from '../../interface';

const Demo = () => <DatePicker open />;

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorAction', 'colorActionHover'],
};

export default componentDemo;
