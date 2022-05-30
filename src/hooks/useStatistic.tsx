import { useEffect, useState } from 'react';
import { _statistic_build_ as statistic } from '@madccc/antd/lib/_util/theme/util/statistic';

const useStatistic = (selectedTokens: string[] = []) => {
  const length = Object.keys(statistic).length;
  const [relatedComponents, setRelatedComponents] = useState<string[]>([]);

  useEffect(() => {
    setRelatedComponents(
      Object.entries(statistic)
        .filter(([, tokens]) =>
          selectedTokens.some((item) => tokens.global.includes(item)),
        )
        .map(([component]) => component),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [length, selectedTokens.join(',')]);

  return {
    relatedComponents,
    getComponentToken: (component: string) => statistic[component]?.component,
  };
};

export default useStatistic;
