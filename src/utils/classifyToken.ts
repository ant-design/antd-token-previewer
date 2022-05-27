import { GlobalToken } from '@madccc/antd/lib/_util/theme/interface';

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
  if (tokenName.startsWith('margin') || tokenName.startsWith('padding')) {
    return 'space';
  }
  return 'else';
}

export const classifyToken = (token: GlobalToken) => {
  const groupedToken: Record<string, { tokenName: string; value: string }[]> =
    {};
  Object.entries(token).forEach(([key, value]) => {
    const type = getTypeOfToken(key as keyof GlobalToken);
    if (!groupedToken[type]) {
      groupedToken[type] = [];
    }
    groupedToken[type].push({ tokenName: key, value });
  });
  return groupedToken;
};
