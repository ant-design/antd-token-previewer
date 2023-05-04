import { ExpandOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Button,
  ConfigProvider,
  Segmented,
  Space,
  theme as antdTheme,
  Tooltip,
} from 'antd';
import type { MutableTheme } from 'antd-token-previewer';
import type { FC, ReactNode } from 'react';
import React, { memo, useEffect } from 'react';
import ReactFlow, {
  Background,
  Panel,
  ReactFlowProvider,
  useNodesInitialized,
  useReactFlow,
  useViewport,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useLocale } from '../locale';
import { Error, Primary, Success, Warning } from '../previews/overviews';
import AppDemo from '../previews/pages';

const Zoom: FC = memo(() => {
  const reactFlow = useReactFlow();
  const { zoom } = useViewport();
  const locale = useLocale();

  const handleZoomTo = () => {
    if (zoom === 1) {
      reactFlow.zoomTo(0.5);
    } else {
      reactFlow.zoomTo(1);
    }
  };

  return (
    <Tooltip
      title={
        zoom === 1 ? `${locale.demo.zoomTo} 2:1` : `${locale.demo.zoomTo} 1:1`
      }
    >
      <Button onClick={handleZoomTo} style={{ width: 64 }}>
        {Math.round(zoom * 100)}%
      </Button>
    </Tooltip>
  );
});
const Controls = () => {
  const { zoomIn, zoomOut, fitView } = useReactFlow();
  const locale = useLocale();

  return (
    <Space style={{ zIndex: 100, position: 'absolute', bottom: 10, right: 10 }}>
      <Button icon={<MinusOutlined />} onClick={zoomOut} />
      <Zoom />
      <Button icon={<PlusOutlined />} onClick={zoomIn} />
      <Tooltip title={locale.demo.fitView}>
        <Button icon={<ExpandOutlined />} onClick={fitView} />
      </Tooltip>
    </Space>
  );
};

const Artboard: FC<{ data: ReactNode }> = ({ data }) => {
  return <div>{data}</div>;
};

const nodeTypes = {
  artboard: Artboard,
};

export type DemoMode = 'overview' | 'page';

export type ComponentDemoProProps = {
  theme: MutableTheme;
  style?: React.CSSProperties;
  advanced?: boolean;
};

const Demo = ({ mode }: { mode: DemoMode }) => {
  const { token } = antdTheme.useToken();

  return (
    <div>
      {mode === 'overview' ? (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Space size={24} align="start">
            <Space direction="vertical" size={24} style={{ width: 960 }}>
              <Primary id="primary-demo" />
              <Success id="success-demo" />
            </Space>
            <Space direction="vertical" size={24} style={{ width: 960 }}>
              <Error id="error-demo" />
              <Warning id="warning-demo" />
            </Space>
          </Space>
        </div>
      ) : (
        <AppDemo
          style={{
            width: 1440,
            height: 'calc(100% - 20px)',
            boxShadow: token.boxShadowTertiary,
            borderRadius: token.marginXS,
            overflow: 'hidden',
            border: `1px solid ${token.colorBorder}`,
          }}
        />
      )}
    </div>
  );
};

const GlobalTokenDemos = (props: ComponentDemoProProps) => {
  const { advanced } = props;
  const [mode, setMode] = React.useState<'overview' | 'page'>('page');
  const locale = useLocale();
  const { token } = antdTheme.useToken();
  const { fitView } = useReactFlow();
  const nodesInitialized = useNodesInitialized();

  useEffect(() => {
    if (nodesInitialized) {
      fitView();
    }
  }, [nodesInitialized]);

  useEffect(() => {
    if (!advanced) {
      setMode('page');
    }
  }, [advanced]);

  return (
    <ReactFlow
      minZoom={0.25}
      maxZoom={4}
      nodes={[
        {
          id: `artboard-${mode}`,
          type: 'artboard',
          data: <Demo mode={mode} />,
          draggable: false,
          connectable: false,
          position: { x: 0, y: 0 },
        },
      ]}
      nodeTypes={nodeTypes}
      onlyRenderVisibleElements
      panOnScroll
      panOnDrag={false}
      zoomOnScroll={false}
      fitView
      proOptions={{
        hideAttribution: true,
      }}
    >
      {advanced && (
        <Panel position="top-center">
          <Segmented
            options={[
              { value: 'page', label: locale.demo.page },
              { value: 'overview', label: locale.demo.overview },
            ]}
            value={mode}
            onChange={setMode as any}
          />
        </Panel>
      )}
      <Controls />
      <Background
        color={token.colorTextSecondary}
        gap={16}
        style={{ zIndex: -1, background: token.colorBgLayout }}
      />
    </ReactFlow>
  );
};

export default (props: ComponentDemoProProps) => (
  <div style={{ position: 'relative', ...props.style }}>
    <ConfigProvider theme={{ ...props.theme.config, inherit: false }}>
      <ReactFlowProvider>
        <GlobalTokenDemos {...props} />
      </ReactFlowProvider>
    </ConfigProvider>
  </div>
);
