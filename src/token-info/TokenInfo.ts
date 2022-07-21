import type { AliasToken } from '../interface';

type TokenInfo = {
  [key in keyof AliasToken]?: {
    name: string;
    description: string;
  };
};

const tokenInfo: TokenInfo = {
  colorPrimary: {
    name: '品牌主色',
    description:
      '品牌色是体现产品特性和传播理念最直观的视觉元素之一。在你完成品牌主色的选取之后，我们会自动帮你生成一套完整的色板，并赋予它们有效的设计语义。',
  },
  colorPrimaryBg: {
    name: '浅色背景',
    description: 'TBD',
  },
  colorPrimaryBgHover: {
    name: '浅色背景悬浮态',
    description: 'TBD',
  },
  colorPrimaryOutline: {
    name: '浅色背景激活态',
    description: 'TBD',
  },
  colorPrimaryBorder: {
    name: '描边',
    description: 'TBD',
  },
  colorPrimaryBorderHover: {
    name: '描边悬浮态',
    description: 'TBD',
  },
  colorPrimaryHover: {
    name: '深色悬浮态',
    description: 'TBD',
  },
  colorPrimaryActive: {
    name: '深色激活态',
    description: 'TBD',
  },
  colorSuccess: {
    name: '成功色',
    description: 'TBD',
  },
  colorWarning: {
    name: '警戒色',
    description: 'TBD',
  },
  colorError: {
    name: '错误色',
    description: 'TBD',
  },
  colorInfo: {
    name: '信息色',
    description: 'TBD',
  },
  colorTextBase: {
    name: '文本色',
    description: 'TBD',
  },
  colorBgBase: {
    name: '背景色',
    description: 'TBD',
  },
  controlItemBgActive: {
    name: '控件激活态背景色',
    description: '用于控件类组件中的单项的激活态选中样式。',
  },
  controlItemBgActiveHover: {
    name: '控件激活态背景色',
    description: '用于控件类组件中的单项的激活态选中样式。',
  },
};

export default tokenInfo;
