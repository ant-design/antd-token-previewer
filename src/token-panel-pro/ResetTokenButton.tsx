import { Typography } from 'antd';
import type { FC } from 'react';
import React from 'react';
import type { MutableTheme } from '../interface';
import { useLocale } from '../locale';

export type ResetTokenButtonProps = {
  theme: MutableTheme;
  tokenName: string;
  style?: React.CSSProperties;
};
const ResetTokenButton: FC<ResetTokenButtonProps> = ({
  theme,
  tokenName,
  style,
}) => {
  const locale = useLocale();
  const showReset = (theme.config.token as any)?.[tokenName];
  return (
    <div style={{ display: 'inline-block', ...style }}>
      <Typography.Link
        style={{
          fontSize: 12,
          padding: 0,
          opacity: showReset ? 1 : 0,
          pointerEvents: showReset ? 'auto' : 'none',
        }}
        onClick={() => theme.onAbort?.(['token', tokenName])}
      >
        {locale.reset}
      </Typography.Link>
    </div>
  );
};

export default ResetTokenButton;
