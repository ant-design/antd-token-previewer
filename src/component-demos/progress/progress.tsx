import { Progress } from '@madccc/antd';
import React from 'react';
import { ComponentDemo } from '../../interface';

const Demo: React.FC = () => (
  <>
    <Progress percent={30} />
    <Progress percent={50} status="active" />
    <Progress percent={70} status="exception" />
    <Progress percent={100} />
    <Progress percent={50} showInfo={false} />
    <Progress steps={8} />
  </>
);

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorError'],
};

export default componentDemo;
