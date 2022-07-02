import React from 'react';
import { Badge, Avatar, Space, theme } from '@madccc/antd';
import { ClockCircleFilled } from '@ant-design/icons';

export default () => {
  const { token } = theme.useToken();
  return (
    <Space size="large">
      <Badge count={5}>
        <Avatar shape="square" size="large" />
      </Badge>
      <Badge count={0} showZero>
        <Avatar shape="square" size="large" />
      </Badge>
      <Badge count={<ClockCircleFilled style={{ color: token.colorError }} />}>
        <Avatar shape="square" size="large" />
      </Badge>
    </Space>
  );
};
