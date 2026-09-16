import type { ThemeConfig } from 'antd';
import { theme } from 'antd';

export type Algorithm = 'dark' | 'compact';

export interface PlainThemeConfig extends Omit<ThemeConfig, 'algorithm'> {
  algorithm?: Algorithm | Algorithm[];
}

export const algorithmMap: {
  [key in Algorithm]: typeof theme.darkAlgorithm;
} = {
  dark: theme.darkAlgorithm,
  compact: theme.compactAlgorithm,
};

export const getAlgorithmString = (algorithm: typeof theme.darkAlgorithm) => {
  return Object.entries(algorithmMap).find(
    ([, value]) => value === algorithm,
  )?.[0] as Algorithm;
};

export const parsePlainConfig = (config: ThemeConfig): PlainThemeConfig => {
  const { algorithm, ...rest } = config;
  if (!algorithm) return rest;

  const parsedAlgorithms = Array.isArray(algorithm)
    ? algorithm.map(getAlgorithmString)
    : getAlgorithmString(algorithm);
  return {
    ...rest,
    algorithm: parsedAlgorithms,
  };
};

// JSON import can carry explicit null values (e.g. {"token": {"borderRadius": null}}).
// null is not a valid theme value: it would break the "is modified" display
// and leak into preview rendering via getDesignToken.
const removeNullValues = (value: any): any => {
  if (Array.isArray(value)) return value;
  if (value !== null && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value)
        .filter(([, item]) => item !== null)
        .map(([key, item]) => [key, removeNullValues(item)]),
    );
  }
  return value;
};

export const parseThemeConfig = (config: PlainThemeConfig): ThemeConfig => {
  const { algorithm, ...rest } = config;
  const cleanRest = removeNullValues(rest) as typeof rest;
  if (!algorithm) return cleanRest;

  const parsedAlgorithms = Array.isArray(algorithm)
    ? algorithm.map((item) => algorithmMap[item]).filter(Boolean)
    : algorithmMap[algorithm];
  return {
    ...cleanRest,
    algorithm: parsedAlgorithms,
  };
};
