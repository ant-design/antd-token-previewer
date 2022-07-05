import React from 'react';
import { DatePicker } from '@madccc/antd';
import type { ComponentDemo } from '../../interface';

const Demo = () => <DatePicker status={'error'} />;

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorErrorBorder', 'colorErrorHover', 'colorErrorOutline'],
};

export default componentDemo;
