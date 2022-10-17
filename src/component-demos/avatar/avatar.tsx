import React from 'react';
import { Avatar, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { ComponentDemo } from '../../interface';

const Demo = () => (
  <Space direction="vertical">
    <Space>
      <Avatar size={64} icon={<UserOutlined />} />
      <Avatar size="large" icon={<UserOutlined />} />
      <Avatar icon={<UserOutlined />} />
      <Avatar size="small" icon={<UserOutlined />} />
    </Space>
    <Space>
      <Avatar shape="square" size={64} icon={<UserOutlined />} />
      <Avatar shape="square" size="large" icon={<UserOutlined />} />
      <Avatar shape="square" icon={<UserOutlined />} />
      <Avatar shape="square" size="small" icon={<UserOutlined />} />
    </Space>
  </Space>
);

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: [],
  key: 'avatar',
};

export default componentDemo;
