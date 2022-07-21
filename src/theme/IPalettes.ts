export interface PrimaryPalettes {
  0: string;
  1: string;
  2: string;
  3: string;
  4: string;
  5: string;
  6: string;
  7: string;
}

export interface SuccessPalettes {
  1: string;
  3: string;
  6: string;
}

export interface WarningPalettes {
  1: string;
  3: string;
  6: string;
}
export interface ErrorPalettes {
  1: string;
  3: string;
  6: string;
}

export interface TextMapToken {
  colorText: string;
  colorTextSecondary: string;
  colorTextTertiary: string;
  colorTextQuaternary: string;
}

export interface BgMapToken {
  // 作为比较重的描边或者填充内容
  colorFill: string;
  // 表达 选中态，或者作为弱一级的实色 border
  colorFillSecondary: string;

  // 另外一种 hover 色 或者禁用的背景色
  // 用于表达选中态或用于与区分 BgComponent 区分
  colorFillTertiary: string;

  colorFillQuaternary: string;

  // 0 是 base 模式
  colorBgLayout: string;
  // Container 类型
  // 8 是卡片容器底色
  colorBgContainer: string;
  // 12 是 elevated 模式
  colorBgElevated: string;
  /**
   * 用于吸引注意力
   */
  colorBgSpotlight?: string;
}
