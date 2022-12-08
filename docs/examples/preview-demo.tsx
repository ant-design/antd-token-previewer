import { theme } from 'antd';
import { PreviewDemo } from 'antd-token-previewer';
import React from 'react';

const Demo = () => {
  return (
    <PreviewDemo
      theme={{
        name: '123',
        key: '123',
        config: {
          token: { colorPrimary: '#00b96b' },
          algorithm: theme.darkAlgorithm,
        },
      }}
      style={{ height: 600 }}
    />
  );
};

export default Demo;
