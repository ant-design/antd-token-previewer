import React from 'react';
import { Badge, Space } from 'antd';
import type { ComponentDemo } from '../../interface';

const Demo = () => (
  <Space size="small">
    <Badge dot status={'processing'} />
    Process
  </Space>
);

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorPrimary'],
};

export default componentDemo;
