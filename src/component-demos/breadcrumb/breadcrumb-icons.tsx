import React from 'react';
import { Breadcrumb } from 'antd';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';

import type { ComponentDemo } from '../../interface';

const Demo: React.FC = () => (
  <Breadcrumb>
    <Breadcrumb.Item href="">
      <HomeOutlined />
    </Breadcrumb.Item>
    <Breadcrumb.Item href="">
      <UserOutlined />
      <span>Application List</span>
    </Breadcrumb.Item>
    <Breadcrumb.Item>Application</Breadcrumb.Item>
  </Breadcrumb>
);

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['fontSizeIcon', 'fontSize'],
  key: 'breadcrumb-icon',
};

export default componentDemo;
