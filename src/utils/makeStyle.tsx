import { ConfigProvider } from '@madccc/antd';
import React from 'react';
import { useStyleRegister, CSSInterpolation } from '@ant-design/cssinjs';
import { GlobalToken } from '@madccc/antd/lib/_util/theme/interface';

const useToken = ConfigProvider.useToken;

const makeStyle =
  (
    path: string,
    styleFn: (token: GlobalToken) => CSSInterpolation,
  ): (() => [(node: React.ReactNode) => React.ReactElement, string]) =>
  () => {
    const [theme, token, hashId] = useToken();

    return [
      useStyleRegister({ theme, hashId, token, path: [path] }, () =>
        styleFn(token),
      ) as (node: React.ReactNode) => React.ReactElement,
      hashId,
    ];
  };

export default makeStyle;
