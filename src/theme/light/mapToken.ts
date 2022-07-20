import { green, gold, red, blue } from '@ant-design/colors';
import { getAlphaColor, getSolidColor } from './colorAlgorithm';
import type { BgMapToken, TextMapToken } from '../IPalettes';

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

export const bgMapToken: BgMapToken = {
  colorFill: getAlphaColor(textBaseColor, 0.06),
  colorFillSecondary: getAlphaColor(textBaseColor, 0.04),
  colorFillTertiary: getAlphaColor(textBaseColor, 0.03),
  colorFillQuaternary: getAlphaColor(textBaseColor, 0.02),

  //
  colorBgLayout: getSolidColor(bgBaseColor, 4),
  colorBgContainer: getSolidColor(bgBaseColor, 0),
  colorBgElevated: getSolidColor(bgBaseColor, 0),
};

export const textMapToken: TextMapToken = {
  colorText: getAlphaColor(textBaseColor, 0.85),
  colorTextSecondary: getAlphaColor(textBaseColor, 0.65), // 目前只有 Segment Label 用了
  colorTextTertiary: getAlphaColor(textBaseColor, 0.45),
  colorTextQuaternary: getAlphaColor(textBaseColor, 0.25),
};
