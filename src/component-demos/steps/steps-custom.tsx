import {
  LoadingOutlined,
  SmileOutlined,
  SolutionOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Steps } from 'antd';
import React from 'react';
import type { ComponentDemo } from '../../interface';

const { Step } = Steps;

const Demo: React.FC = () => (
  <Steps direction={'vertical'}>
    <Step status="finish" title="Login" icon={<UserOutlined />} />
    <Step status="finish" title="Verification" icon={<SolutionOutlined />} />
    <Step status="process" title="Pay" icon={<LoadingOutlined />} />
    <Step status="wait" title="Done" icon={<SmileOutlined />} />
  </Steps>
);

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: [],
  key: 'icons',
};

export default componentDemo;
