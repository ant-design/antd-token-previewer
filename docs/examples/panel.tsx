import React, { useState } from 'react';
import { Space, Typography } from '@madccc/antd';
import type { TokenPreviewProps } from 'antd-token-previewer';
import { TokenPanel, useToken } from 'antd-token-previewer';

export default () => {
  const [normalToken] = useToken();
  const [darkToken] = useToken();
  const [selectedTokens, setSelectedTokens] = useState<string[]>([]);

  const tokens = [
    {
      config: { override: { alias: normalToken } },
      onThemeChange: (token) => {
        console.log(token);
      },
      key: 'default',
      name: '默认主题',
    },
    {
      config: { override: { alias: darkToken } },
      onThemeChange: (token) => {
        console.log(token);
      },
      key: 'dark',
      name: '暗色主题',
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
          selectedTokens={selectedTokens}
          onTokenSelect={(token) =>
            setSelectedTokens((prev) =>
              prev.includes(token)
                ? prev.filter((item) => item !== token)
                : [...prev, token],
            )
          }
        />
        <Typography.Title>🎯: {selectedTokens.join(',')}</Typography.Title>
      </Space>
    </div>
  );
};
