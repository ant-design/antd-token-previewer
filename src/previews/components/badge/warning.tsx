import { Badge, Space } from 'antd';
import React from 'react';
import type { ComponentDemo } from '../../../interface';

const Demo = () => (
  <Space size="small">
    <Badge dot status={'warning'} />
    Warning
  </Space>
);

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorWarning'],
  key: 'warning',
};

export default componentDemo;
