import { ColorPicker, Input, InputNumber, Popover } from 'antd';
import type { FC, PropsWithChildren } from 'react';
import React, { useState } from 'react';
import { useDebouncyFn } from 'use-debouncy';
import type { MutableTheme } from '../interface';

export interface ComponentTokenInputProps {
  theme: MutableTheme;
  token: string;
  component: string;
  color: boolean;
  value?: string;
}

const ComponentTokenInput: FC<PropsWithChildren<ComponentTokenInputProps>> = ({
  theme,
  token,
  component,
  color,
  children,
  value,
}) => {
  const [tokenValue, setTokenValue] = useState(value);
  const debouncedOnChange = useDebouncyFn((newValue: number | string) => {
    theme.onThemeChange?.(
      {
        ...theme.config,
        components: {
          ...(theme.config?.components ?? {}),
          [component]: {
            ...(theme.config?.components as any)?.[component],
            [token]: newValue,
          },
        },
      },
      ['components', component, token],
    );
  }, 500);

  const handleChange = (newValue: any) => {
    setTokenValue(newValue);
    debouncedOnChange(newValue);
  };

  if (color) {
    return (
      <ColorPicker
        placement="bottomRight"
        value={tokenValue}
        onChange={(newColor) => {
          handleChange(newColor.toRgbString());
        }}
      >
        {children}
      </ColorPicker>
    );
  }
  return (
    <Popover
      trigger="click"
      placement="bottomRight"
      content={
        typeof tokenValue === 'string' ? (
          <Input
            value={tokenValue}
            onChange={(e) => handleChange(e.target.value)}
          />
        ) : (
          <InputNumber<number>
            style={{ minWidth: 200 }}
            value={tokenValue}
            onChange={(newValue) => handleChange(newValue ?? 0)}
          />
        )
      }
    >
      {children}
    </Popover>
  );
};

export default ComponentTokenInput;
