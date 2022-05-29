import { CaretRightOutlined } from '@ant-design/icons';
import { EyeOutlined } from '@ant-design/icons';
import { Collapse, Dropdown, Input, Space } from '@madccc/antd';
import '@madccc/antd/dist/@MadCcc/antd.css';
import React from 'react';
import { SketchPicker } from 'react-color';
import { PreviewContext } from '..';
import type { TokenName } from '../../utils/classifyToken';

const { Panel } = Collapse;

const isColor = (tokenName: string) => {
  return tokenName.startsWith('color');
};

interface TokenItemProps {
  tokenName: TokenName;
}

const AdditionInfo = ({
  info,
  visible,
  tokenName,
}: {
  info: string;
  visible: boolean;
  tokenName: string;
}) => {
  if (isColor(tokenName)) {
    return (
      <div
        style={{
          width: 20,
          height: 20,
          borderRadius: '50%',
          padding: 0,
          boxShadow: `1px 1px lightgrey`,
          backgroundColor: info,
          display: visible ? 'block' : 'none',
        }}
      />
    );
  }

  if (info.toString().length < 6) {
    return (
      <div
        style={{
          maxWidth: 40,
          height: 20,
          overflow: 'hidden',
          backgroundColor: 'rgba(0,0,0,0.04)',
          borderRadius: '8px',
          display: visible ? 'block' : 'none',
          padding: '0 6px',
          lineHeight: '20px',
        }}
      >
        {info}
      </div>
    );
  }

  return null;
};

const ShowUsageButton = ({
  selected,
  toggleSelected,
}: {
  selected: boolean;
  toggleSelected: (v: boolean) => void;
}) => {
  return (
    <EyeOutlined
      style={{
        color: selected ? '#1890ff' : undefined,
        cursor: 'pointer',
        fontSize: 18,
      }}
      onClick={() => toggleSelected(!selected)}
    />
  );
};

export default ({ tokenName }: TokenItemProps) => {
  const { selectedTokens, themes, onSelectToken } =
    React.useContext(PreviewContext);
  const [infoVisible, setInfoVisible] = React.useState(false);

  const ColorPanel = ({
    color,
    onChange,
  }: {
    color: string;
    onChange: (color: string) => void;
  }) => {
    return (
      <SketchPicker
        color={color}
        onChange={(v) => {
          onChange(v.hex);
        }}
      />
    );
  };

  return (
    <Collapse
      collapsible="header"
      ghost
      onChange={() => setInfoVisible(!infoVisible)}
      expandIcon={({ isActive }) => (
        <CaretRightOutlined rotate={isActive ? 90 : 0} />
      )}
    >
      <Panel
        key={tokenName}
        header={
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <span style={{ marginInlineEnd: '5px' }}>{tokenName}</span>
            <Space>
              {themes.map(({ token, title }) => {
                return (
                  <AdditionInfo
                    key={title}
                    tokenName={tokenName}
                    info={token?.[tokenName] as unknown as string}
                    visible={!infoVisible}
                  />
                );
              })}
            </Space>
          </div>
        }
        extra={
          <ShowUsageButton
            selected={selectedTokens.includes(tokenName)}
            toggleSelected={() => {
              onSelectToken(tokenName);
            }}
          />
        }
      >
        <Space
          direction="vertical"
          style={{
            background: '#fafafa',
            borderRadius: 4,
            padding: '8px 0',
          }}
        >
          {themes.map((theme) => {
            return (
              <div key={theme.title}>
                {isColor(tokenName) ? (
                  <Dropdown
                    overlay={
                      <ColorPanel
                        color={theme.token?.[tokenName] as unknown as string}
                        onChange={(v: string) => {
                          theme.onTokenChange({
                            ...theme.token,
                            [tokenName]: v,
                          });
                        }}
                      />
                    }
                  >
                    <Input
                      style={{ width: '100%' }}
                      bordered={false}
                      addonAfter={theme.title}
                      value={theme.token?.[tokenName] as unknown as string}
                      addonBefore={
                        <AdditionInfo
                          tokenName={tokenName}
                          info={theme.token?.[tokenName] as unknown as string}
                          visible={true}
                        />
                      }
                      onChange={(e) => {
                        theme.onTokenChange({
                          ...theme.token,
                          [tokenName]: e.target.value,
                        });
                      }}
                    />
                  </Dropdown>
                ) : (
                  <Input
                    style={{ width: '100%' }}
                    addonAfter={theme.title}
                    bordered={false}
                    value={theme.token?.[tokenName] as unknown as string}
                    onChange={(e) => {
                      theme.onTokenChange({
                        ...theme.token,
                        [tokenName]: e.target.value,
                      });
                    }}
                  />
                )}
              </div>
            );
          })}
        </Space>
      </Panel>
    </Collapse>
  );
};
