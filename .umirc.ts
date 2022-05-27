// more config: https://d.umijs.org/config
import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'antd-token-previewer',
  favicon: 'https://avatars0.githubusercontent.com/u/9441414?s=200&v=4',
  logo: 'https://avatars0.githubusercontent.com/u/9441414?s=200&v=4',
  outputPath: '.doc',
  exportStatic: {},
  base: '/antd-token-previewer',
  publicPath: '/antd-token-previewer/',
  hash: true,
  chainWebpack(memo, { env, webpack }) {
    if (env === 'production') {
      memo
        .plugin('CSSINJS_STATISTIC')
        .use(
          new webpack.DefinePlugin({ CSSINJS_STATISTIC: JSON.stringify(true) }),
        );
    }
  },
});
