import { Steps } from 'antd';
import React from 'react';
import type { ComponentDemo } from '../../../interface';

const Demo: React.FC = () => (
  <Steps
    current={1}
    items={[
      {
        title: 'Error',
        content: 'This is a description.',
        status: 'error',
      },
      {
        title: 'In Progress',
        subTitle: 'Left 00:00:08',
        content: 'This is a description.',
        status: 'error',
      },
    ]}
  />
);

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorError'],
  key: 'danger',
};

export default componentDemo;
