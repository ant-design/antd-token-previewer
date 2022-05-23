import type { FC, PropsWithChildren } from 'react';
import { Card, Drawer } from '@madccc/antd';
import React, { useState } from 'react';
import { ControlOutlined } from '@ant-design/icons';
import makeStyle from '../utils/makeStyle';
import classNames from 'classnames';

const useStyle = makeStyle('ComponentCard', () => ({
  '.component-card': {
    borderRadius: 6,
    boxShadow: `0 1px 2px 0 rgba(25,15,15,0.07)`,
  },
}));

export const getComponentDemoId = (component: string) =>
  `antd-token-previewer-${component}`;

export type ComponentCardProps = PropsWithChildren<{
  component: string;
}>;

const ComponentCard: FC<ComponentCardProps> = ({ children, component }) => {
  const [wrapSSR, hashId] = useStyle();
  const [tokenDrawerOpen, setTokenDrawerOpen] = useState<boolean>(false);

  return wrapSSR(
    <div>
      <div
        id={getComponentDemoId(component)}
        style={{ height: 0, transform: 'translateY(-16px)' }}
      />
      <Card
        className={classNames('component-card', hashId)}
        title={component}
        extra={
          <ControlOutlined
            onClick={() => setTokenDrawerOpen((prev) => !prev)}
          />
        }
      >
        {children}
      </Card>
      <Drawer
        visible={tokenDrawerOpen}
        title={`${component} 组件 Token`}
        onClose={() => setTokenDrawerOpen(false)}
      >
        13
      </Drawer>
    </div>,
  );
};

export default ComponentCard;
