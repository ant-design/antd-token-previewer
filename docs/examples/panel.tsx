import React from 'react';
import { Space } from '@madccc/antd';
import type { TokenPreviewProps } from 'antd-token-previewer';
import { TokenPanel } from 'antd-token-previewer';
import { useToken } from '@madccc/antd/es/_util/theme';

export default () => {
  const [, token] = useToken();

  const tokens = [
    {
      config: {},
      key: 'default',
      name: '默认主题',
    },
  ] as TokenPreviewProps['themes'];

  return (
    <div
      style={{
        background: '#F5F7FA',
      }}
    >
      <Space align="start">
        <TokenPanel
          themes={tokens}
          defaultTheme={{ override: { alias: { ...token } } }}
        />
      </Space>
    </div>
  );
};
