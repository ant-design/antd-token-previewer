import type React from 'react';
import { theme } from '@madccc/antd';
import { useState } from 'react';
import type { GlobalToken } from '@madccc/antd/es/theme/interface';

const useToken = (): [
  GlobalToken,
  React.Dispatch<React.SetStateAction<GlobalToken>>,
] => {
  const { token } = theme.useToken();
  const [tokens, setTokens] = useState<GlobalToken>(token);

  return [tokens, setTokens];
};

export default useToken;
