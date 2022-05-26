import { CaretRightOutlined } from '@ant-design/icons';
import { EyeOutlined } from '@ant-design/icons';
import { Collapse, Dropdown, Input, Space } from '@madccc/antd';
import '@madccc/antd/dist/@MadCcc/antd.css';
import { GlobalToken } from '@madccc/antd/lib/_util/theme/interface';
import React from 'react';
import { SketchPicker } from 'react-color';
import { PreviewContext } from '..';

const { Panel } = Collapse;

const isColor = (tokenName: string) => {
  return tokenName.startsWith('color');
};

interface TokenItemProps {
  tokenName: keyof GlobalToken;
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

const ShowUsageButton = () => {
  const [color, setColor] = React.useState<undefined | string>(undefined);
  const showTokenUsage = () => {
    setColor((currentColor) => {
      if (currentColor === '#1890ff') {
        return undefined;
      }
      return '#1890ff';
    });
    console.log('usage');
    // some actions
  };

  return (
    <EyeOutlined
      style={{ color: color, cursor: 'pointer', fontSize: 18 }}
      onClick={showTokenUsage}
    />
  );
};

export default ({ tokenName }: TokenItemProps) => {
  const { selectedTokens, tokens, onSelectedTokens } =
    React.useContext(PreviewContext);
  const [currentInfo, setCurrentInfo] = React.useState(null);
  const [infoVisible, setInfoVisible] = React.useState(false);

  function updateTokenValue(title: string, tokenName: string, value: string) {
    const targetToken = tokens.find((token) => token.title === title);
    targetToken?.onTokenChange((prev: any) => ({
      ...prev,
      [tokenName]: value,
    }));
  }

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
              {tokens.map(({ token }) => {
                return (
                  <AdditionInfo
                    tokenName={tokenName}
                    info={token[tokenName] as string}
                    visible={!infoVisible}
                  />
                );
              })}
            </Space>
          </div>
        }
        extra={<ShowUsageButton />}
      >
        <Space direction="vertical">
          {tokens.map((token) => {
            return (
              <div>
                {isColor(tokenName) ? (
                  <Dropdown
                    overlay={
                      <ColorPanel
                        color={token.token?.[tokenName] as string}
                        onChange={(v: string) => {
                          updateTokenValue(token.title, tokenName, v);
                        }}
                      />
                    }
                  >
                    <Input
                      style={{ width: 250 }}
                      addonAfter={token.title}
                      value={token.token?.[tokenName] as string}
                      addonBefore={
                        <AdditionInfo
                          tokenName={tokenName}
                          info={token.token?.[tokenName] as string}
                          visible={true}
                        />
                      }
                      onChange={(e) => {
                        updateTokenValue(
                          token.title,
                          tokenName,
                          e.target.value,
                        );
                      }}
                    />
                  </Dropdown>
                ) : (
                  <Input
                    style={{ width: 250 }}
                    addonAfter={token.title}
                    value={token.token?.[tokenName] as string}
                    onChange={(e) => {
                      updateTokenValue(token.title, tokenName, e.target.value);
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
