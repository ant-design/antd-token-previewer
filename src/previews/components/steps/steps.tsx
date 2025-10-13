import { Steps } from 'antd';
import React from 'react';
import type { ComponentDemo } from '../../../interface';

const Demo: React.FC = () => (
  <Steps
    current={1}
    items={[
      {
        title: 'Finished',
        content: 'This is a description.',
      },
      {
        title: 'In Progress',
        content: 'This is a description.',
      },
      {
        title: 'Waiting',
        content: 'This is a description.',
      },
    ]}
  />
);

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorPrimary', 'colorBgContainer'],
  key: 'default',
};

export default componentDemo;
