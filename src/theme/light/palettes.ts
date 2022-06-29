import { green, gold, red, blue } from '@ant-design/colors';
import { getAlphaColor, getSolidColor } from './colorAlgorithm';
import type { BgPalettes, TextAlphaPalettes } from '../IPalettes';

export const successPalettes = {
  1: green[0],
  3: green[2],
  6: green[5],
};

export const warningPalettes = {
  1: gold[0],
  3: gold[2],
  6: gold[5],
};

export const errorPalettes = {
  1: red[0],
  3: red[2],
  6: red[5],
};

// FIXME: 主色在暗色模式下的应用很有问题需要收敛
export const primaryPalettes = {
  0: blue[1],
  1: blue[0],
  2: blue[1], // Slider 的 focus 态用的是 2
  3: blue[2],
  4: blue[3], // Slider 的 hover 态用的是 4
  5: blue[4],
  6: blue[5],
  7: blue[6],
};

const bgBaseColor = '#fff';
const textBaseColor = '#000';

// TODO： 需要定义这些色值下面的色板含义
export const bgPalettes: BgPalettes = {
  // 斑马纹
  'light-2': getSolidColor(bgBaseColor, 2),
  // 禁用的特殊用色 理论上需要去掉
  'light-10': getSolidColor(bgBaseColor, 10),
  // 描边色序列
  26: getSolidColor(bgBaseColor, 15),
  19: getSolidColor(bgBaseColor, 6),
  // 背景色序列
  'light-12': getSolidColor(bgBaseColor, 12),
  15: getSolidColor(bgBaseColor, 4),
  12: getSolidColor(bgBaseColor, 0),
  8: getSolidColor(bgBaseColor, 0),
  0: getSolidColor(bgBaseColor, 4),
};

// TODO： 需要定义这些色值下面的色板含义
export const textAlphaPalettes: TextAlphaPalettes = {
  85: getAlphaColor(textBaseColor, 0.85),
  'light-75': getAlphaColor(textBaseColor, 0.75), // 目前只有 Popover 用了
  65: getAlphaColor(textBaseColor, 0.65), // 目前只有 Segment Label 用了
  45: getAlphaColor(textBaseColor, 0.45),
  30: getAlphaColor(textBaseColor, 0.25),
  25: getAlphaColor(textBaseColor, 0.25),
  // 从 12 往下基本上就是偏背景和装饰性元素了
  12: getAlphaColor(textBaseColor, 0.06), // 主要是 Split
  8: getAlphaColor(textBaseColor, 0.04),
  4: getAlphaColor(textBaseColor, 0.02),
  3: getAlphaColor(textBaseColor, 0.03),
};
