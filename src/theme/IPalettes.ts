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

export interface TextAlphaPalettes {
  85: string;
  75: string;
  65: string;
  45: string;
  30: string;
  25: string;
  // FIXME: 只有 Popover 用了
  'light-75'?: string;

  // 从 12 往下基本上就是偏背景和装饰性元素了
  12: string;
  8: string;
  4: string;
  3: string;
}
export interface BgPalettes {
  26: string;
  19: string;
  15: string;
  12: string;
  8: string;
  0: string;
  // FIXME: 亮色需要额外增加的色彩序列
  'light-12'?: string;
  'light-2'?: string;
  'light-10'?: string;
}
