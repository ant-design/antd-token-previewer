import React from 'react';
import { Avatar, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { ComponentDemo } from '../../interface';

const Demo = () => (
  <Space direction="vertical">
    <Space>
      <Avatar size="large">U</Avatar>
      <Avatar>U</Avatar>
      <Avatar size="small">U</Avatar>
    </Space>
  </Space>
);

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: [],
  key: 'avatar',
};

export default componentDemo;
