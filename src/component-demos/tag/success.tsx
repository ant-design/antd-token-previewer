import React from 'react';
import { Tag } from '@madccc/antd';
import type { ComponentDemo } from '../../interface';

const Demo = () => <Tag color="success">Success</Tag>;

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorSuccess', 'colorSuccessBg', 'colorSuccessBorder'],
};

export default componentDemo;
