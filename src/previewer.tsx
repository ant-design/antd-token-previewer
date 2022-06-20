import type { FC } from 'react';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Button, ConfigProvider, Layout, message } from '@madccc/antd';
import classNames from 'classnames';
import ComponentPanel from './component-panel';
import type { ThemeSelectProps } from './ThemeSelect';
import ThemeSelect from './ThemeSelect';
import useToken from './hooks/useToken';
import { DarkTheme, CompactTheme, Arrow } from './icons';
import makeStyle from './utils/makeStyle';
import type { TokenPanelRef } from './token-panel';
import TokenPanel from './token-panel';
import type { FilterMode } from './FilterPanel';
import FilterPanel from './FilterPanel';
import type { MutableTheme, TokenName } from './interface';
import type { TokenType } from './utils/classifyToken';
import { useDebounceFn } from 'ahooks';
import type { ThemeConfig } from '@madccc/antd/es/config-provider/context';

import {
  darkAliasToken,
  darkComponentToken,
  darkColorPalettes,
} from './theme/dark';

const { Header, Sider, Content } = Layout;
const SIDER_WIDTH = 340;

const useStyle = makeStyle('layout', (token) => ({
  '.previewer-layout.ant-layout': {
    '.ant-layout-header': {
      backgroundColor: 'white !important',
      display: 'flex',
      alignItems: 'center',
      borderBottom: `${token.lineWidth}px ${token.lineType} ${token.colorSplit}`,
      paddingInline: `${token.paddingLG}px !important`,
    },

    '.ant-layout-sider': {
      padding: 0,
      borderInlineEnd: `${token.lineWidth}px ${token.lineType} ${token.colorSplit}`,
      transition: `all ${token.motionDurationSlow}`,
      overflow: 'visible !important',

      '.ant-btn.ant-btn-circle.previewer-sider-collapse-btn': {
        position: 'absolute',
        transform: 'translateX(50%)',
        border: 'none',
        boxShadow:
          '0 2px 8px -2px rgba(0,0,0,0.05), 0 1px 4px -1px rgba(25,15,15,0.07), 0 0 1px 0 rgba(0,0,0,0.08)',
        marginTop: token.margin,
        right: 0,
        color: 'rgba(0,0,0,0.25)',

        '&:hover': {
          color: 'rgba(0,0,0,0.45)',
          boxShadow:
            '0 2px 8px -2px rgba(0,0,0,0.18), 0 1px 4px -1px rgba(25,15,15,0.18), 0 0 1px 0 rgba(0,0,0,0.18)',
        },

        '.previewer-sider-collapse-btn-icon': {
          fontSize: 16,
          marginTop: 4,
          transition: 'transform 0.3s',
        },

        '&-collapsed': {
          borderRadius: '0 100px 100px 0',
          transform: 'translateX(90%)',
          '.previewer-sider-collapse-btn-icon': {
            transform: 'rotate(180deg)',
          },
        },
      },

      '.previewer-sider-handler': {
        position: 'absolute',
        right: 0,
        height: '100%',
        width: 8,
        transform: 'translateX(50%)',
        cursor: 'ew-resize',
        opacity: 0,
        backgroundColor: 'transparent',
      },
    },
  },
}));

