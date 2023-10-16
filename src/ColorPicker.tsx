import type { ColorPickerProps } from 'antd';
import { ColorPicker as AntdColorPicker, theme as antdTheme } from 'antd';
import type { FC } from 'react';
import React, { useMemo } from 'react';
import { useLocale } from './locale';

const ColorPicker: FC<ColorPickerProps> = (props) => {
  const locale = useLocale();
  const { token: antdToken } = antdTheme.useToken();

  const presetColors = useMemo(() => {
    return [
      antdToken.blue,
      antdToken.purple,
      antdToken.cyan,
      antdToken.green,
      antdToken.magenta,
      antdToken.red,
      antdToken.orange,
      antdToken.yellow,
      antdToken.volcano,
      antdToken.geekblue,
      antdToken.gold,
      antdToken.lime,
      '#000',
    ];
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, []);

  return (
    <AntdColorPicker
      {...props}
      presets={[
        {
          label: locale.presetColors,
          colors: presetColors,
        },
      ]}
    />
  );
};

export default ColorPicker;
