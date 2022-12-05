// more config: https://d.umijs.org/config
import { defineConfig } from 'dumi';

const isProdSite =
  // 不是预览模式 同时是生产环境
  process.env.PREVIEW !== '1' && process.env.NODE_ENV === 'production';

export default defineConfig({
  themeConfig: {
    name: 'antd-token-previewer',
    sideBar: {},
    nav: [
      { title: 'Previewer', link: '/previewer' },
      { title: 'Theme Editor', link: '/editor' },
      { title: 'others', link: '/others/color-panel' },
    ],
  },
  outputPath: '.doc',
  exportStatic: {},
  base: isProdSite ? '/antd-token-previewer/' : '/',
  publicPath: isProdSite ? '/antd-token-previewer/' : '/',
  hash: true,
});
