import type { FC } from 'react';
import React, { useMemo, useState } from 'react';
import classNames from 'classnames';
import {
  ConfigProvider,
  Drawer,
  Empty,
  Tag,
  theme as antdTheme,
  Tooltip,
} from 'antd';
import makeStyle from '../utils/makeStyle';
import type {
  AliasToken,
  ComponentDemo,
  MutableTheme,
  TokenName,
  TokenValue,
} from '../interface';
import getDesignToken from '../utils/getDesignToken';
import ComponentCard from './ComponentCard';
import ComponentDemos from '../component-demos';
import TokenCard from '../token-panel/token-card';
import { BuildOutlined, CarOutlined } from '@ant-design/icons';
import type { ThemeConfig } from 'antd/es/config-provider/context';
import { getComponentToken } from '../utils/statistic';

const { defaultAlgorithm } = antdTheme;

const useStyle = makeStyle('ComponentTokenDrawer', (token) => ({
  '.previewer-component-token-drawer': {
    [`&${token.rootCls}-drawer ${token.rootCls}-drawer-body`]: {
      padding: '0 !important',
    },

    '.previewer-component-drawer-subtitle': {
      fontWeight: token.fontWeightStrong,
      marginBottom: token.marginSM,
      marginInlineStart: token.marginXS,
      color: token.colorText,
    },

    '.previewer-component-token-drawer-theme': {
      fontWeight: 'normal',
      marginInlineStart: 8,
      borderRadius: 4,
      backgroundColor: token.colorInfoBg,
      color: token.colorPrimary,
      borderColor: token.colorInfoBg,
    },
  },
}));

export type ComponentFullDemosProps = {
  demos: ComponentDemo[];
};

const useComponentFullDemosStyle = makeStyle('ComponentFullDemos', (token) => ({
  '.previewer-component-full-demos': {
    flex: 1,
    overflow: 'auto',
    padding: 24,
    backgroundColor: token.colorBgLayout,
    '> *:not(:last-child)': {
      marginBottom: 12,
    },
  },
}));

const ComponentFullDemos: FC<ComponentFullDemosProps> = ({ demos }) => {
  const [, hashId] = useComponentFullDemosStyle();

  return (
    <div
      className={classNames('previewer-component-full-demos', hashId)}
      style={{}}
    >
      {demos?.map((demo) => (
        <ComponentCard
          key={demo.key}
          title={
            <Tooltip title={demo.tokens?.join(', ')}>
              <span>
                关联 token: {demo.tokens?.join(', ')}
                {(demo.tokens?.length || 0) > 2 ? '...' : ''}
              </span>
            </Tooltip>
          }
        >
          <ConfigProvider
            theme={{
              override: {
                Select: {
                  zIndexPopup: 1010,
                },
                TreeSelect: {
                  zIndexPopup: 1010,
                },
              },
            }}
          >
            {demo.demo}
          </ConfigProvider>
        </ComponentCard>
      ))}
    </div>
  );
};

export type ComponentTokenDrawerProps = {
  visible?: boolean;
  component?: string;
  onClose?: () => void;
  theme: MutableTheme;
  onTokenClick?: (token: TokenName) => void;
};

const ComponentTokenDrawer: FC<ComponentTokenDrawerProps> = ({
  visible,
  component = 'Button',
  onClose,
  theme,
}) => {
  const [, hashId] = useStyle();
  const [config, setConfig] = useState<ThemeConfig>({});

  const { component: componentToken, global: aliasTokenNames } =
    getComponentToken(component) || { global: [] };

  const componentTokenData = useMemo(
    () => Object.keys(componentToken ?? {}),
    [componentToken],
  );

  const aliasTokenData = useMemo(() => {
    return aliasTokenNames.sort();
  }, [aliasTokenNames]);

  const handleComponentTokenChange = (token: string, value: TokenValue) => {
    setConfig((prev) => ({
      ...prev,
      override: {
        ...prev.override,
        [component]: {
          [token]: value,
        },
      },
    }));
  };

  const handleAliasTokenChange = (token: string, value: TokenValue) => {
    setConfig((prev) => ({
      ...prev,
      override: {
        ...prev.override,
        alias: {
          ...prev.override?.alias,
          [token]: value,
        },
      },
    }));
  };

  return (
    <Drawer
      visible={visible}
      title={
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span>{`${component} 组件 Token`}</span>
          <Tag className="previewer-component-token-drawer-theme">
            {theme.name}
          </Tag>
        </div>
      }
      onClose={onClose}
      width={1200}
      className={classNames('previewer-component-token-drawer', hashId)}
    >
      <div style={{ display: 'flex', height: '100%' }}>
        <ConfigProvider theme={theme.config}>
          <ConfigProvider theme={config}>
            <ComponentFullDemos demos={ComponentDemos[component]} />
          </ConfigProvider>
        </ConfigProvider>
        <div style={{ flex: '0 0 400px', overflow: 'auto', padding: 24 }}>
          <div className="previewer-component-drawer-subtitle">
            Related Tokens / 相关 token
          </div>
          <TokenCard
            icon={<BuildOutlined />}
            hideUsageCount
            defaultOpen
            title="Component Token"
            tokenArr={componentTokenData}
            tokenPath={['override', component]}
            themes={[theme]}
            fallback={() => componentToken}
            onTokenChange={(_, tokenName, value) =>
              handleComponentTokenChange(tokenName, value)
            }
            placeholder={
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="暂无相关 Component Token"
                style={{
                  marginBlock: 0,
                  paddingBlock: 32,
                }}
              />
            }
          />
          <TokenCard
            icon={<CarOutlined />}
            hideUsageCount
            themes={[theme]}
            defaultOpen
            title="Alias Token"
            tokenArr={aliasTokenData}
            tokenPath={['override', 'alias']}
            fallback={(themeConfig) =>
              getDesignToken(themeConfig) as AliasToken
            }
            onTokenChange={(_, tokenName, value) =>
              handleAliasTokenChange(tokenName, value)
            }
            placeholder={
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="暂无相关 Alias Token"
                style={{
                  marginBlock: 0,
                  paddingBlock: 32,
                }}
              />
            }
          />
        </div>
      </div>
    </Drawer>
  );
};

export default ({ ...props }: ComponentTokenDrawerProps) => (
  <ConfigProvider theme={{ algorithm: defaultAlgorithm }}>
    <ComponentTokenDrawer {...props} />
  </ConfigProvider>
);
