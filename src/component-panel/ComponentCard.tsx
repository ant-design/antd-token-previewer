import type { FC, PropsWithChildren } from 'react';
import React, { useRef, useState } from 'react';
import { Card, ConfigProvider, theme as antdTheme } from '@madccc/antd';
import { Control } from '../icons';
import makeStyle from '../utils/makeStyle';
import classNames from 'classnames';
import ComponentTokenDrawer from './ComponentTokenDrawer';
import type { MutableTheme, TokenName, TokenValue } from '../interface';
import isColor from '../utils/isColor';
import getDesignToken from '../utils/getDesignToken';

const useStyle = makeStyle('ComponentCard', (token) => ({
  [`${token.rootCls}-card.component-card`]: {
    borderRadius: 6,
    boxShadow: `0 1px 2px 0 rgba(25,15,15,0.07)`,

    [`${token.rootCls}-card-head`]: {
      paddingInline: 18,

      [`${token.rootCls}-card-head-title`]: {
        paddingBlock: token.paddingSM,
        fontSize: token.fontSize,
      },
    },

    [`${token.rootCls}-card-body`]: {
      padding: 18,
      overflow: 'auto',
    },

    '.component-token-control-icon': {
      color: token.colorAction,
      transition: `color ${token.motionDurationMid}`,
      fontSize: token.fontSizeLG,
      cursor: 'pointer',

      '&:hover': {
        color: token.colorActionHover,
      },
    },
  },
}));

export const getComponentDemoId = (component: string) =>
  `antd-token-previewer-${component}`;

export type ComponentCardProps = PropsWithChildren<{
  component: string;
  theme: MutableTheme;
  onTokenClick?: (token: TokenName) => void;
}>;

const ComponentCard: FC<ComponentCardProps> = ({
  children,
  component,
  theme,
  onTokenClick,
}) => {
  const [wrapSSR, hashId] = useStyle();
  const [tokenDrawerOpen, setTokenDrawerOpen] = useState<boolean>(false);
  const [aliasToken, setAliasToken] = useState<Record<string, TokenValue>>({});
  const highlightRef = useRef(false);

  const handleTokenClick = (token: TokenName) => {
    if (onTokenClick) {
      onTokenClick(token);
    }
    if (
      !highlightRef.current &&
      typeof getDesignToken(theme.config)[token] === 'string' &&
      isColor(getDesignToken(theme.config)[token] as string)
    ) {
      setAliasToken({ ...aliasToken, [token]: '#faad14' });
      highlightRef.current = true;
      setTimeout(() => {
        const newAlias = { ...aliasToken };
        delete newAlias[token];
        setAliasToken(newAlias);
        highlightRef.current = false;
      }, 2000);
    }
  };

  return wrapSSR(
    <div>
      <Card
        className={classNames('component-card', hashId)}
        title={component}
        extra={
          <Control
            className="component-token-control-icon"
            onClick={() => setTokenDrawerOpen((prev) => !prev)}
          />
        }
      >
        <ConfigProvider theme={{ override: { alias: aliasToken } }}>
          {children}
        </ConfigProvider>
      </Card>
      <ConfigProvider theme={{ override: { alias: getDesignToken() } }}>
        <ComponentTokenDrawer
          visible={tokenDrawerOpen}
          theme={theme}
          component={component}
          onClose={() => setTokenDrawerOpen(false)}
          onTokenClick={handleTokenClick}
        />
      </ConfigProvider>
    </div>,
  );
};

export default ComponentCard;
