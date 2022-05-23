import ProCard from '@ant-design/pro-card';
import { PageContainer } from '@ant-design/pro-layout';
import '@ant-design/pro-layout/dist/layout.css';
import { Button } from 'antd';
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
      <ProCard
        title="左右分栏带标题"
        extra="2019年9月28日"
        split={'vertical'}
        bordered
        headerBordered
        style={{ minHeight: '90vh' }}
      >
        <ProCard title="左侧详情" colSpan="25%">
          <AliasTokenPreview />
        </ProCard>
        <ProCard title="流量占用情况">
          <div style={{ height: 360 }}>右侧内容</div>
        </ProCard>
      </ProCard>
      {/*<ProCard>*/}
      {/*  <AliasTokenPreview/>*/}
      {/*</ProCard>*/}
    </PageContainer>
  </div>
);
