import React from 'react';
import { Layout } from '@madccc/antd';
import makeStyle from '../utils/makeStyle';
import classNames from 'classnames';

const useStyle = makeStyle('LayoutDemo', () => ({
  '.components-layout-demo-basic': {
    textAlign: 'center',
    '> *': {
      marginBottom: 16,
    },
  },
  [`.components-layout-demo-basic .ant-layout-header,
    .components-layout-demo-basic .ant-layout-footer`]: {
    color: '#fff !important',
    background: '#7dbcea !important',
  },
  '.components-layout-demo-basic .ant-layout-footer': {
    lineHeight: 1.5,
  },
  '.components-layout-demo-basic .ant-layout-sider': {
    color: '#fff',
    lineHeight: `120px`,
    background: '#3ba0e9 !important',
  },
  '.components-layout-demo-basic .ant-layout-content': {
    color: '#fff !important',
    lineHeight: `120px`,
    height: 120,
    background: 'rgba(16, 142, 233, 1) !important',
  },
  '.components-layout-demo-basic > .code-box-demo > .ant-layout + .ant-layout':
    {
      marginTop: 48,
    },
}));

const { Header, Footer, Sider, Content } = Layout;
export default () => {
  const [wrapSSR, hashId] = useStyle();

  return wrapSSR(
    <div className={classNames('components-layout-demo-basic', hashId)}>
      <Layout>
        <Header>Header</Header> <Content>Content</Content>{' '}
        <Footer>Footer</Footer>
      </Layout>
      <Layout>
        <Header>Header</Header>
        <Layout>
          <Sider>Sider</Sider> <Content>Content</Content>
        </Layout>
        <Footer>Footer</Footer>
      </Layout>
      <Layout>
        <Header>Header</Header>
        <Layout>
          <Content>Content</Content> <Sider>Sider</Sider>
        </Layout>
        <Footer>Footer</Footer>
      </Layout>
      <Layout>
        <Sider>Sider</Sider>
        <Layout>
          <Header>Header</Header> <Content>Content</Content>
          <Footer>Footer</Footer>{' '}
        </Layout>{' '}
      </Layout>{' '}
    </div>,
  );
};
