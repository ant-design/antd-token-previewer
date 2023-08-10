import classNames from 'classnames';
import type { FC } from 'react';
import React from 'react';
import getColorBgImg from './utils/getColorBgImg';
import makeStyle from './utils/makeStyle';

export type ColorPreviewProps = {
  color: string;
  dark?: boolean;
  className?: string;
  style?: React.CSSProperties;
  size?: number;
};

const useStyle = makeStyle('ColorPreview', () => ({
  '.previewer-color-preview': {
    position: 'relative',
    borderRadius: '50%',
    padding: 0,
    display: 'inline-block',

    '&::before': {
      content: '""',
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      top: 0,
      insetInlineStart: 0,
      position: 'absolute',
      zIndex: 2,
      backgroundColor: 'var(--antd-token-previewer-color-preview)',
      boxShadow:
        '0 2px 3px -1px rgba(0,0,0,0.20), inset 0 0 0 1px rgba(0,0,0,0.09)',
    },
  },
}));

const ColorPreview: FC<ColorPreviewProps> = ({
  color,
  style,
  className,
  dark,
  size = 20,
  ...restProps
}) => {
  const [warpSSR, hashId] = useStyle();

  return warpSSR(
    <div
      {...restProps}
      className={classNames('previewer-color-preview', className, hashId)}
      style={{
        // @ts-ignore
        ['--antd-token-previewer-color-preview']: color,
        width: size,
        height: size,
        ...style,
      }}
    >
      <div
        style={{
          content: '""',
          width: size - 2,
          height: size - 2,
          borderRadius: '50%',
          top: 1,
          insetInlineStart: 1,
          position: 'absolute',
          zIndex: 1,
          background: `${getColorBgImg(dark)} 0% 0% / ${size}px`,
        }}
      />
    </div>,
  );
};

export default ColorPreview;
