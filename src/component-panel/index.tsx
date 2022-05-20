import type { FC } from 'react';
import React from 'react';
import ButtonDemo from '../demos/button';
import ComponentTree from './ComponentTree';
import makeStyle from '../utils/makeStyle';
import classNames from 'classnames';

const useStyle = makeStyle('ComponentPanel', () => ({
  '.component-panel': {
    boxShadow:
      '0 2px 4px 0 rgba(0,0,0,0.05), 0 1px 2px 0 rgba(25,15,15,0.07), 0 0 1px 0 rgba(0,0,0,0.08)',
    backgroundColor: '#fff',
    display: 'flex',
    borderRadius: 6,
  },
}));

const Index: FC = () => {
  const [wrapSSR, hashId] = useStyle();

  return wrapSSR(
    <div className={classNames('component-panel', hashId)}>
      <ComponentTree />
      <ButtonDemo />
    </div>,
  );
};

export default Index;
