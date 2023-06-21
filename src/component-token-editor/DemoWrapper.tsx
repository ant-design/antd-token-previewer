import classNames from 'classnames';
import type { FC, PropsWithChildren } from 'react';
import React from 'react';
import makeStyle from '../utils/makeStyle';

const useStyle = makeStyle('ComponentTokenEditorDemoWrapper', (token) => ({
  [`${token.componentCls}`]: {
    height: 0,
    overflow: 'auto',
    flex: 1,
    background: token.colorBgLayout,

    [`& > ${token.rootCls}-card`]: {
      margin: 24,
      width: 'calc(100% - 48px)',
    },
  },
}));

const DemoWrapper: FC<PropsWithChildren> = ({ children }) => {
  const prefixCls = `antd-component-token-editor-demo-wrapper`;

  const [, hashId] = useStyle(prefixCls);

  return <div className={classNames(prefixCls, hashId)}>{children}</div>;
};

export default DemoWrapper;
