import { ConfigProvider, Segmented, theme as antdTheme } from 'antd';
import type { MutableTheme } from 'antd-token-previewer';
import type { FC } from 'react';
import React from 'react';
import ComponentDemoGroup from '../component-panel/ComponentDemoGroup';
import { Error, Primary, Success, Warning } from '../overviews';

export type ComponentDemoProProps = {
  selectedTokens?: string[];
  theme: MutableTheme;
  components: Record<string, string[]>;
  activeComponents?: string[];
  style?: React.CSSProperties;
};

const ComponentDemoPro: FC<ComponentDemoProProps> = ({
  selectedTokens,
  theme,
  components,
  activeComponents,
  style,
}) => {
  const [mode, setMode] = React.useState<'overview' | 'component'>('overview');
  const {
    token: { colorBgLayout },
  } = antdTheme.useToken();

  const overviewDemo = React.useMemo(() => {
    if (selectedTokens?.includes('colorError')) {
      return <Error />;
    }
    if (selectedTokens?.includes('colorSuccess')) {
      return <Success />;
    }
    if (selectedTokens?.includes('colorWarning')) {
      return <Warning />;
    }
    return <Primary />;
  }, [selectedTokens]);

  return (
    <div style={{ ...style, background: colorBgLayout }}>
      <div style={{ margin: 'auto', width: 960 }}>
        <Segmented
          options={[
            { value: 'overview', label: '概览' },
            { value: 'component', label: '组件' },
          ]}
          value={mode}
          onChange={setMode as any}
          style={{ margin: '12px 0 0 12px' }}
        />
        {mode === 'overview' ? (
          <div style={{ margin: 12, maxWidth: 'fit-content' }}>
            {overviewDemo}
          </div>
        ) : (
          <ComponentDemoGroup
            selectedTokens={selectedTokens}
            themes={[theme]}
            components={components}
            activeComponents={activeComponents}
          />
        )}
      </div>
    </div>
  );
};

export default (props: ComponentDemoProProps) => (
  <ConfigProvider theme={props.theme.config}>
    <ComponentDemoPro {...props} />
  </ConfigProvider>
);
