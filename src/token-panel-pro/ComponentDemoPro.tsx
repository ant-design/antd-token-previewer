import { ConfigProvider, Segmented, Spin } from 'antd';
import type { MutableTheme } from 'antd-token-previewer';
import type { FC } from 'react';
import React from 'react';
import ComponentDemoGroup from '../component-panel/ComponentDemoGroup';
import { Error, Primary, Success, Warning } from '../overviews';

export type ComponentDemoProProps = {
  selectedTokens?: string[];
  themes: MutableTheme[];
  components: Record<string, string[]>;
  activeComponents?: string[];
  loading?: boolean;
};

const ComponentDemoPro: FC<ComponentDemoProProps> = ({
  selectedTokens,
  themes,
  components,
  activeComponents,
  loading,
}) => {
  const [mode, setMode] = React.useState<'overview' | 'component'>('overview');

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
    <Spin spinning={loading}>
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
        <ConfigProvider theme={themes[0].config}>
          <div style={{ margin: 12 }}>{overviewDemo}</div>
        </ConfigProvider>
      ) : (
        <ComponentDemoGroup
          selectedTokens={selectedTokens}
          themes={themes}
          components={components}
          activeComponents={activeComponents}
        />
      )}
    </Spin>
  );
};

export default ComponentDemoPro;
