import tinycolor from 'tinycolor2';
import { RgbaColorPicker } from 'react-colorful';
import type { FC } from 'react';
import React, { useMemo } from 'react';
import { theme } from 'antd';
import makeStyle from './utils/makeStyle';
import classNames from 'classnames';

const { useToken } = theme;

const useStyle = makeStyle('ColorPanel', (token) => ({
  '.color-panel': {
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 12,
    border: '1px solid rgba(0, 0, 0, 0.06)',
    boxShadow: token.boxShadow,
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
  },
}));

export type ColorPanelProps = {
  color: string;
  onChange: (color: string) => void;
};

const ColorPanel: FC<ColorPanelProps> = ({ color, onChange }) => {
  const hexColor = tinycolor(color).toRgb();
  const { token } = useToken();
  const [wrapSSR, hashId] = useStyle();

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
    ];
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, []);

  return wrapSSR(
    <div className={classNames(hashId, 'color-panel')}>
      <RgbaColorPicker
        color={hexColor}
        onChange={(value) => onChange(tinycolor(value).toRgbString())}
      />
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
