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
  0: '#0e161f', // TODO： Transfer 的 hover 态用的 0,感觉要改
  1: blue[0],
  2: blue[1], // Slider 的 focus 态用的是 2
  3: blue[2],
  4: blue[3], // Slider 的 hover 态用的是 4
  5: blue[4],
  6: blue[5],
  7: blue[7],
};

// FIXME: 主色在暗色模式下的应用很有问题需要收敛
export const primaryPalettes = {
  0: '#0e161f', // TODO： Transfer 的 hover 态用的 0,感觉要改
  1: '#111b26',
  2: '#4697e3', // Slider 的 focus 态用的是 2
  3: '#153450',
  4: '#177ddc', // Slider 的 hover 态用的是 4
  5: '#165996',
  6: colorPalettes['blue-6'],
  7: '#388ed3',
};

const bgBaseColor = '#000';
const textBaseColor = '#fff';

// const darkBaseColor = 'hsl(220,20%,0%)';

// const lightBaseColor = 'hsl(220,20%,100%)';

// 一组尝试自定义风格的暗色主题
// export const darkPalettes = {
//   26: 'hsl(218,5%,27%)',
//   19: 'hsl(218,5%,15%)',
//   15: 'hsl(220,11%,27%)',
//   12: 'hsl(220,11%,22%)',
//   8: 'hsl(220,13%,18%)',
//   0: 'hsl(216,13%,15%)',
// };

// TODO： 需要定义这些色值下面的色板含义
export const bgPalettes: BgPalettes = {
  26: getSolidColor(bgBaseColor, 26),
  19: getSolidColor(bgBaseColor, 19),
  15: getSolidColor(bgBaseColor, 15),
  12: getSolidColor(bgBaseColor, 12),
  8: getSolidColor(bgBaseColor, 8),
  0: getSolidColor(bgBaseColor, 0),
};

// TODO： 需要定义这些色值下面的色板含义
export const textAlphaPalettes: TextAlphaPalettes = {
  85: getAlphaColor(textBaseColor, 0.85),
  75: getAlphaColor(textBaseColor, 0.75), // 目前只有 Color Action 用了
  65: getAlphaColor(textBaseColor, 0.65), // 目前只有 Segment Label 用了
  45: getAlphaColor(textBaseColor, 0.45),
  30: getAlphaColor(textBaseColor, 0.3),
  25: getAlphaColor(textBaseColor, 0.25),
  // 从 12 往下基本上就是偏背景和装饰性元素了
  12: getAlphaColor(textBaseColor, 0.12),
  8: getAlphaColor(textBaseColor, 0.08),
  4: getAlphaColor(textBaseColor, 0.04),
  3: getAlphaColor(textBaseColor, 0.03),
};
