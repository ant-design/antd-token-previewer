import type { FC } from 'react';
import React from 'react';
import tokenInfo from '../token-info/TokenInfo';
import { getRelatedComponents } from '../utils/statistic';
import { Tooltip } from 'antd';
import TokenInput from '../TokenInput';
import getValueByPath from '../utils/getValueByPath';
import getDesignToken from '../utils/getDesignToken';
import type { MutableTheme } from 'antd-token-previewer';
import type { TokenName } from '../interface';
import makeStyle from '../utils/makeStyle';
import classNames from 'classnames';
import type { TokenValue } from '../interface';

const useStyle = makeStyle('TokenDetail', (token) => ({
  '.token-panel-token-detail': {
    '.token-panel-pro-token-collapse-map-collapse-token-description': {
      color: token.colorTextPlaceholder,
      marginBottom: 8,
      fontSize: 12,
    },

    '.token-panel-pro-token-collapse-map-collapse-token-usage-tag-container': {
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      color: token.colorTextSecondary,
    },

    '.token-panel-pro-token-collapse-map-collapse-token-usage-tag': {
      display: 'inline-block',
      marginInlineEnd: 8,
      borderRadius: 4,
      height: 20,
      padding: '0 8px',
      fontSize: 12,
      lineHeight: '20px',
      backgroundColor: 'rgba(0,0,0,0.015)',
    },

    '.token-panel-pro-token-collapse-map-collapse-token-inputs': {
      padding: '8px 10px',
      backgroundColor: 'rgba(0,0,0,0.02)',
      marginTop: 12,
      '> *:not(:last-child)': {
        marginBottom: 8,
      },
    },
  },
}));

const deepUpdateObj = (obj: any, path: string[], value: any): any => {
  if (path.length === 0) {
    return obj;
  }
  return {
    ...obj,
    [path[0]]:
      path.length === 1
        ? value
        : deepUpdateObj(obj[path[0]] ?? {}, path.slice(1), value),
  };
};

export type TokenDetailProps = {
  themes: MutableTheme[];
  path: string[];
  tokenName: TokenName;
  className?: string;
  style?: React.CSSProperties;
};

const TokenDetail: FC<TokenDetailProps> = ({
  themes,
  path,
  tokenName,
  className,
  style,
}) => {
  const [wrapSSR, hashId] = useStyle();

  const handleTokenChange = (theme: MutableTheme) => (value: TokenValue) => {
    theme.onThemeChange?.(
      deepUpdateObj(theme.config, [...path, tokenName], value),
    );
  };

  return wrapSSR(
    <div
      className={classNames(className, hashId, 'token-panel-token-detail')}
      style={style}
    >
      <div className="token-panel-pro-token-collapse-map-collapse-token-description">
        {tokenInfo[tokenName]?.description}
      </div>
      {getRelatedComponents(tokenName).length > 0 && (
        <Tooltip
          title={getRelatedComponents(tokenName).join(', ')}
          placement="topLeft"
        >
          <div className="token-panel-pro-token-collapse-map-collapse-token-usage-tag-container">
            {getRelatedComponents(tokenName).map((item) => (
              <span
                key={item}
                className="token-panel-pro-token-collapse-map-collapse-token-usage-tag"
              >
                {item}
              </span>
            ))}
          </div>
        </Tooltip>
      )}
      <div className="token-panel-pro-token-collapse-map-collapse-token-inputs">
        {themes.map((themeItem) => {
          return (
            <div key={themeItem.key}>
              <TokenInput
                theme={themeItem}
                onChange={handleTokenChange(themeItem)}
                value={
                  getValueByPath(themeItem.config, [...path, tokenName]) ??
                  (getDesignToken(themeItem.config) as any)[tokenName]
                }
              />
            </div>
          );
        })}
      </div>
    </div>,
  );
};

export default TokenDetail;
