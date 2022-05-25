import { PageContainer } from '@ant-design/pro-layout';
import '@ant-design/pro-layout/dist/layout.css';
import { Button } from '@madccc/antd';
import React from 'react';
import AliasTokenPreview from './alias-token-preview';

export default () => (
  <div
    style={{
      background: '#F5F7FA',
    }}
  >
    <PageContainer
      header={{
        title: '主题预览器',
        ghost: true,
        extra: [<Button key="1">组件</Button>, <Button key="2">场景</Button>],
      }}
    >
      <AliasTokenPreview key={'AliasTokenPanel'} />
    </PageContainer>
  </div>
);
