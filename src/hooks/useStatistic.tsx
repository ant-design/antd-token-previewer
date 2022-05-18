import { statistic } from '@madccc/antd/es/_util/theme';
import { useEffect, useState } from 'react';

const useStatistic = () => {
  const [tokens, setTokens] = useState(statistic);

  useEffect(() => {
    setTokens({ ...statistic });
  }, [Object.keys(statistic).length]);

  return tokens;
};

export default useStatistic;
