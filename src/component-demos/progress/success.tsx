import { Progress } from 'antd';
import React from 'react';
import type { ComponentDemo } from '../../interface';

const Demo: React.FC = () => (
  <>
    <Progress percent={30} status="success" />
    <Progress percent={50} status="success" />
    <Progress percent={70} status="success" type={'dashboard'} />
    <Progress percent={80} status="success" type={'circle'} />
    <Progress steps={8} status="success" percent={30} />
  </>
);

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorSuccess'],
  key: 'success',
};

export default componentDemo;
