import { EyeOutlined } from '@ant-design/icons';
import { Collapse, Input } from '@madccc/antd';
import '@madccc/antd/dist/@MadCcc/antd.css';
import React from 'react';

const { Panel } = Collapse;

const isColor = (tokenName: string) => {
  return tokenName.startsWith('color');
};

interface TokenItemProps {
  tokenName: string;
  value: string;
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
          padding: 0,
          maxWidth: 40,
          height: 20,
          overflow: 'hidden',
          backgroundColor: 'rgba(0,0,0,0.05)',
          borderRadius: '3px',
          display: visible ? 'block' : 'none',
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

export default ({ tokenName, value }: TokenItemProps) => {
  const [currentInfo, setCurrentInfo] = React.useState(value);
  const [infoVisible, setInfoVisible] = React.useState(false);

  return (
    <Collapse
      collapsible="header"
      ghost
      onChange={() => setInfoVisible(!infoVisible)}
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
            <AdditionInfo
              tokenName={tokenName}
              info={currentInfo}
              visible={!infoVisible}
            />
          </div>
        }
        extra={<ShowUsageButton />}
      >
        <div>
          {isColor(tokenName) ? (
            <Input
              style={{ width: 250 }}
              addonAfter={'默认主题'}
              addonBefore={
                <AdditionInfo
                  tokenName={tokenName}
                  info={currentInfo}
                  visible={true}
                />
              }
              defaultValue={currentInfo}
              onChange={(e) => {
                setCurrentInfo(e.target.value);
              }}
            />
          ) : (
            <Input
              style={{ width: 250 }}
              addonAfter={'默认主题'}
              defaultValue={currentInfo}
              onChange={(e) => setCurrentInfo(e.target.value)}
            />
          )}
        </div>
      </Panel>
    </Collapse>
  );
};
