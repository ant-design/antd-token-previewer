import { statistic } from '@madccc/antd/es/_util/theme';
import { useEffect, useState } from 'react';

const useStatistic = () => {
  const [tokens, setTokens] = useState(statistic);
  const length = Object.keys(statistic).length;

  useEffect(() => {
    setTokens({ ...statistic });
  }, [length]);

  return tokens;
};

export default useStatistic;
