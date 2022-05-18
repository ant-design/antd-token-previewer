import { ConfigProvider } from '@madccc/antd';

const useAntdToken = ConfigProvider.useToken;

const useToken = () => {
  const [, token] = useAntdToken();

  return token;
};

export default useToken;
