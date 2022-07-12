import React from 'react';
import { Input } from 'antd';
import type { ComponentDemo } from '../../interface';

const Demo = () => <Input placeholder="Basic usage" />;

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorPrimaryHover', 'colorPrimaryOutline', 'colorBgContainer'],
  key: 'default',
};

export default componentDemo;
