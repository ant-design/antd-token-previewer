import React from 'react';
import { Layout, ConfigProvider } from '@madccc/antd';
import { useStyleRegister } from '@ant-design/cssinjs';
import classNames from 'classnames';

const { Header, Sider, Content } = Layout;
const useToken = ConfigProvider.useToken;

const useStyle = (): [
  (node: React.ReactNode) => React.ReactElement,
  string,
] => {
  const [theme, token, hashId] = useToken();

  return [
    useStyleRegister({ theme, hashId, token, path: ['layout'] }, () => {
      return {
        '.previewer-header': {
          backgroundColor: 'white !important',
          display: 'flex',
          alignItems: 'center',
        },
      };
    }) as (node: React.ReactNode) => React.ReactElement,
    hashId,
  ];
};

const Previewer: React.FC = () => {
  const [wrapSSR, hashId] = useStyle();

  return wrapSSR(
    <Layout>
      <Header className={classNames('previewer-header', hashId)}>
        <span style={{ fontSize: 16, fontWeight: 'bold' }}>主题预览器</span>
      </Header>
      <Layout>
        <Sider>Sider</Sider>
        <Content>Content</Content>
      </Layout>
    </Layout>,
  );
};

export default Previewer;
