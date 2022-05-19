import React from 'react';
import { Layout } from '@madccc/antd';
import classNames from 'classnames';
import makeStyle from './utils/makeStyle';
import TokenProvider from './TokenProvider';
import TokenList from './TokenList';
import ComponentPanel from './component-panel';

const { Header, Sider, Content } = Layout;

const useStyle = makeStyle('layout', (token) => ({
  '.previewer-header': {
    backgroundColor: 'white !important',
    display: 'flex',
    alignItems: 'center',
    borderBottom: `${token.lineWidth}px ${token.lineType} ${token.colorSplit}`,
  },
}));

const Previewer: React.FC = () => {
  const [wrapSSR, hashId] = useStyle();

  return wrapSSR(
    <TokenProvider>
      <Layout>
        <Header className={classNames('previewer-header', hashId)}>
          <span style={{ fontSize: 16, fontWeight: 'bold' }}>主题预览器</span>
        </Header>
        <Layout>
          <Sider style={{ backgroundColor: 'white', padding: 16 }} width={400}>
            <TokenList />
          </Sider>
          <Content style={{ padding: '28px 20px 28px 24px' }}>
            <ComponentPanel />
          </Content>
        </Layout>
      </Layout>
      ,
    </TokenProvider>,
  );
};

export default Previewer;
