import tokenStatistic from 'antd/es/version/token';
import type { TokenName } from '../interface';

const tokenRelatedComponents: {
  [key in TokenName]?: string[];
} = {};

const getRelatedComponentsSingle = (token: TokenName): string[] => {
  if (!tokenRelatedComponents[token]) {
    tokenRelatedComponents[token] = Object.entries(tokenStatistic)
      .filter(([, tokens]) => {
        return (tokens.global as string[]).includes(token);
      })
      .map(([component]) => component);
  }
  return tokenRelatedComponents[token] ?? [];
};

export const getRelatedComponents = (
  token: TokenName | TokenName[],
): string[] => {
  const mergedTokens = Array.isArray(token) ? token : [token];
  return Array.from(
    new Set(
      mergedTokens.reduce<string[]>((result, item) => {
        return result.concat(getRelatedComponentsSingle(item));
      }, []),
    ),
  );
};

export const getComponentToken = (component: string) =>
  (tokenStatistic as any)[component];
