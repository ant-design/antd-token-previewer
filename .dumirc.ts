// more config: https://d.umijs.org/config
import { defineConfig } from 'dumi';

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
  base: '/antd-token-previewer/',
  publicPath: '/antd-token-previewer/',
  hash: true,
});
