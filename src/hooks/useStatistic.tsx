import { useEffect, useState } from 'react';
import {
  _statistic_build_,
  statistic as runtimeStatistic,
} from 'antd/lib/theme/util/statistic';

const useStatistic = (
  selectedTokens: string[] = [],
  statistic: typeof runtimeStatistic = runtimeStatistic,
) => {
  const mergedStatistic =
    Object.keys(_statistic_build_).length === 0 ? statistic : _statistic_build_;
  const length = Object.keys(mergedStatistic).length;
  const [relatedComponents, setRelatedComponents] = useState<string[]>([]);

  useEffect(() => {
    setRelatedComponents(
      Object.entries(mergedStatistic)
        .filter(([, tokens]) =>
          selectedTokens.some((item) => tokens.global.includes(item)),
        )
        .map(([component]) => component),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mergedStatistic, length, selectedTokens.join(',')]);

  return {
    relatedComponents,
    getRelatedComponents: (token: string): string[] =>
      Object.entries(mergedStatistic)
        .filter(([, tokens]) => tokens.global.includes(token))
        .map(([component]) => component),
    getComponentToken: (component: string) => mergedStatistic[component],
  };
};

export default useStatistic;
