import { CaretRightOutlined } from '@ant-design/icons';
import {
  Button,
  Collapse,
  Dropdown,
  Input,
  InputNumber,
  Space,
} from '@madccc/antd';
import { Pick } from '../../icons';
import type { FC } from 'react';
import React, { useRef } from 'react';
import { SketchPicker } from 'react-color';
import type { MutableTheme } from '..';
import { PreviewContext } from '..';
import type { TokenName } from '../../utils/classifyToken';
import type { TokenValue } from '../../interface';
import makeStyle from '../../utils/makeStyle';
import classNames from 'classnames';
import ColorPreview from '../../ColorPreview';
import useStatistic from '../../hooks/useStatistic';

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
      <ColorPreview
        color={String(info)}
        style={{ display: visible ? 'block' : 'none' }}
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

const useStyle = makeStyle('TokenItem', (token) => ({
  '.ant-collapse.previewer-token-item-collapse': {
    '.previewer-token-item.ant-collapse-item': {
      transition: `background-color ${token.motionDurationSlow}`,
      borderRadius: `4px !important`,

      '&:not(.ant-collapse-item-active):hover': {
        backgroundColor: '#f5f5f5',
      },

      '> .ant-collapse-header': {
        padding: '12px 8px',
      },

      '.ant-collapse-header-text': {
        flex: 1,
        width: 0,
      },
      '.ant-collapse-content-box': {
        padding: '0 4px',
      },
      '.ant-collapse-expand-icon': {
        paddingInlineEnd: `${token.paddingXXS}px !important`,
      },
      '.previewer-token-count': {
        height: token.controlHeightXS,
        fontSize: token.fontSizeSM,
        lineHeight: `${token.controlHeightXS}px`,
        borderRadius: 100,
        paddingInline: token.paddingXXS * 1.5,
        color: token.colorTextSecondary,
        backgroundColor: token.colorBgComponentSecondary,
      },
    },
  },
}));

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

type TokenInputProps = {
  theme: MutableTheme;
  token: TokenName;
};

const TokenInput: FC<TokenInputProps> = ({ theme, token }) => {
  const valueRef = useRef<number | string>(
    theme.config?.override?.alias?.[token] || '',
  );
  const canReset = valueRef.current !== theme.config?.override?.alias?.[token];

  const handleTokenChange = (value: TokenValue) => {
    theme.onThemeChange?.({
      ...theme.config,
      override: {
        ...theme.config.override,
        alias: {
          ...theme.config.override?.alias,
          [token]: value,
        },
      },
    });
  };

  const addonAfter = (
    <span style={{ display: 'flex', alignItems: 'center' }}>
      <Button
        style={{ fontSize: 12 }}
        disabled={!canReset}
        onClick={() => handleTokenChange(valueRef.current)}
        type="link"
        size="small"
      >
        重置
      </Button>
      {theme.name}
    </span>
  );

  let inputNode = null;

  if (isColor(token)) {
    inputNode = (
      <Input
        bordered={false}
        addonAfter={addonAfter}
        value={String(theme.config?.override?.alias?.[token])}
        addonBefore={
          <Dropdown
            trigger={['click']}
            overlay={
              <ColorPanel
                color={String(theme.config.override?.alias?.[token])}
                onChange={(v: string) => {
                  handleTokenChange(v);
                }}
              />
            }
          >
            <ColorPreview
              color={String(theme.config?.override?.alias?.[token])}
              style={{ cursor: 'pointer' }}
            />
          </Dropdown>
        }
        onChange={(e) => {
          handleTokenChange(e.target.value);
        }}
      />
    );
  } else if (typeof theme.config.override?.alias?.[token] === 'number') {
    inputNode = (
      <InputNumber
        addonAfter={addonAfter}
        bordered={false}
        value={theme.config?.override?.alias?.[token]}
        onChange={(value) => {
          handleTokenChange(Number(value));
        }}
      />
    );
  } else {
    inputNode = (
      <Input
        addonAfter={addonAfter}
        bordered={false}
        value={String(theme.config?.override?.alias?.[token])}
        onChange={(e) => {
          handleTokenChange(
            typeof theme.config.override?.alias?.[token] === 'number'
              ? Number(e.target.value)
              : e.target.value,
          );
        }}
      />
    );
  }
  return <div>{inputNode}</div>;
};

export default ({ tokenName }: TokenItemProps) => {
  const { selectedTokens, themes, onTokenSelect } =
    React.useContext(PreviewContext);
  const [infoVisible, setInfoVisible] = React.useState(false);
  const [wrapSSR, hashId] = useStyle();
  const { getRelatedComponents } = useStatistic();

  return wrapSSR(
    <Collapse
      collapsible="header"
      ghost
      onChange={() => setInfoVisible(!infoVisible)}
      className={classNames('previewer-token-item-collapse', hashId)}
      expandIcon={({ isActive }) => (
        <CaretRightOutlined
          rotate={isActive ? 90 : 0}
          style={{ fontSize: 12, cursor: 'pointer' }}
        />
      )}
    >
      <Panel
        key={tokenName}
        className={'previewer-token-item'}
        header={
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <span
              style={{
                flex: 1,
                width: 0,
                display: 'flex',
                overflow: 'hidden',
                alignItems: 'center',
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
              <span className="previewer-token-count">
                {getRelatedComponents(tokenName).length}
              </span>
            </span>
            <Space>
              {themes.map(({ config, key }) => {
                return (
                  <AdditionInfo
                    key={key}
                    tokenName={tokenName}
                    info={config.override?.alias?.[tokenName] ?? ''}
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
            return (
              <div key={theme.key}>
                <TokenInput theme={theme} token={tokenName} />
              </div>
            );
          })}
        </Space>
      </Panel>
    </Collapse>,
  );
};
