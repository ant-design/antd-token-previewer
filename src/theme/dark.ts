import type { GlobalToken } from '@madccc/antd/es/_util/theme/interface';
import type { OverrideToken } from '@madccc/antd/es/_util/theme/interface';

import tinycolor from 'tinycolor2';

const getAlphaColor = (baseColor: string, alpha: number) => {
  return tinycolor(baseColor).setAlpha(alpha).toRgbString();
};

const getSolidColor = (baseColor: string, brightness: number) => {
  const instance = tinycolor(baseColor);
  return instance.lighten(brightness).toHexString();
};

const primaryPalettes = {
  1: '#111b26',
  3: '#153450',
  5: '#165996',
  6: '#177ddc',
  7: '#388ed3',
};

const darkPalettes = {
  26: getSolidColor('#000', 26),
  19: getSolidColor('#000', 19),
  30: getSolidColor('#000', 30),
  8: getSolidColor('#000', 8),
  0: getSolidColor('#000', 0),
};

const whiteAlphaPalettes = {
  100: getAlphaColor('#fff', 1),
  85: getAlphaColor('#fff', 0.85),
  75: getAlphaColor('#fff', 0.75),
  45: getAlphaColor('#fff', 0.45),
  30: getAlphaColor('#fff', 0.3),
  12: getAlphaColor('#fff', 0.12),
  8: getAlphaColor('#fff', 0.08),
  4: getAlphaColor('#fff', 0.04),
};

// 全局 Alias Token
export const darkAliasToken: Partial<GlobalToken> = {
  // ============== 基础公用  ============== //

  colorPrimary: primaryPalettes['6'],
  colorPrimaryHover: primaryPalettes['5'],
  colorPrimaryActive: primaryPalettes['7'],

  colorPrimarySecondary: primaryPalettes['3'],

  colorInfo: primaryPalettes['6'],

  // FIXME： 命名不对，且亮色模式用值也不对。应该是不透明度的用法
  colorDefaultOutline: whiteAlphaPalettes['4'],
  // ============== 背景  ============== //
  // FIXME: Avatar 用了这个颜色，不对
  colorBg: darkPalettes['0'],
  // TODO: @background-color-base -> colorBgContainer
  // @body-background -> colorBgContainer
  colorBgContainer: darkPalettes['0'],
  // @background-color-base -> colorBgComponent
  colorBgComponent: darkPalettes['8'],
  // @disabled-bg -> colorBgComponentDisabled
  // TODO: 确认是 透明还是实色，试了下 实色可能更好？
  colorBgComponentDisabled: whiteAlphaPalettes['8'],

  // ============== 分割线  ============== //
  colorBorder: darkPalettes['26'],
  // TODO：Secondary 在纯实色背景下的颜色和 Split 是一样的
  // FIXME: Anchor 用了这个，是错的
  colorBorderSecondary: darkPalettes['19'],
  colorSplit: whiteAlphaPalettes['12'],
  // FIXME: 确认下 @popover-customize-border-color: #3a3a3a 的token去留
  //

  // ============== 文本  ============== //
  colorText: whiteAlphaPalettes['85'],
  colorTextHeading: whiteAlphaPalettes['85'],
  colorTextSecondary: whiteAlphaPalettes['45'],
  //  @disabled-color -> colorTextDisabled
  // FIXME: 这个 30 估计要改成 25
  colorTextDisabled: whiteAlphaPalettes['30'],

  // @icon-color-hover -> colorAction
  colorAction: whiteAlphaPalettes['75'],

  // ============== Control Token  ============== //
  controlItemBgActive: primaryPalettes['1'],
  // TODO: 确认下 hover是用 Alpha 还是实色
  // 暂时确认下来应该用 alpha
  controlItemBgHover: whiteAlphaPalettes['8'],

  // FIXME:  @text-color-inverse -> colorTextLightSolid
};

export const darkComponentToken: Partial<OverrideToken> = {};
