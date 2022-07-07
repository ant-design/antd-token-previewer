import { useEffect, useState } from 'react';
import tokenStatistic from 'antd/es/version/token';

const useStatistic = (selectedTokens: string[] = []) => {
  const length = Object.keys(tokenStatistic).length;
  const [relatedComponents, setRelatedComponents] = useState<string[]>([]);

  useEffect(() => {
    setRelatedComponents(
      Object.entries(tokenStatistic)
        .filter(([, tokens]) =>
          selectedTokens.some((item) =>
            (tokens.global as string[]).includes(item),
          ),
        )
        .map(([component]) => component),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenStatistic, length, selectedTokens.join(',')]);

  return {
    relatedComponents,
    getRelatedComponents: (token: string): string[] =>
      Object.entries(tokenStatistic)
        .filter(([, tokens]) => (tokens.global as string[]).includes(token))
        .map(([component]) => component),
    getComponentToken: (component: string) =>
      (tokenStatistic as any)[component],
  };
};

export default useStatistic;
