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
    name: '浅色背景色',
    description: '主色的浅色背景颜色，一般用于视觉层级较弱的选中状态。',
  },
  colorPrimaryBgHover: {
    name: '浅色背景悬浮态',
    description: '与主色的浅色背景颜色',
  },
  colorPrimaryBorder: {
    name: '描边',
    description: '主色描边的场景',
  },
  colorPrimaryTextHover: {
    name: '文本悬浮态',
    description: '',
  },
  colorPrimaryTextActive: {
    name: '文本激活态',
    description: '',
  },
  colorPrimaryText: {
    name: '文本默认态',
    description: '',
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
  colorFill: {
    name: '一级填充色',
    description:
      '最深的填充色，用于拉开与二、三级填充色的区分度，目前只用在 Slider 的 hover 效果',
  },
  colorFillSecondary: {
    name: '二级填充色',
    description:
      '二级填充色可以较为明显地勾勒出元素形体，如 Rate、Skeleton 等。也可以作为三级填充色的 Hover 状态，如 Table 等',
  },
  colorFillTertiary: {
    name: '三级填充色',
    description: '三级填充色用于勾勒出元素形体的场景，如 Slider、Segmented 等',
  },
  colorFillQuaternary: {
    name: '四级填充色',
    description:
      '最弱一级的填充色，适用于不易引起注意的色块，例如斑马纹、区分边界的色块等。',
  },
};

export default tokenInfo;
