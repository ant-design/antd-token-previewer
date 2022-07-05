import React from 'react';
import { DatePicker } from '@madccc/antd';
import type { ComponentDemo } from '../../interface';

const Demo = () => <DatePicker status={'warning'} />;

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorWarningBorder', 'colorWarningHover', 'colorWarningOutline'],
};

export default componentDemo;
