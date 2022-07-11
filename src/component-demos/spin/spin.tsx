import React from 'react';
import { Spin } from 'antd';
import { ComponentDemo } from '../../interface';

const Demo = () => <Spin />;

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorPrimary', 'colorBgContainer'],
};

export default componentDemo;
