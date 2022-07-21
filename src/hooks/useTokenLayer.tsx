import seed from 'antd/es/theme/themes/seed';
import defaultMap from 'antd/es/theme/themes/default';
import { useMemo } from 'react';
import type { ThemeConfig } from 'antd/es/config-provider/context';
import type { AliasToken, MapToken, SeedToken } from 'antd/es/theme/interface';
import getDesignToken from '../utils/getDesignToken';

export type PureMapToken = Omit<MapToken, keyof SeedToken>;
export type PureAliasToken = Omit<AliasToken, keyof MapToken>;

const useTokenLayer = (config: ThemeConfig = {}) => {
  const mapToken = useMemo(() => {
    const mapFn = config.algorithm ?? defaultMap;
    const fullMapToken = { ...mapFn(seed), ...config.override?.derivative };
    const newMapToken: any = {};
    Object.keys(fullMapToken).forEach((key) => {
      if (!seed.hasOwnProperty(key)) {
        newMapToken[key] = (fullMapToken as any)[key];
      }
    });
    return newMapToken as PureMapToken;
  }, [config.algorithm, config.override?.derivative]);

  const aliasToken = useMemo(() => {
    const fullAliasToken = getDesignToken(config);
    const newAliasToken: any = {};
    Object.keys(fullAliasToken).forEach((key) => {
      if (!seed.hasOwnProperty(key) && !mapToken.hasOwnProperty(key)) {
        newAliasToken[key] = (fullAliasToken as any)[key];
      }
    });
    return newAliasToken as PureAliasToken;
  }, [config, mapToken]);

  return {
    seedToken: seed,
    mapToken,
    aliasToken,
  };
};

export default useTokenLayer;
