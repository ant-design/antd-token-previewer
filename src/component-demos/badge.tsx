import React from 'react';
import { Badge, Avatar, Space } from '@madccc/antd';
import { ClockCircleOutlined } from '@ant-design/icons';

export default () => (
  <Space size="large">
    <Badge count={5}>
      <Avatar shape="square" size="large" />
    </Badge>
    <Badge count={0} showZero>
      <Avatar shape="square" size="large" />
    </Badge>
    <Badge count={<ClockCircleOutlined style={{ color: '#f5222d' }} />}>
      <Avatar shape="square" size="large" />
    </Badge>
  </Space>
);
