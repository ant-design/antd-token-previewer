import tokenStatistic from 'antd/es/version/token';

export const getRelatedComponents = (token: string | string[]): string[] => {
  return Object.entries(tokenStatistic)
    .filter(([, tokens]) => {
      if (typeof token === 'string') {
        return (tokens.global as string[]).includes(token);
      } else {
        return token.some((item) => (tokens.global as string[]).includes(item));
      }
    })
    .map(([component]) => component);
};

export const getComponentToken = (component: string) =>
  (tokenStatistic as any)[component];
