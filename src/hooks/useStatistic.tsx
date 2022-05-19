import { statistic } from '@madccc/antd/es/_util/theme';
import { useContext, useEffect, useState } from 'react';
import { TokenContext } from '../TokenProvider';

const useStatistic = () => {
  const length = Object.keys(statistic).length;
  const { selectedTokens } = useContext(TokenContext);
  const [relatedComponents, setRelatedComponents] = useState<string[]>([]);

  useEffect(() => {
    console.log(statistic, selectedTokens);
    setRelatedComponents(
      Object.entries(statistic)
        .filter(([, tokens]) =>
          selectedTokens.some((item) => tokens.includes(item)),
        )
        .map(([component]) => component),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [length, selectedTokens.join(',')]);

  return {
    relatedComponents,
  };
};

export default useStatistic;
