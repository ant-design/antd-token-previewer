import { Alert, Space } from 'antd';
import React from 'react';
import type { ComponentDemo } from '../../../interface';

const Demo = () => (
  <Space orientation={'vertical'}>
    <Alert title="Error" type="error" showIcon />
    <Alert
      title="Error"
      description="This is an error message about copywriting."
      type="error"
      showIcon
    />
  </Space>
);

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorErrorBg', 'colorErrorBorder', 'colorError'],
  key: 'error',
};

export default componentDemo;
