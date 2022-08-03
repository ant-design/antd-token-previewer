import tinycolor from 'tinycolor2';
import { HexColorPicker, RgbaColorPicker } from 'react-colorful';
import type { FC } from 'react';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import type { InputProps } from 'antd';
import { ConfigProvider, Input, InputNumber, Select, theme } from 'antd';
import makeStyle from './utils/makeStyle';
import classNames from 'classnames';
import useMergedState from 'rc-util/es/hooks/useMergedState';
import { tuple } from 'antd/es/_util/type';

const { useToken } = theme;

const useStyle = makeStyle('ColorPanel', (token) => ({
  '.color-panel': {
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 12,
    border: '1px solid rgba(0, 0, 0, 0.06)',
    boxShadow: token.boxShadow,
    width: 224,
    '.color-panel-mode': {
      display: 'flex',
      alignItems: 'center',
      marginBottom: 6,
    },
    '.color-panel-preview': {
      width: 24,
      height: 24,
      borderRadius: 4,
      boxShadow:
        '0 2px 3px -1px rgba(0,0,0,0.20), inset 0 0 0 1px rgba(0,0,0,0.09)',
      flex: 'none',
      overflow: 'hidden',
      background:
        'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABGdBTUEAALGPC/xhBQAAAFpJREFUWAntljEKADAIA23p6v//qQ+wfUEcCu1yriEgp0FHRJSJcnehmmWm1Dv/lO4HIg1AAAKjTqm03ea88zMCCEDgO4HV5bS757f+7wRoAAIQ4B9gByAAgQ3pfiDmXmAeEwAAAABJRU5ErkJggg==) 0% 0% / 32px',
    },
    '.color-panel-preset-colors': {
      paddingTop: 12,
      display: 'flex',
      flexWrap: 'wrap',
      width: 200,
    },
    '.color-panel-preset-color-btn': {
      borderRadius: 4,
      width: 20,
      height: 20,
      border: 'none',
      outline: 'none',
      margin: 4,
      cursor: 'pointer',
      boxShadow:
        '0 2px 3px -1px rgba(0,0,0,0.20), inset 0 0 0 1px rgba(0,0,0,0.09)',
    },
    '.color-panel-mode-title': {
      color: token.colorTextPlaceholder,
      marginTop: 2,
      fontSize: 12,
      textAlign: 'center',
    },
    '.color-panel-rgba-input': {
      display: 'flex',
      alignItems: 'center',
      '&-part': {
        flex: '25%',
        width: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',

        '&-title': {
          color: token.colorTextPlaceholder,
          marginTop: 2,
          fontSize: 12,
        },

        '&:not(:last-child)': {
          marginRight: 4,
        },

        [`${token.rootCls}-input-number`]: {
          width: '100%',
          input: {
            fontSize: 12,
            padding: '0 4px',
          },
        },
      },
    },
  },
}));

export type HexColorInputProps = {
  value: string;
  onChange?: (value: string) => void;
  alpha?: boolean;
};

const getHexValue = (value: string, alpha: boolean = false) => {
  return alpha ? tinycolor(value).toHex8() : tinycolor(value).toHex();
};

const HexColorInput: FC<HexColorInputProps> = ({ value, onChange, alpha }) => {
  const [hexValue, setHexValue] = useState<string>(value);
  const focusRef = useRef<boolean>(false);

  const handleChange: InputProps['onChange'] = (e) => {
    setHexValue(e.target.value);
    onChange?.(getHexValue(e.target.value, alpha));
  };

  const handleBlur: InputProps['onBlur'] = (e) => {
    focusRef.current = false;
    setHexValue(getHexValue(e.target.value, alpha));
  };

  const handleFocus = () => {
    focusRef.current = true;
  };

  useEffect(() => {
    if (!focusRef.current) {
      setHexValue(getHexValue(value, alpha));
    }
  }, [value, alpha]);

  return (
    <div>
      <Input
        prefix="#"
        size="small"
        value={hexValue}
        onFocus={handleFocus}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <div className="color-panel-mode-title">HEX{alpha ? '8' : ''}</div>
    </div>
  );
};

type RgbaColor = tinycolor.ColorFormats.RGBA;

export type RgbColorInputProps = {
  value?: RgbaColor;
  onChange?: (value: RgbaColor) => void;
};

