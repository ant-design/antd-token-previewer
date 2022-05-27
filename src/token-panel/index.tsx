import useToken from '../hooks/useToken';
import React, { useState } from 'react';
import AliasTokenPreview, { TokenPreviewProps } from './alias-token-preview';
import { Space, Typography } from '@madccc/antd';

export default () => {
  const [normalToken, onNormalTokenChange] = useToken();
  const [darkToken, onDarkTokenChange] = useToken();
  const [selectedTokens, onSelectedTokens] = useState<{ tokenName: string }[]>(
    [],
  );

  const tokens = [
    {
      token: normalToken,
      onTokenChange: onNormalTokenChange,
      title: '默认主题',
    },
    { token: darkToken, onTokenChange: onDarkTokenChange, title: '暗色主题' },
  ] as TokenPreviewProps['tokens'];

  return (
    <div
      style={{
        background: '#F5F7FA',
      }}
    >
      <Space align="start">
        <AliasTokenPreview {...{ tokens, selectedTokens, onSelectedTokens }} />
        <Typography.Title>🎯: {selectedTokens.join(',')}</Typography.Title>
      </Space>
    </div>
  );
};
