import {
  Anchor,
  ConfigProvider,
  Segmented,
  Space,
  theme as antdTheme,
} from 'antd';
import type { MutableTheme } from 'antd-token-previewer';
import type { FC } from 'react';
import React, { useEffect } from 'react';
import { Error, Primary, Success, Warning } from '../demos/overviews';
import AppDemo from '../demos/pages';
import { useLocale } from '../locale';

export type ComponentDemoProProps = {
  theme: MutableTheme;
  style?: React.CSSProperties;
  advanced?: boolean;
};

const ComponentDemoPro: FC<ComponentDemoProProps> = ({ style, advanced }) => {
  const [mode, setMode] = React.useState<'overview' | 'page'>('page');
  const { token } = antdTheme.useToken();
  const locale = useLocale();
  const containerRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!advanced) {
      setMode('page');
    }
  }, [advanced]);

  return (
    <div
      style={{
        ...style,
        background: token.colorBgLayout,
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        {advanced && (
          <div style={{ flex: 'none' }}>
            <Segmented
              options={[
                { value: 'page', label: locale.demo.page },
                { value: 'overview', label: locale.demo.overview },
              ]}
              value={mode}
              onChange={setMode as any}
              style={{ margin: '12px 0 0 20px' }}
            />
          </div>
        )}

        <ConfigProvider
          theme={{
            components: {
              Select: {
                zIndexPopup: 10,
              },
              DatePicker: {
                zIndexPopup: 10,
              },
              Dropdown: {
                zIndexPopup: 10,
              },
              Mentions: {
                zIndexPopup: 10,
              },
              Tooltip: {
                zIndexPopup: 10,
              },
              Popover: {
                zIndexPopup: 10,
              },
              Popconfirm: {
                zIndexPopup: 10,
              },
            },
          }}
        >
          <div
            style={{
              margin: `12px 20px 0`,
              flex: 1,
              height: 0,
              overflow: 'auto',
            }}
            ref={containerRef}
          >
            {mode === 'overview' ? (
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Space direction="vertical" size={24} style={{ maxWidth: 960 }}>
                  <Primary id="primary-demo" />
                  <Success id="success-demo" />
                  <Error id="error-demo" />
                  <Warning id="warning-demo" />
                </Space>
                <Anchor
                  style={{ marginRight: 40 }}
                  affix
                  getContainer={() => containerRef.current!}
                  items={[
                    {
                      title: 'Primary',
                      href: '#primary-demo',
                      key: 'primary-demo',
                    },
                    {
                      title: 'Success',
                      href: '#success-demo',
                      key: 'success-demo',
                    },
                    { title: 'Error', href: '#error-demo', key: 'error-demo' },
                    {
                      title: 'Warning',
                      href: '#warning-demo',
                      key: 'warning-demo',
                    },
                  ]}
                />
              </div>
            ) : (
              <AppDemo
                style={{
                  height: 'calc(100% - 20px)',
                  boxShadow: token.boxShadowTertiary,
                  borderRadius: token.marginXS,
                  overflow: 'hidden',
                  border: `1px solid ${token.colorBorder}`,
                  marginBottom: 20,
                }}
              />
            )}
          </div>
        </ConfigProvider>
      </div>
    </div>
  );
};

export default (props: ComponentDemoProProps) => (
  <ConfigProvider theme={{ ...props.theme.config, inherit: false }}>
    <ComponentDemoPro {...props} />
  </ConfigProvider>
);
