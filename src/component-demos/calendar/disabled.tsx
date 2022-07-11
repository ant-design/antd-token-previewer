import React from 'react';
import { Calendar } from 'antd';
import type { ComponentDemo } from '../../interface';

const Demo = () => <Calendar disabledDate={() => true} />;

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorBgContainerDisabled', 'colorTextDisabled'],
};

export default componentDemo;
