import type React from 'react';
import { ConfigProvider } from '@madccc/antd';
import { useState } from 'react';
import type { GlobalToken } from '@madccc/antd/es/_util/theme/interface';

const useAntdToken = ConfigProvider.useToken;

const useToken = (): [
  GlobalToken,
  React.Dispatch<React.SetStateAction<GlobalToken>>,
] => {
  const [, token] = useAntdToken();
  const [tokens, setTokens] = useState<GlobalToken>(token);

  console.log(Object.keys(token));

  return [tokens, setTokens];
};

export default useToken;
