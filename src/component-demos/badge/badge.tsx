import React from 'react';
import { Badge, Avatar, Space, theme } from 'antd';
import { ClockCircleFilled } from '@ant-design/icons';
import type { ComponentDemo } from '../../interface';

const Demo = () => {
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

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorError', 'colorBorderBg'],
};

export default componentDemo;
