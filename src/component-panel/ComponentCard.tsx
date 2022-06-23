import type { FC, PropsWithChildren } from 'react';
import React, { useState } from 'react';
import { Card, ConfigProvider } from '@madccc/antd';
import { Control } from '../icons';
import makeStyle from '../utils/makeStyle';
import classNames from 'classnames';
import ComponentTokenDrawer from './ComponentTokenDrawer';
import type { MutableTheme, TokenName } from '../interface';
import type { ThemeConfig } from '@madccc/antd/es/config-provider/context';

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
  defaultTheme?: ThemeConfig;
  onTokenClick?: (token: TokenName) => void;
}>;

const ComponentCard: FC<ComponentCardProps> = ({
  children,
  component,
  theme,
  defaultTheme,
  onTokenClick,
}) => {
  const [wrapSSR, hashId] = useStyle();
  const [tokenDrawerOpen, setTokenDrawerOpen] = useState<boolean>(false);

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
        {children}
      </Card>
      <ConfigProvider theme={defaultTheme}>
        <ComponentTokenDrawer
          visible={tokenDrawerOpen}
          theme={theme}
          component={component}
          onClose={() => setTokenDrawerOpen(false)}
          onTokenClick={onTokenClick}
          defaultTheme={defaultTheme}
        />
      </ConfigProvider>
    </div>,
  );
};

export default ComponentCard;