const RgbColorInput: FC<RgbColorInputProps> = ({
  value: customValue,
  onChange,
}) => {
  const [value, setValue] = useMergedState<RgbaColor>(
    customValue ?? { r: 0, g: 0, b: 0, a: 1 },
    {
      value: customValue,
      onChange,
    },
  );

  return (
    <div className="color-panel-rgba-input">
      <ConfigProvider
        theme={{ override: { InputNumber: { handleWidth: 12 } } }}
      >
        <div className="color-panel-rgba-input-part">
          <InputNumber
            min={0}
            max={255}
            size="small"
            value={value.r}
            onChange={(v) => setValue({ ...value, r: v })}
          />
          <div className="color-panel-mode-title">R</div>
        </div>
        <div className="color-panel-rgba-input-part">
          <InputNumber
            min={0}
            max={255}
            size="small"
            value={value.g}
            onChange={(v) => setValue({ ...value, g: v })}
          />
          <div className="color-panel-mode-title">G</div>
        </div>
        <div className="color-panel-rgba-input-part">
          <InputNumber
            min={0}
            max={255}
            size="small"
            value={value.b}
            onChange={(v) => setValue({ ...value, b: v })}
          />
          <div className="color-panel-mode-title">B</div>
        </div>
        <div className="color-panel-rgba-input-part">
          <InputNumber
            min={0}
            max={1}
            step={0.01}
            size="small"
            value={value.a}
            onChange={(v) => setValue({ ...value, a: v })}
          />
          <div className="color-panel-mode-title">A</div>
        </div>
      </ConfigProvider>
    </div>
  );
};

export type ColorPanelProps = {
  color: string;
  onChange: (color: string) => void;
};

const colorModes = tuple('HEX', 'HEX8', 'RGBA');
type ColorMode = typeof colorModes[number];

const getColorStr = (color: any, mode: ColorMode) => {
  switch (mode) {
    case 'HEX':
      return tinycolor(color).toHexString();
    case 'HEX8':
      return tinycolor(color).toHex8String();
    case 'RGBA':
    default:
      return tinycolor(color).toRgbString();
  }
};

const ColorPanel: FC<ColorPanelProps> = ({ color, onChange }) => {
  const { token } = useToken();
  const [wrapSSR, hashId] = useStyle();
  const [colorMode, setColorMode] = React.useState<ColorMode>('HEX');

  const presetColors = useMemo(() => {
    return [
      token.blue,
      token.purple,
      token.cyan,
      token.green,
      token.magenta,
      token.pink,
      token.red,
      token.orange,
      token.yellow,
      token.volcano,
      token.geekblue,
      token.gold,
      token.lime,
      '#000',
    ];
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, []);

  const handleColorModeChange = (value: ColorMode) => {
    setColorMode(value);
    onChange(getColorStr(color, value));
  };

  return wrapSSR(
    <div className={classNames(hashId, 'color-panel')}>
      {colorMode === 'HEX' && (
        <HexColorPicker
          style={{ height: 160 }}
          color={tinycolor(color).toHex()}
          onChange={(value) => {
            onChange(getColorStr(value, colorMode));
          }}
        />
      )}
      {(colorMode === 'RGBA' || colorMode === 'HEX8') && (
        <RgbaColorPicker
          style={{ height: 160 }}
          color={tinycolor(color).toRgb()}
          onChange={(value) => {
            onChange(getColorStr(value, colorMode));
          }}
        />
      )}
      <div style={{ marginTop: 12 }}>
        <div className="color-panel-mode">
          <div className="color-panel-preview">
            <div
              style={{ backgroundColor: color, width: '100%', height: '100%' }}
            />
          </div>
          <Select
            value={colorMode}
            onChange={handleColorModeChange}
            options={colorModes.map((item) => ({ value: item, key: item }))}
            size="small"
            bordered={false}
          />
        </div>
        {colorMode === 'HEX' && (
          <HexColorInput
            value={tinycolor(color).toHex()}
            onChange={(v) => onChange?.(tinycolor(v).toHexString())}
          />
        )}
        {colorMode === 'HEX8' && (
          <HexColorInput
            alpha
            value={tinycolor(color).toHex8()}
            onChange={(v) => onChange?.(tinycolor(v).toHex8String())}
          />
        )}
        {colorMode === 'RGBA' && (
          <RgbColorInput
            value={tinycolor(color).toRgb()}
            onChange={(v) => onChange?.(tinycolor(v).toRgbString())}
          />
        )}
      </div>
      <div className="color-panel-preset-colors">
        {presetColors.map((presetColor) => (
          <button
            key={presetColor}
            className="color-panel-preset-color-btn"
            style={{ backgroundColor: presetColor }}
            onClick={() => onChange(presetColor)}
          />
        ))}
      </div>
    </div>,
  );
};

export default ColorPanel;
