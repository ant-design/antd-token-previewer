jest.mock('antd', () => {
  const antd = jest.requireActual('antd');
  antd.theme.defaultConfig.hashed = false;

  return antd;
});
