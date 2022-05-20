import type { FC } from 'react';
import React, { useState } from 'react';
import ComponentTree from './ComponentTree';
import makeStyle from '../utils/makeStyle';
import classNames from 'classnames';
import { MenuFoldOutlined } from '@ant-design/icons';
import ButtonDemo from '../demos/button';

const useStyle = makeStyle('ComponentPanel', (token) => ({
  '.component-panel': {
    boxShadow:
      '0 2px 4px 0 rgba(0,0,0,0.05), 0 1px 2px 0 rgba(25,15,15,0.07), 0 0 1px 0 rgba(0,0,0,0.08)',
    backgroundColor: '#fff',
    display: 'flex',
    borderRadius: 6,
    height: '100%',
    overflow: 'hidden',

    '.component-panel-main': {
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: token.colorBgContainer,
      flex: 1,

      '.component-panel-head': {
        padding: `${token.padding}px ${token.paddingSM}px`,
        flex: 'none',
        backgroundColor: token.colorBgComponent,
      },

      '.component-panel-toggle-side-icon': {
        '.anticon': {
          color: token.colorAction,
          transition: `color ${token.motionDurationMid}`,

          '&:hover': {
            color: token.colorActionHover,
          },
        },
      },
    },

    '.component-panel-side': {
      flex: 'none',
      width: 160,
      overflow: 'hidden',
      transition: `transform ${token.motionDurationMid}, width ${token.motionDurationMid}`,
    },

    '.component-panel-side.component-panel-side-hidden': {
      width: 0,
      transform: 'translateX(-160px)',
    },
  },
}));

const Index: FC = () => {
  const [wrapSSR, hashId] = useStyle();
  const [showSide, setShowSide] = useState<boolean>(true);

  return wrapSSR(
    <div className={classNames('component-panel', hashId)}>
      <div
        className={classNames('component-panel-side', {
          'component-panel-side-hidden': !showSide,
        })}
      >
        <ComponentTree />
      </div>
      <div className="component-panel-main">
        <div className="component-panel-head">
          <div className="component-panel-toggle-side-icon">
            <MenuFoldOutlined onClick={() => setShowSide((prev) => !prev)} />
          </div>
        </div>
        <div style={{ padding: 16 }}>
          <ButtonDemo />
        </div>
      </div>
    </div>,
  );
};

export default Index;
