import { CaretRightOutlined } from '@ant-design/icons';
import { Collapse, Space } from '@madccc/antd';
import { Pick } from '../../icons';
import type { CSSProperties } from 'react';
import React, { useEffect } from 'react';
import { PreviewContext } from '..';
import type { MutableTheme, TokenName, TokenValue } from '../../interface';
import makeStyle from '../../utils/makeStyle';
import classNames from 'classnames';
import ColorPreview from '../../ColorPreview';
import useStatistic from '../../hooks/useStatistic';
import isColor from '../../utils/isColor';
import TokenInput from '../../TokenInput';

const { Panel } = Collapse;

interface TokenItemProps {
  tokenName: TokenName;
  active?: boolean;
  onActiveChange?: (active: boolean) => void;
}

const AdditionInfo = ({
  info,
  visible,
  tokenName,
  style,
  ...rest
}: {
  info: string | number;
  visible: boolean;
  tokenName: string;
  style?: CSSProperties;
  className?: string;
}) => {
  if (typeof info === 'string' && isColor(info)) {
    return (
      <ColorPreview
        color={String(info)}
        style={{ display: visible ? 'block' : 'none', ...style }}
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
          ...style,
        }}
        {...rest}
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

      '.previewer-token-item-name': {
        transition: 'color 0.3s',
      },

      '.previewer-token-item-highlighted.previewer-token-item-name': {
        color: `${token.colorPrimary} !important`,
      },

      '&:hover .previewer-token-preview': {
        '> .previewer-color-preview:not(:last-child)': {
          transform: 'translateX(-100%)',
          marginRight: 4,
        },
      },

      '.previewer-token-preview': {
        display: 'flex',
        alignItems: 'center',
        position: 'relative',

        '> .previewer-color-preview': {
          position: 'absolute',
          right: 0,
          top: 0,
          bottom: 0,
          margin: 'auto',
        },

        '> .previewer-color-preview:not(:last-child)': {
          transform: 'translateX(-50%)',
          marginRight: 0,
          transition: 'transform 0.3s, margin-right 0.3s',
        },

        '> *:not(:last-child)': {
          marginRight: 4,
        },
      },
    },
  },
}));

export const getTokenItemId = (token: TokenName) =>
  `previewer-token-panel-item-${token}`;

export default ({ tokenName, active, onActiveChange }: TokenItemProps) => {
  const {
    selectedTokens,
    themes,
    onTokenSelect,
    defaultTheme,
    enableTokenSelect,
  } = React.useContext(PreviewContext);
  const [infoVisible, setInfoVisible] = React.useState(false);
  const [wrapSSR, hashId] = useStyle();
  const { getRelatedComponents } = useStatistic();

  useEffect(() => {
    if (active) {
      setInfoVisible(true);
    }
  }, [active]);

  const handleTokenChange = (theme: MutableTheme, value: TokenValue) => {
    theme.onThemeChange?.({
      ...theme.config,
      override: {
        ...theme.config.override,
        alias: {
          ...theme.config.override?.alias,
          [tokenName]: value,
        },
      },
    });
  };

  return wrapSSR(
    <div onMouseEnter={() => onActiveChange?.(false)}>
      <Collapse
        collapsible="header"
        ghost
        onChange={(key) => setInfoVisible(key.length > 0)}
        className={classNames('previewer-token-item-collapse', hashId)}
        expandIcon={({ isActive }) => (
          <CaretRightOutlined
            rotate={isActive ? 90 : 0}
            style={{ fontSize: 12, cursor: 'pointer' }}
          />
        )}
        activeKey={infoVisible ? tokenName : undefined}
      >
        <Panel
          key={tokenName}
          className="previewer-token-item"
          header={
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
              id={getTokenItemId(tokenName)}
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
                  className={classNames('previewer-token-item-name', {
                    'previewer-token-item-highlighted': active,
                  })}
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
              {!infoVisible && (
                <div
                  className="previewer-token-preview"
                  style={{
                    minWidth: themes.length * 20 + (themes.length - 1) * 4,
                  }}
                >
                  {themes.map(({ config, key }, index) => {
                    return (
                      <AdditionInfo
                        key={key}
                        tokenName={tokenName}
                        info={
                          config.override?.alias?.[tokenName] ??
                          defaultTheme.override?.alias?.[tokenName] ??
                          ''
                        }
                        visible={!infoVisible}
                        style={{
                          zIndex: 10 - index,
                        }}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          }
          extra={
            enableTokenSelect ? (
              <ShowUsageButton
                selected={selectedTokens.includes(tokenName)}
                toggleSelected={() => {
                  onTokenSelect(tokenName);
                }}
              />
            ) : undefined
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
                  <TokenInput
                    theme={theme}
                    onChange={(value) => handleTokenChange(theme, value)}
                    value={
                      theme.config.override?.alias?.[tokenName] ??
                      defaultTheme.override?.alias?.[tokenName]
                    }
                  />
                </div>
              );
            })}
          </Space>
        </Panel>
      </Collapse>
    </div>,
  );
};
