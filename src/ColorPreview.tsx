import type { FC } from 'react';
import React from 'react';

export type ColorPreviewProps = {
  color: string;
  className?: string;
  style?: React.CSSProperties;
};

const ColorPreview: FC<ColorPreviewProps> = ({
  color,
  style,
  ...restProps
}) => {
  return (
    <div
      {...restProps}
      style={{
        width: 20,
        height: 20,
        borderRadius: '50%',
        padding: 0,
        backgroundColor: color,
        boxShadow:
          '0 2px 3px -1px rgba(0,0,0,0.20), inset 0 0 0 1px rgba(0,0,0,0.09)',
        ...style,
      }}
    />
  );
};

export default ColorPreview;
