import { Progress } from 'antd';
import React from 'react';
import type { ComponentDemo } from '../../interface';

const Demo: React.FC = () => (
  <>
    <Progress percent={30} status="exception" />
    <Progress percent={50} status="exception" />
    <Progress percent={70} status="exception" type={'dashboard'} />
    <Progress percent={80} status="exception" type={'circle'} />
    <Progress steps={8} status="exception" percent={30} />
  </>
);

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorError'],
};

export default componentDemo;
