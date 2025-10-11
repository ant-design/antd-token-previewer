import type { CSSInterpolation } from '@ant-design/cssinjs';
import { useStyleRegister } from '@ant-design/cssinjs';
import { ConfigProvider, theme as antdTheme } from 'antd';
import type { GlobalToken } from 'antd/es/theme/interface';
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
  ) => string) =>
  (prefixCls) => {
    const { theme, token, hashId } = antdTheme.useToken();
    const { getPrefixCls } = useContext(ConfigContext);
    const rootCls = getPrefixCls();

    useStyleRegister(
      { theme: theme as any, hashId, token, path: [path, prefixCls || ''] },
      () =>
        styleFn({
          ...token,
          rootCls: `.${rootCls}`,
          componentCls: `.${prefixCls}`,
          headerHeight: 56,
        }),
    )

    return hashId;
  };

export default makeStyle;
