import type { FC } from 'react';
import React, { useState } from 'react';
import { ConfigProvider, Layout, message } from '@madccc/antd';
import classNames from 'classnames';
import ComponentPanel from './component-panel';
import type { ThemeSelectProps } from './ThemeSelect';
import ThemeSelect from './ThemeSelect';
import useToken from './hooks/useToken';
import { DarkTheme, CompactTheme, Control } from './icons';
import makeStyle from './utils/makeStyle';
import type { MutableTheme } from './token-panel';
import TokenPanel from './token-panel';

const { Header, Sider, Content } = Layout;

const useStyle = makeStyle('layout', (token) => ({
  '.previewer-header.ant-layout-header': {
    backgroundColor: 'white !important',
    display: 'flex',
    alignItems: 'center',
    borderBottom: `${token.lineWidth}px ${token.lineType} ${token.colorSplit}`,
    paddingLeft: token.paddingLG,
  },
}));

const InternalPreviewer: React.FC = () => {
  const [wrapSSR, hashId] = useStyle();
  const [token] = useToken();
  const [shownThemes, setShownThemes] = useState<string[]>(['default']);
  const [enabledThemes, setEnabledThemes] = useState<string[]>(['default']);
  const [selectedTokens, setSelectedTokens] = useState<string[]>([]);

  const [themes, setThemes] = useState<ThemeSelectProps['themes']>([
    {
      name: '默认主题',
      key: 'default',
      config: { override: { derivative: token } },
      fixed: true,
    },
    {
      name: '暗色主题',
      key: 'dark',
      config: { override: { derivative: token } },
      icon: <DarkTheme style={{ fontSize: 16 }} />,
      closable: true,
    },
    {
      name: '紧凑主题',
      key: 'compact',
      config: { override: { derivative: token } },
      icon: <CompactTheme style={{ fontSize: 16 }} />,
      closable: true,
    },
  ]);

  return wrapSSR(
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
            onEnabledThemeChange={(value) => {
              if (enabledThemes.length === 2) {
                message.warning({
                  content: '最多同时展示两个主题',
                });
                return;
              }
              setEnabledThemes(value);
            }}
            onShownThemeChange={(value) => setShownThemes(value)}
          />
        </div>
      </Header>
      <Layout
        style={{
          height: 'calc(100vh - 64px)',
        }}
      >
        <Sider
          style={{
            backgroundColor: 'white',
            padding: 16,
            height: '100%',
            overflow: 'auto',
          }}
          width={340}
        >
          <TokenPanel
            themes={enabledThemes.map<MutableTheme>((item) => {
              const themeEntity = themes.find((theme) => theme.key === item)!;
              return {
                name: themeEntity.name,
                key: themeEntity.key,
                config: themeEntity.config,
                onThemeChange: (newTheme) => {
                  setThemes((prev) =>
                    prev.map((theme) =>
                      theme.key === themeEntity.key
                        ? {
                            ...theme,
                            config: newTheme,
                          }
                        : theme,
                    ),
                  );
                },
              };
            })}
            selectedTokens={selectedTokens}
            onTokenSelect={(tokenName) =>
              setSelectedTokens((prev) =>
                prev.includes(tokenName)
                  ? prev.filter((item) => item !== tokenName)
                  : [...prev, tokenName],
              )
            }
          />
        </Sider>
        <Content
          style={{
            padding: '28px 20px 28px 24px',
            height: '100%',
            overflow: 'hidden',
          }}
        >
          <ComponentPanel
            selectedTokens={selectedTokens}
            themes={enabledThemes.map(
              (theme) => themes.find((item) => item.key === theme)!,
            )}
          />
        </Content>
      </Layout>
    </Layout>,
  );
};

const Previewer: FC = (props) => {
  return (
    <ConfigProvider theme={{ hashed: true }}>
      <InternalPreviewer {...props} />
    </ConfigProvider>
  );
};

export default Previewer;
