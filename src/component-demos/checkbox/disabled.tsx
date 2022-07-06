import React from 'react';
import { Checkbox } from '@madccc/antd';
import { ComponentDemo } from '../../interface';

const Demo = () => <Checkbox disabled>Checkbox</Checkbox>;

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorTextDisabled', 'colorBgContainerDisabled'],
};

export default componentDemo;
