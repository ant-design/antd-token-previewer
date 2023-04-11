import type { CSSInterpolation } from '@ant-design/cssinjs';
import { useStyleRegister } from '@ant-design/cssinjs';
import { ConfigProvider, theme as antdTheme } from 'antd';
import type { GlobalToken } from 'antd/es/theme/interface';
import type React from 'react';
import { useContext } from 'react';

const { ConfigContext } = ConfigProvider;

export type ThemeEditorToken = GlobalToken & {
  rootCls: string;
  componentCls: string;
  headerHeight: number;
};

const makeStyle =
  (
    path: string,
    styleFn: (token: ThemeEditorToken) => CSSInterpolation,
  ): ((
    prefixCls?: string,
  ) => [(node: React.ReactNode) => React.ReactElement, string]) =>
  (prefixCls) => {
    const { theme, token, hashId } = antdTheme.useToken();
    const { getPrefixCls } = useContext(ConfigContext);
    const rootCls = getPrefixCls();

    return [
      useStyleRegister(
        { theme: theme as any, hashId, token, path: [path, prefixCls || ''] },
        () =>
          styleFn({
            ...token,
            rootCls: `.${rootCls}`,
            componentCls: `.${prefixCls}`,
            headerHeight: 56,
          }),
      ) as (node: React.ReactNode) => React.ReactElement,
      hashId,
    ];
  };

export default makeStyle;
