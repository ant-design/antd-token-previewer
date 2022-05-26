import React, { useMemo, useState } from 'react';
import { Layout } from '@madccc/antd';
import classNames from 'classnames';
import ComponentPanel from './component-panel';
import ThemeSelect from './ThemeSelect';
import useToken from './hooks/useToken';
import { BellOutlined, SmileOutlined } from '@ant-design/icons';

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
  const [token] = useToken();
  const [shownThemes, setShownThemes] = useState<string[]>(['default', 'dark']);
  const [enabledThemes, setEnabledThemes] = useState<string[]>(['default']);

  const themes = useMemo(
    () => [
      { name: '默认主题', key: 'default', theme: { token }, fixed: true },
      {
        name: '暗色主题',
        key: 'dark',
        theme: { token: { ...token, colorBg: '#000' } },
        icon: <BellOutlined />,
        closable: true,
      },
      {
        name: '紧凑主题',
        key: 'compact',
        theme: { token: { ...token, padding: 12 } },
        icon: <SmileOutlined />,
        closable: true,
      },
    ],
    [token],
  );

  return wrapSSR(
    <TokenProvider>
      <Layout>
        <Header className={classNames('previewer-header', hashId)}>
          <span style={{ fontSize: 16, fontWeight: 'bold', marginRight: 16 }}>
            主题预览器
          </span>
          <div>
            <ThemeSelect
              enabledThemes={enabledThemes}
              shownThemes={shownThemes}
              themes={themes}
              onEnabledThemeChange={(value) => setEnabledThemes(value)}
              onShownThemeChange={(value) => setShownThemes(value)}
            />
          </div>
        </Header>
        <Layout>
          <Sider style={{ backgroundColor: 'white', padding: 16 }} width={400}>
            <TokenList />
          </Sider>
          <Content
            style={{
              padding: '28px 20px 28px 24px',
              height: 'calc(100vh - 64px)',
              overflow: 'hidden',
            }}
          >
            <ComponentPanel
              themes={enabledThemes.map(
                (theme) => themes.find((item) => item.key === theme)!,
              )}
            />
          </Content>
        </Layout>
      </Layout>
    </TokenProvider>,
  );
};

export default Previewer;
