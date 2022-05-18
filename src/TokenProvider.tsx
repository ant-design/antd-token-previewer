import React, { FC, PropsWithChildren, useCallback, useState } from 'react';
import { GlobalToken } from '@madccc/antd/es/_util/theme/interface';
import { ConfigProvider } from '@madccc/antd';
import useToken from '@/hooks/useToken';

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

const TokenProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const token = useToken();
  const [tokens, setTokens] = useState(token);
  const [selectedTokens, setSelectedTokens] = useState<(keyof GlobalToken)[]>(
    [],
  );

  const setToken: SetToken = (key, value) => {
    setTokens((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const toggleSelectedToken: ToggleSelectedToken = (token) => {
    setSelectedTokens((prev) => {
      return prev.includes(token)
        ? prev.filter((item) => item !== token)
        : [...prev, token];
    });
  };

  return (
    <ConfigProvider theme={{ token: tokens }}>
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
