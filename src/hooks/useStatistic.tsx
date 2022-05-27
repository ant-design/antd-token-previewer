import { useEffect, useState } from 'react';
import { ConfigProvider } from '@madccc/antd';

const statistic =
  ConfigProvider.__V5_STATISTIC_DO_NOT_USE_OR_YOU_WILL_BE_FIRED__;

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
