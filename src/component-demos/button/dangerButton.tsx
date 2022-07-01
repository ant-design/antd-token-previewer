import React from 'react';
import { Button, Space } from '@madccc/antd';
import type { ComponentDemo } from '../../interface';

const Demo = () => (
  <Space>
    <Button type="primary" danger>
      primary
    </Button>
    <Button type="default" danger>
      default
    </Button>
    <Button type="text" danger>
      text
    </Button>
    <Button ghost danger>
      ghost
    </Button>
    <Button type="link" danger>
      link
    </Button>
  </Space>
);

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: [
    'colorError',
    'colorErrorActive',
    'colorErrorBorder',
    'colorErrorOutline',
  ],
};

export default componentDemo;
