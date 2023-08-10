import { Tooltip, Typography } from 'antd';
import classNames from 'classnames';
import type { FC, ReactNode } from 'react';
import React from 'react';
import ColorPreview from '../ColorPreview';
import type { MutableTheme } from '../interface';
import { useLocale } from '../locale';
import { HIGHLIGHT_COLOR } from '../utils/constants';
import makeStyle from '../utils/makeStyle';
import ComponentTokenInput from './TokenInput';

const { Link } = Typography;

const useStyle = makeStyle('ComponentTokenEditorTokenItem', (token) => ({
  [token.componentCls]: {
    borderRadius: token.borderRadiusLG,
    height: 40,
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    transition: 'all 0.2s',
    gap: 4,

    [`${token.componentCls}`]: {
      '&:not(:last-child)': {
        marginBottom: 4,
      },
      '&-name': {
        fontSize: token.fontSizeSM,
        color: token.colorText,
      },
      '&-prefix': {
        flex: 'none',
      },
      '&-tag': {
        fontSize: token.fontSizeSM,
        lineHeight: token.lineHeightSM,
        background: token.colorSuccessBg,
        color: token.colorSuccess,
        padding: '0 6px',
        borderRadius: token.borderRadiusSM,
      },
      '&-value': {
        fontSize: token.fontSizeSM,
        lineHeight: token.lineHeightSM,
        marginLeft: 'auto',
        maxWidth: 140,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        background: token.colorFillQuaternary,
        color: token.colorTextTertiary,
        padding: '0 6px',
        borderRadius: token.borderRadiusSM,
        flex: '0 1 auto',
      },
      '&-operator': {
        marginLeft: 'auto',
        borderRadius: token.borderRadiusLG,
        padding: '0 8px',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        flex: '0 0 0%',
        width: '100%',
        '&:hover': {
          background: token.colorFillQuaternary,
        },
      },
    },
  },
}));

export interface TokenItemProps {
  token: string;
  prefix?: ReactNode;
  theme: MutableTheme;
  configValue: any;
  value: any;
  component: string;
  color?: boolean;
  tooltip?: string;
}

const TokenItem: FC<TokenItemProps> = ({
  token,
  prefix,

  value,
  theme,
  component,
  color,
  tooltip,
  configValue,
}) => {
  const prefixCls = `antd-component-token-editor-token-item`;

  const locale = useLocale();

  const [, hashId] = useStyle(prefixCls);

  return (
    <div className={classNames(prefixCls, hashId)} key={token}>
      {prefix && <div className={`${prefixCls}-prefix`}>{prefix}</div>}
      <Tooltip title={tooltip} mouseEnterDelay={0.5} placement="left">
        <span
          className={`${prefixCls}-name`}
          style={{
            color: configValue !== undefined ? HIGHLIGHT_COLOR : '',
          }}
        >
          {token}
        </span>
      </Tooltip>
      {configValue !== undefined && (
        <Link
          style={{
            fontSize: 12,
            margin: '0 4px',
            flex: 'none',
          }}
          onClick={(e) => {
            e.stopPropagation();
            theme.onAbort?.(['components', component, token]);
          }}
        >
          {locale.reset}
        </Link>
      )}
      <div
        style={{
          flex: 1,
          width: 0,
          display: 'flex',
          justifyContent: 'flex-end',
          height: '100%',
        }}
      >
        <ComponentTokenInput
          theme={theme}
          token={token}
          component={component}
          color={!!color}
          value={value}
          className={`${prefixCls}-operator`}
        >
          <span className={`${prefixCls}-value`} title={value}>
            {String(value)}
          </span>
          {color && (
            <ColorPreview
              size={16}
              color={value}
              style={{ marginLeft: 8, flex: 'none' }}
            />
          )}
        </ComponentTokenInput>
      </div>
    </div>
  );
};

export default TokenItem;
