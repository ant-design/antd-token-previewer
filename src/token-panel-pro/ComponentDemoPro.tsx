import {
  ConfigProvider,
  Empty,
  Segmented,
  Space,
  theme as antdTheme,
} from 'antd';
import type { MutableTheme } from 'antd-token-previewer';
import type { FC } from 'react';
import React, { useEffect } from 'react';
import { useLocale } from '../locale';
import { Error, Primary, Success, Warning } from '../overviews';

export type ComponentDemoProProps = {
  theme: MutableTheme;
  style?: React.CSSProperties;
  advanced?: boolean;
};

const ComponentDemoPro: FC<ComponentDemoProProps> = ({ style, advanced }) => {
  const [mode, setMode] = React.useState<'overview' | 'page'>('page');
  const {
    token: { colorBgLayout },
  } = antdTheme.useToken();
  const locale = useLocale();

  useEffect(() => {
    if (!advanced) {
      setMode('page');
    }
  }, [advanced]);

  return (
    <div style={{ ...style, background: colorBgLayout, paddingBottom: 24 }}>
      <div style={{ margin: 'auto', maxWidth: 960 }}>
        {advanced && (
          <Segmented
            options={[
              { value: 'page', label: locale.demo.page },
              { value: 'overview', label: locale.demo.overview },
            ]}
            value={mode}
            onChange={setMode as any}
            style={{ margin: '12px 0 0 12px' }}
          />
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
          <div style={{ margin: 12, maxWidth: 'fit-content' }}>
            {mode === 'overview' ? (
              <Space direction="vertical" size={24}>
                <Primary />
                <Success />
                <Error />
                <Warning />
              </Space>
            ) : (
              <div>
                <Empty />
              </div>
            )}
          </div>
        </ConfigProvider>
      </div>
    </div>
  );
};

export default (props: ComponentDemoProProps) => (
  <ConfigProvider theme={props.theme.config}>
    <ComponentDemoPro {...props} />
  </ConfigProvider>
);
