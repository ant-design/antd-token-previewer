import type { FC } from 'react';
import React, { useEffect, useRef, useState } from 'react';
import type { MutableTheme } from './interface';
import { Button, Dropdown, Input, InputNumber } from 'antd';
import ColorPreview from './ColorPreview';
import makeStyle from './utils/makeStyle';
import classNames from 'classnames';
import isColor from './utils/isColor';
import { useDebouncyFn } from 'use-debouncy';
import ColorPanel from './ColorPanel';

const useStyle = makeStyle('TokenInput', (token) => ({
  '.previewer-token-input': {
    [`${token.rootCls}-input-group-addon, ${token.rootCls}-input-number-group-addon`]:
      {
        border: '0 !important',
        color: `rgba(0, 0, 0, 0.25) !important`,
        fontSize: `${token.fontSizeSM}px !important`,
        padding: '0 !important',
        backgroundColor: 'transparent !important',

        '&:first-child': {
          paddingInlineStart: 0,
        },

        '&:last-child': {
          paddingInlineEnd: 0,
        },
      },

    [`${token.rootCls}-input-group-wrapper, ${token.rootCls}-input-number-group-wrapper`]:
      {
        padding: 0,
        height: token.controlHeightSM,
        width: '100%',

        input: {
          fontSize: token.fontSizeSM,
          lineHeight: token.lineHeightSM,
          padding: `2px ${token.paddingXS}px`,
          height: token.controlHeightSM,
        },
      },

    [`${token.rootCls}-input-group-wrapper ${token.rootCls}-input, ${token.rootCls}-input-number-group-wrapper ${token.rootCls}-input-number`]:
      {
        background: 'white',
        borderRadius: `${token.radiusLG}px !important`,
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
      },

    '&&-light': {
      [`${token.rootCls}-input-group-addon, ${token.rootCls}-input-number-group-addon`]:
        {
          backgroundColor: token.colorBgContainer,
        },

      [`${token.rootCls}-input-group-wrapper ${token.rootCls}-input,
        ${token.rootCls}-input-number-group-wrapper ${token.rootCls}-input-number-input`]:
        {
          background: token.colorFillAlter,
        },
    },

    '&&-readonly': {
      input: {
        cursor: 'text',
        color: token.colorText,
      },
    },
  },
}));

type TokenInputProps = {
  theme?: MutableTheme;
  value?: string | number;
  onChange?: (value: string | number) => void;
  light?: boolean;
  readonly?: boolean;
};

const TokenInput: FC<TokenInputProps> = ({
  value,
  theme,
  onChange,
  light,
  readonly,
}) => {
  const valueRef = useRef<number | string>(value || '');
  const [tokenValue, setTokenValue] = useState<string | number>(value || '');
  const canReset = valueRef.current !== tokenValue;

  const [wrapSSR, hashId] = useStyle();

  useEffect(() => {
    if (value !== undefined) {
      setTokenValue(value);
    }
  }, [value]);

  const debouncedOnChange = useDebouncyFn((newValue: number | string) => {
    onChange?.(newValue);
  }, 500);

  const handleTokenChange = (newValue: number | string) => {
    if (!readonly) {
      setTokenValue(newValue);
      debouncedOnChange(newValue);
    }
  };

  const addonAfter = !readonly && (
    <span
      style={{
        display: 'flex',
        alignItems: 'center',
        minWidth: 60,
      }}
    >
      {canReset ? (
        <Button
          style={{
            fontSize: 12,
          }}
          onClick={() => handleTokenChange(valueRef.current)}
          type="link"
          size="small"
        >
          重置
        </Button>
      ) : (
        <span style={{ padding: '0 8px' }}>{theme?.name}</span>
      )}
    </span>
  );

  let inputNode;
  if (typeof valueRef.current === 'string' && isColor(valueRef.current)) {
    inputNode = (
      <Input
        bordered={false}
        addonAfter={addonAfter}
        value={String(tokenValue)}
        disabled={readonly}
        addonBefore={
          <Dropdown
            trigger={['click']}
            overlay={
              <ColorPanel
                color={String(tokenValue)}
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
                marginInlineEnd: 8,
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
        disabled={readonly}
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
        disabled={readonly}
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
        'previewer-token-input-readonly': readonly,
      })}
    >
      {inputNode}
    </div>,
  );
};

export default TokenInput;
