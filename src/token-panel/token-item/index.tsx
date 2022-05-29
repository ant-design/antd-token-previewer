import { CaretRightOutlined } from '@ant-design/icons';
import { Collapse, Dropdown, Input, Space } from '@madccc/antd';
import '@madccc/antd/dist/@MadCcc/antd.css';
import { Pick } from '../../../icons';
import React from 'react';
import { SketchPicker } from 'react-color';
import type { MutableTheme } from '..';
import { PreviewContext } from '..';
import type { TokenName } from '../../utils/classifyToken';
import type { TokenValue } from '../../interface';
import makeStyle from '../../utils/makeStyle';
import classNames from 'classnames';

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
  info: string | number;
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
          backgroundColor: String(info),
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
    <Pick
      style={{
        color: selected ? '#1890ff' : undefined,
        cursor: 'pointer',
        fontSize: 16,
        transition: 'color 0.3s',
        marginLeft: 12,
        verticalAlign: 'middle',
      }}
      onClick={() => toggleSelected(!selected)}
    />
  );
};

const useStyle = makeStyle('TokenItem', () => ({
  '.previewer-token-item.ant-collapse-item': {
    '.ant-collapse-header-text': {
      flex: 1,
      width: 0,
    },
  },
}));

export default ({ tokenName }: TokenItemProps) => {
  const { selectedTokens, themes, onTokenSelect } =
    React.useContext(PreviewContext);
  const [infoVisible, setInfoVisible] = React.useState(false);
  const [wrapSSR, hashId] = useStyle();

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

  const handleTokenChange = (theme: MutableTheme, value: TokenValue) => {
    theme.onThemeChange?.({
      ...theme.config,
      override: {
        ...theme.config.override,
        derivative: {
          ...theme.config.override?.derivative,
          [tokenName]: value,
        },
      },
    });
  };

  return wrapSSR(
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
        className={classNames('previewer-token-item', hashId)}
        header={
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <span
              title={tokenName}
              style={{
                marginInlineEnd: '5px',
                flex: 1,
                width: 0,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {tokenName}
            </span>
            <Space>
              {themes.map(({ config, key }) => {
                return (
                  <AdditionInfo
                    key={key}
                    tokenName={tokenName}
                    info={config.override?.derivative?.[tokenName] ?? ''}
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
              onTokenSelect(tokenName);
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
              <div key={theme.key}>
                {isColor(tokenName) ? (
                  <Dropdown
                    overlay={
                      <ColorPanel
                        color={String(
                          theme.config.override?.derivative?.[tokenName],
                        )}
                        onChange={(v: string) => {
                          handleTokenChange(theme, v);
                        }}
                      />
                    }
                  >
                    <Input
                      style={{ width: '100%' }}
                      bordered={false}
                      addonAfter={theme.name}
                      value={String(
                        theme.config?.override?.derivative?.[tokenName],
                      )}
                      addonBefore={
                        <AdditionInfo
                          tokenName={tokenName}
                          info={String(
                            theme.config?.override?.derivative?.[tokenName],
                          )}
                          visible
                        />
                      }
                      onChange={(e) => {
                        handleTokenChange(theme, e.target.value);
                      }}
                    />
                  </Dropdown>
                ) : (
                  <Input
                    style={{ width: '100%' }}
                    addonAfter={theme.name}
                    bordered={false}
                    value={String(
                      theme.config?.override?.derivative?.[tokenName],
                    )}
                    onChange={(e) => {
                      handleTokenChange(theme, e.target.value);
                    }}
                  />
                )}
              </div>
            );
          })}
        </Space>
      </Panel>
    </Collapse>,
  );
};
