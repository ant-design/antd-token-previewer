import { Input, InputNumber, Popover, Switch } from 'antd';
import type { FC, PropsWithChildren } from 'react';
import React, { useEffect, useState } from 'react';
import { useDebouncyFn } from 'use-debouncy';
import ColorPicker from '../ColorPicker';
import type { MutableTheme } from '../interface';

export interface ComponentTokenInputProps {
  theme: MutableTheme;
  token: string;
  component: string;
  color: boolean;
  value?: string;
  style?: React.CSSProperties;
  className?: string;
}

const ComponentTokenInput: FC<PropsWithChildren<ComponentTokenInputProps>> = ({
  theme,
  token,
  component,
  color,
  children,
  value,
  style,
  className,
}) => {
  const [tokenValue, setTokenValue] = useState(value);
  const onThemeChange = (newValue: number | string) => {
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
  };

  const debouncedOnChange = useDebouncyFn(onThemeChange, 200);

  useEffect(() => {
    setTokenValue(value);
  }, [value]);

  const handleChange = (newValue: any) => {
    setTokenValue(newValue);
    debouncedOnChange(newValue);
  };

  const child = (
    <span style={style} className={className}>
      {children}
    </span>
  );

  if (color) {
    return (
      <ColorPicker
        placement="bottomRight"
        value={tokenValue}
        onChangeComplete={(newColor) => {
          onThemeChange(newColor.toRgbString());
        }}
      >
        {child}
      </ColorPicker>
    );
  }

  let inputNode;

  if (typeof tokenValue === 'string') {
    inputNode = (
      <Input
        value={tokenValue}
        onChange={(e) => handleChange(e.target.value)}
      />
    );
  } else if (typeof tokenValue === 'number') {
    inputNode = (
      <InputNumber<number>
        style={{ minWidth: 200 }}
        value={tokenValue}
        onChange={(newValue) => handleChange(newValue ?? 0)}
      />
    );
  } else if (typeof tokenValue === 'boolean') {
    inputNode = (
      <Switch
        checked={tokenValue}
        onChange={(checked) => handleChange(checked)}
      />
    );
  }

  return (
    <Popover trigger="click" placement="bottomRight" content={inputNode}>
      {child}
    </Popover>
  );
};

export default ComponentTokenInput;
