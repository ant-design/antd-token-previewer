import type { FC } from 'react';
import React, { useMemo } from 'react';
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
import { mapRelatedAlias } from '../token-info/TokenRelation';
import deepUpdateObj from '../utils/deepUpdateObj';

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
      [...path, tokenName],
    );
  };

  const relatedComponents = useMemo(() => {
    return getRelatedComponents([
      tokenName,
      ...((mapRelatedAlias as any)[tokenName] ?? []),
    ]);
  }, [tokenName]);

  return wrapSSR(
    <div
      className={classNames(className, hashId, 'token-panel-token-detail')}
      style={style}
    >
      <div className="token-panel-pro-token-collapse-map-collapse-token-description">
        {tokenInfo[tokenName]?.description}
      </div>
      {relatedComponents.length > 0 && (
        <Tooltip
          title={getRelatedComponents(tokenName).join(', ')}
          placement="topLeft"
        >
          <div className="token-panel-pro-token-collapse-map-collapse-token-usage-tag-container">
            {relatedComponents.map((item) => (
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
