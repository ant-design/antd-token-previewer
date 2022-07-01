import React from 'react';
import { Typography } from '@madccc/antd';

const { Title, Text } = Typography;

export default () => (
  <div>
    <Title type={'danger'} level={4}>
      Error Title
    </Title>
    <Text type={'danger'}>error Text</Text>
  </div>
);
