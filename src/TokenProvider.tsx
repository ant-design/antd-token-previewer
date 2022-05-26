import type { FC } from 'react';
import React, { useState } from 'react';
import type { GlobalToken } from '@madccc/antd/es/_util/theme/interface';
import { ConfigProvider } from '@madccc/antd';
import useToken from './hooks/useToken';

type SetToken = <K extends keyof GlobalToken>(
  key: K,
  value: GlobalToken[K],
) => void;
type ToggleSelectedToken = (token: keyof GlobalToken) => void;

type TokenContextProps = {
  selectedTokens: (keyof GlobalToken)[];
  setToken: SetToken;
  toggleSelectedToken: ToggleSelectedToken;
};

export const TokenContext = React.createContext<TokenContextProps>({
  selectedTokens: [],
  setToken: () => {},
  toggleSelectedToken: () => {},
});

const TokenProvider: FC = ({ children }) => {
  const [tokens, setTokens] = useToken();
  const [selectedTokens, setSelectedTokens] = useState<(keyof GlobalToken)[]>(
    [],
  );

  const setToken: SetToken = (key, value) => {
    setTokens((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const toggleSelectedToken: ToggleSelectedToken = (target) => {
    setSelectedTokens((prev) => {
      return prev.includes(target)
        ? prev.filter((item) => item !== target)
        : [...prev, target];
    });
  };

  return (
    <ConfigProvider theme={{ token: tokens, hashed: true }}>
      <TokenContext.Provider
        value={{
          selectedTokens,
          setToken,
          toggleSelectedToken,
        }}
      >
        {children}
      </TokenContext.Provider>
    </ConfigProvider>
  );
};

export default TokenProvider;
