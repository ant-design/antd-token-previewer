import { SketchPicker } from 'react-color';
import type { FC } from 'react';
import React, { useEffect, useRef, useState } from 'react';
import type { MutableTheme } from '../lib';
import { Button, Dropdown, Input, InputNumber } from '@madccc/antd';
import ColorPreview from './ColorPreview';
import makeStyle from './utils/makeStyle';
import classNames from 'classnames';

const useStyle = makeStyle('TokenInput', (token) => ({
  '.previewer-token-input': {
    '.ant-input-group-addon, .ant-input-number-group-addon': {
      border: '0 !important',
      color: `rgba(0, 0, 0, 0.25) !important`,
      fontSize: `${token.fontSizeSM}px !important`,
      padding: '0 !important',

      '&:first-child': {
        paddingInlineStart: 0,
      },

      '&:last-child': {
        paddingInlineEnd: 0,
      },
    },

    '.ant-input-group-wrapper, .ant-input-number-group-wrapper': {
      padding: 0,
      height: token.controlHeightSM,

      input: {
        fontSize: token.fontSizeSM,
        lineHeight: token.lineHeightSM,
        padding: `2px ${token.paddingXS}px`,
        height: token.controlHeightSM,
      },
    },

    '.ant-input-group-wrapper .ant-input, .ant-input-number-group-wrapper .ant-input-number':
      {
        background: 'white',
        borderRadius: `${token.radiusLG}px !important`,
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
      },

    '&&-light': {
      '.ant-input-group-addon, .ant-input-number-group-addon': {
        backgroundColor: token.colorBgComponent,
      },

      '.ant-input-group-wrapper .ant-input, .ant-input-number-group-wrapper .ant-input-number':
        {
          background: '#fafafa',
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
  theme?: MutableTheme;
  value?: string | number;
  onChange?: (value: string | number) => void;
  light?: boolean;
};

const TokenInput: FC<TokenInputProps> = ({ value, theme, onChange, light }) => {
  const valueRef = useRef<number | string>(value || '');
  const [tokenValue, setTokenValue] = useState<string | number>(value || '');
  const canReset = valueRef.current !== tokenValue;

  const [wrapSSR, hashId] = useStyle();

  const handleTokenChange = (newValue: number | string) => {
    setTokenValue(newValue);
    onChange?.(newValue);
  };

  useEffect(() => {
    setTokenValue(value || '');
  }, [value]);

  const addonAfter = (
    <span style={{ display: 'flex', alignItems: 'center' }}>
      <Button
        style={{
          fontSize: 12,
          opacity: canReset ? 1 : 0,
          cursor: canReset ? 'pointer' : 'default',
        }}
        disabled={!canReset}
        onClick={() => handleTokenChange(valueRef.current)}
        type="link"
        size="small"
      >
        重置
      </Button>
      {theme?.name}
    </span>
  );

  let inputNode;
  if (
    typeof valueRef.current === 'string' &&
    (valueRef.current.startsWith('#') || valueRef.current.startsWith('rgb'))
  ) {
    inputNode = (
      <Input
        bordered={false}
        addonAfter={addonAfter}
        value={String(tokenValue)}
        addonBefore={
          <Dropdown
            trigger={['click']}
            overlay={
              <ColorPanel
                color={String(value)}
                onChange={(v: string) => {
                  handleTokenChange(v);
                }}
              />
            }
          >
            <ColorPreview
              color={String(tokenValue)}
              style={{
                cursor: 'pointer',
                marginRight: 8,
                verticalAlign: 'top',
              }}
            />
          </Dropdown>
        }
        onChange={(e) => {
          handleTokenChange(e.target.value);
        }}
      />
    );
  } else if (typeof valueRef.current === 'number') {
    inputNode = (
      <InputNumber
        addonAfter={addonAfter}
        bordered={false}
        value={tokenValue}
        onChange={(newValue) => {
          handleTokenChange(Number(newValue));
        }}
      />
    );
  } else {
    inputNode = (
      <Input
        addonAfter={addonAfter}
        bordered={false}
        value={String(tokenValue)}
        onChange={(e) => {
          handleTokenChange(
            typeof value === 'number' ? Number(e.target.value) : e.target.value,
          );
        }}
      />
    );
  }
  return wrapSSR(
    <div
      className={classNames('previewer-token-input', hashId, {
        'previewer-token-input-light': light,
      })}
    >
      {inputNode}
    </div>,
  );
};

export default TokenInput;