const InternalPreviewer: React.FC = () => {
  const [wrapSSR, hashId] = useStyle();
  const [token] = useToken();
  const [shownThemes, setShownThemes] = useState<string[]>(['default', 'dark']);
  const [enabledThemes, setEnabledThemes] = useState<string[]>([
    'default',
    'dark',
  ]);
  const [selectedTokens, setSelectedTokens] = useState<TokenName[]>([]);
  const [siderVisible, setSiderVisible] = useState<boolean>(true);
  const [siderWidth, setSiderWidth] = useState<number>(SIDER_WIDTH);
  const [filterMode, setFilterMode] = useState<FilterMode>('filter');
  const [filterTypes, setFilterTypes] = useState<TokenType[]>([]);

  const tokenPanelRef = useRef<TokenPanelRef>(null);
  const dragRef = useRef(false);

  const [themes, setThemes] = useState<ThemeSelectProps['themes']>([
    {
      name: '默认主题',
      key: 'default',
      config: { override: { alias: token } },
      fixed: true,
    },
    {
      name: '暗色主题',
      key: 'dark',
      config: {
        override: {
          alias: { ...token, ...darkColorPalettes, ...darkAliasToken },
          ...darkComponentToken,
        },
      },
      icon: <DarkTheme style={{ fontSize: 16 }} />,
      closable: true,
    },
    {
      name: '紧凑主题',
      key: 'compact',
      config: { override: { alias: token } },
      icon: <CompactTheme style={{ fontSize: 16 }} />,
      closable: true,
    },
  ]);

  useEffect(() => {
    const handleMouseUp = () => {
      dragRef.current = false;
      document.body.style.cursor = '';
    };
    const handleMouseMove = (e: MouseEvent) => {
      if (dragRef.current) {
        e.preventDefault();
        setSiderWidth(e.clientX > SIDER_WIDTH ? e.clientX : SIDER_WIDTH);
      }
    };

    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const debouncedSetTheme = useDebounceFn(
    (themeConfig: ThemeConfig, themeKey: string) => {
      setThemes((prev) =>
        prev.map((theme) =>
          theme.key === themeKey
            ? {
                ...theme,
                config: themeConfig,
              }
            : theme,
        ),
      );
    },
    { wait: 500 },
  );

  const handleTokenClick = useCallback((tokenName: TokenName) => {
    tokenPanelRef.current?.scrollToToken(tokenName);
  }, []);

  const mutableThemes = useMemo(
    () =>
      enabledThemes.map<MutableTheme>((item) => {
        const themeEntity = themes.find((theme) => theme.key === item)!;
        return {
          name: themeEntity.name,
          key: themeEntity.key,
          config: themeEntity.config,
          onThemeChange: (newTheme) => {
            debouncedSetTheme.run(newTheme, themeEntity.key);
          },
        };
      }),
    [enabledThemes, themes, debouncedSetTheme],
  );

  return wrapSSR(
    <Layout className={classNames('previewer-layout', hashId)}>
      <Header className="previewer-header">
        <span style={{ fontSize: 16, fontWeight: 'bold', marginRight: 16 }}>
          主题预览器
        </span>
        <div>
          <ThemeSelect
            enabledThemes={enabledThemes}
            shownThemes={shownThemes}
            themes={themes}
            onEnabledThemeChange={(value) => {
              if (value.length > 2) {
                message.warning({
                  content: '最多同时展示两个主题',
                });
                return;
              }
              setEnabledThemes(value);
            }}
            onShownThemeChange={(value, selectTheme, { type }) => {
              if (type === 'select' && enabledThemes.length < 2) {
                setEnabledThemes((prev) => [...prev, selectTheme]);
              }
              setShownThemes(value);
            }}
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
            height: '100%',
            overflow: 'auto',
            flex: `0 0 ${siderWidth}px`,
          }}
          width={siderVisible ? siderWidth : 0}
        >
          <div
            className="previewer-sider-handler"
            onMouseDown={() => {
              dragRef.current = true;
              document.body.style.cursor = 'ew-resize';
            }}
          />
          <Button
            onClick={() => setSiderVisible((prev) => !prev)}
            className={classNames(
              'previewer-sider-collapse-btn',
              !siderVisible && 'previewer-sider-collapse-btn-collapsed',
            )}
            size="small"
            icon={
              <Arrow
                rotate={siderVisible ? 0 : 180}
                className="previewer-sider-collapse-btn-icon"
              />
            }
            shape="circle"
          />
          <TokenPanel
            ref={tokenPanelRef}
            filterTypes={filterTypes}
            onFilterTypesChange={(types) => setFilterTypes(types)}
            themes={mutableThemes}
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
            padding: '16px 20px 28px 24px',
            height: '100%',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <FilterPanel
            selectedTokens={selectedTokens}
            onSelectedTokensChange={(tokens) => setSelectedTokens(tokens)}
            filterMode={filterMode}
            onFilterModeChange={(mode) => setFilterMode(mode)}
            onTokenClick={handleTokenClick}
          />
          <ComponentPanel
            filterMode={filterMode}
            selectedTokens={selectedTokens}
            themes={mutableThemes}
            onTokenClick={handleTokenClick}
            style={{ flex: 1, height: 0, marginTop: 12 }}
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
