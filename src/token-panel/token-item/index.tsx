import { CaretRightOutlined } from '@ant-design/icons';
import { Collapse, Dropdown, Input, InputNumber, Space } from '@madccc/antd';
import { Pick } from '../../icons';
import React from 'react';
import { SketchPicker } from 'react-color';
import type { MutableTheme } from '..';
import { PreviewContext } from '..';
import type { TokenName } from '../../utils/classifyToken';
import type { TokenValue } from '../../interface';
import makeStyle from '../../utils/makeStyle';
import classNames from 'classnames';
import ColorPreview from '../../ColorPreview';

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
    return <ColorPreview color={String(info)} />;
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

const useStyle = makeStyle('TokenItem', (token) => ({
  '.previewer-token-item.ant-collapse-item': {
    transition: `background-color ${token.motionDurationSlow}`,

    '&:not(.ant-collapse-item-active):hover': {
      backgroundColor: token.colorBgComponentSecondary,
    },

    '.ant-collapse-header-text': {
      flex: 1,
      width: 0,
    },
    '.ant-collapse-expand-icon': {
      paddingInlineEnd: `${token.paddingXXS}px !important`,
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

  const getTokenInput = (theme: MutableTheme) => {
    if (isColor(tokenName)) {
      return (
        <Input
          bordered={false}
          addonAfter={theme.name}
          value={String(theme.config?.override?.derivative?.[tokenName])}
          addonBefore={
            <Dropdown
              trigger={['click']}
              overlay={
                <ColorPanel
                  color={String(theme.config.override?.derivative?.[tokenName])}
                  onChange={(v: string) => {
                    handleTokenChange(theme, v);
                  }}
                />
              }
            >
              <ColorPreview
                color={String(theme.config?.override?.derivative?.[tokenName])}
                style={{ cursor: 'pointer' }}
              />
            </Dropdown>
          }
          onChange={(e) => {
            handleTokenChange(theme, e.target.value);
          }}
        />
      );
    }
    if (typeof theme.config.override?.derivative?.[tokenName] === 'number') {
      return (
        <InputNumber
          addonAfter={theme.name}
          bordered={false}
          value={theme.config?.override?.derivative?.[tokenName]}
          onChange={(value) => {
            handleTokenChange(theme, Number(value));
          }}
        />
      );
    }
    return (
      <Input
        addonAfter={theme.name}
        bordered={false}
        value={String(theme.config?.override?.derivative?.[tokenName])}
        onChange={(e) => {
          handleTokenChange(
            theme,
            typeof theme.config.override?.derivative?.[tokenName] === 'number'
              ? Number(e.target.value)
              : e.target.value,
          );
        }}
      />
    );
  };

  return wrapSSR(
    <Collapse
      collapsible="header"
      ghost
      onChange={() => setInfoVisible(!infoVisible)}
      expandIcon={({ isActive }) => (
        <CaretRightOutlined
          rotate={isActive ? 90 : 0}
          style={{ fontSize: 12, cursor: 'pointer' }}
        />
      )}
    >
      <Panel
        key={tokenName}
        className={classNames('previewer-token-item', hashId)}
        header={
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <span
              title={tokenName}
              style={{
                marginInlineEnd: '5px',
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
            padding: 8,
            width: '100%',
          }}
        >
          {themes.map((theme) => {
            return <div key={theme.key}>{getTokenInput(theme)}</div>;
          })}
        </Space>
      </Panel>
    </Collapse>,
  );
};
