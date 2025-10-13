import { Alert, Space } from 'antd';
import React from 'react';
import type { ComponentDemo } from '../../../interface';

const Demo = () => (
  <Space orientation={'vertical'}>
    <Alert title="Success Tips" type="success" showIcon />
    <Alert
      title="Success Tips"
      description="Detailed description and advice about successful copywriting."
      type="success"
      showIcon
    />
  </Space>
);

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorSuccess', 'colorSuccessBorder', 'colorSuccessBg'],
  key: 'success',
};

export default componentDemo;
