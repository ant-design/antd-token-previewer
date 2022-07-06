import React from 'react';
import { Badge, Space } from 'antd';
import type { ComponentDemo } from '../../interface';

const Demo = () => (
  <Space size="small">
    <Badge dot status={'warning'} />
    Warning
  </Space>
);

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorWarning'],
};

export default componentDemo;
