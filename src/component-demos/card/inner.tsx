import React from 'react';
import { Card, Space } from 'antd';
import { ComponentDemo } from '../../interface';

const Demo = () => (
  <Space>
    <Card type="inner" title="Inner Card title">
      Inner Card content
    </Card>
  </Space>
);

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorBgContainerSecondary'],
};

export default componentDemo;
