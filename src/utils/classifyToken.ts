import type { ThemeConfig } from '@madccc/antd/es/config-provider/context';
import type { GlobalToken } from '@madccc/antd/lib/_util/theme/interface';

export const TOKEN_SORTS = [
  'color',
  'font',
  'radius',
  'space',
  'screen',
  'line',
  'motion',
  'others',
];

function getTypeOfToken(tokenName: keyof GlobalToken): string {
  if (tokenName.startsWith('color')) {
    return 'color';
  }
  if (tokenName.startsWith('font')) {
    return 'font';
  }
  if (tokenName.startsWith('screen')) {
    return 'screen';
  }
  if (tokenName.startsWith('line')) {
    return 'line';
  }
  if (tokenName.startsWith('motion')) {
    return 'motion';
  }
  if (tokenName.startsWith('radius')) {
    return 'radius';
  }
  if (tokenName.startsWith('margin') || tokenName.startsWith('padding')) {
    return 'space';
  }
  return 'others';
}

export type TokenName = keyof Exclude<ThemeConfig['token'], undefined>;

export const classifyToken = (
  token: ThemeConfig['token'],
): Record<string, { tokenName: TokenName; value: string | number }[]> => {
  const groupedToken: Record<
    string,
    { tokenName: TokenName; value: string | number }[]
  > = {};
  Object.entries(token || {}).forEach(([key, value]) => {
    const type = getTypeOfToken(key as keyof GlobalToken);
    if (!groupedToken[type]) {
      groupedToken[type] = [];
    }
    groupedToken[type].push({ tokenName: key as TokenName, value });
  });
  return groupedToken;
};
