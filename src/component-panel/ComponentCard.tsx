import type { FC, PropsWithChildren } from 'react';
import React from 'react';
import type { CardProps } from 'antd';
import { Card } from 'antd';
import { Control } from '../icons';
import makeStyle from '../utils/makeStyle';
import classNames from 'classnames';
import type { TokenName } from '../interface';

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
  component: CardProps['title'];
  onTokenClick?: (token: TokenName) => void;
  onToggleTokenDrawerOpen?: () => void;
}>;

const ComponentCard: FC<ComponentCardProps> = ({
  children,
  component,
  onToggleTokenDrawerOpen,
}) => {
  const [wrapSSR, hashId] = useStyle();

  return wrapSSR(
    <Card
      className={classNames('component-card', hashId)}
      title={component}
      extra={
        onToggleTokenDrawerOpen && (
          <Control
            className="component-token-control-icon"
            onClick={() => onToggleTokenDrawerOpen()}
          />
        )
      }
    >
      {children}
    </Card>,
  );
};

export default ComponentCard;
