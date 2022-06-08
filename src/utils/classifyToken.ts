import type { ThemeConfig } from '@madccc/antd/es/config-provider/context';
import type { TokenValue } from '../interface';
import type { GlobalToken } from '@madccc/antd/lib/_util/theme/interface';

function defineTokenType<T extends string>(types: T[]) {
  return types;
}

export const TOKEN_SORTS = defineTokenType([
  'colorText',
  'colorBg',
  'colorSplit',
  'colorCommon',
  'font',
  'radius',
  'space',
  'screen',
  'line',
  'motion',
  'control',
  'others',
]);

export type TokenType = typeof TOKEN_SORTS[number];

function getTypeOfToken(tokenName: keyof GlobalToken): TokenType {
  if (tokenName.startsWith('color')) {
    if (
      tokenName.startsWith('colorLink') ||
      tokenName.startsWith('colorText') ||
      tokenName.startsWith('colorIcon') ||
      tokenName.startsWith('colorPlaceholder') ||
      tokenName.startsWith('colorAction')
    ) {
      return 'colorText';
    }
    if (
      tokenName.startsWith('colorBg') ||
      tokenName.startsWith('colorPopupBg')
    ) {
      return 'colorBg';
    }
    if (
      tokenName.startsWith('colorBorder') ||
      tokenName.startsWith('colorSplit')
    ) {
      return 'colorSplit';
    }
    return 'colorCommon';
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
  if (tokenName.startsWith('control')) {
    return 'control';
  }
  if (tokenName.startsWith('margin') || tokenName.startsWith('padding')) {
    return 'space';
  }
  return 'others';
}

export type TokenName = keyof Exclude<ThemeConfig['token'], undefined>;

export const classifyToken = (
  token: Record<string, TokenValue>,
): Record<string, { tokenName: TokenName; value: TokenValue }[]> => {
  const groupedToken: Record<
    string,
    { tokenName: TokenName; value: TokenValue }[]
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
