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

  // ======= 中性色 Map Token  ======= //

  colorText: {
    name: '一级文本色',
    description:
      '最深的文本色。为了符合W3C标准，默认的文本颜色使用了该色，同时这个颜色也是最深的中性色。',
  },
  colorTextSecondary: {
    name: '二级文本色',
    description:
      '作为第梯度的文本色，一般用在不那么需要强化文本颜色的场景，例如 Label 文本、Menu 的文本选中态等场景。',
  },
  colorTextTertiary: {
    name: '三级文本色',
    description:
      '第三级文本色一般用于描述性文本，例如表单的中的补充说明文本、列表的描述性文本等场景。',
  },
  colorTextQuaternary: {
    name: '四级文本色',
    description:
      '第四级文本色是最浅的文本色，例如表单的输入提示文本、禁用色文本等。',
  },

  colorBorder: {
    name: '边框色',
    description: '默认使用的边框颜色',
  },
  colorBorderSecondary: {
    name: '二级边框色',
    description:
      '比默认使用的边框色要浅一级，此颜色和 colorSplit 的颜色一致。使用的是实色',
  },
  colorSplit: {
    name: '分割线颜色',
    description:
      '用于作为分割线的颜色，此颜色和 colorBorderSecondary 的颜色一致，但是用的是透明色',
  },

  colorBgLayout: {
    name: '布局背景色',
    description:
      '该色用于页面整体布局的背景色，只有布局组件才会使用该色，其余的使用场景理论上都是错误的。',
  },
  colorBgContainer: {
    name: '组件容器背景色',
    description:
      '组件的容器背景色，例如：默认按钮、输入框等。务必不要将其与 colorBgElevated 混淆。',
  },
  colorBgElevated: {
    name: '浮层容器背景色',
    description:
      '浮层容器背景色，在暗色模式下的该颜色会比 colorBgContainer 要亮一些。例如：模态框、弹出框、菜单等。',
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
    description:
      '三级填充色用于勾勒出元素形体的场景，如 Slider、Segmented 等。如无强调需求的情况下，建议使用三级填色作为默认填色。',
  },
  colorFillQuaternary: {
    name: '四级填充色',
    description:
      '最弱一级的填充色，适用于不易引起注意的色块，例如斑马纹、区分边界的色块等。',
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
