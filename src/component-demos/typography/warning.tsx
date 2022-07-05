import React from 'react';
import { Typography } from '@madccc/antd';
import type { ComponentDemo } from '../../interface';

const { Title, Text } = Typography;

const Demo = () => (
  <div>
    <Title type={'warning'} level={4}>
      Error Title
    </Title>
    <Text type={'warning'}>error Text</Text>
  </div>
);

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorWarning'],
};

export default componentDemo;
