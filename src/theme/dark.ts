import type { GlobalToken } from '@madccc/antd/es/_util/theme/interface';
import type { OverrideToken } from '@madccc/antd/es/_util/theme/interface';
import type { DeepPartial } from 'utility-types';

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

const darkBaseColor = '#000';
const lightBaseColor = '#fff';

const darkPalettes = {
  30: getSolidColor(darkBaseColor, 30),
  26: getSolidColor(darkBaseColor, 26),
  19: getSolidColor(darkBaseColor, 19),
  15: getSolidColor(darkBaseColor, 15),
  12: getSolidColor(darkBaseColor, 12),
  8: getSolidColor(darkBaseColor, 8),
  0: getSolidColor(darkBaseColor, 0),
};

const whiteAlphaPalettes = {
  100: getAlphaColor(lightBaseColor, 1),
  85: getAlphaColor(lightBaseColor, 0.85),
  75: getAlphaColor(lightBaseColor, 0.75),
  45: getAlphaColor(lightBaseColor, 0.45),
  30: getAlphaColor(lightBaseColor, 0.3),
  25: getAlphaColor(lightBaseColor, 0.25),
  //
  12: getAlphaColor(lightBaseColor, 0.12),
  8: getAlphaColor(lightBaseColor, 0.08),
  4: getAlphaColor(lightBaseColor, 0.04),
  3: getAlphaColor(lightBaseColor, 0.03),
};

// 全局 Alias Token
export const darkAliasToken: Partial<GlobalToken> = {
  // ============== 基础公用  ============== //

  colorPrimary: primaryPalettes['6'],
  colorPrimaryHover: primaryPalettes['5'],
  colorPrimaryActive: primaryPalettes['7'],

  colorPrimarySecondary: primaryPalettes['3'],

  colorInfo: primaryPalettes['6'],

  colorLink: primaryPalettes['6'],
  colorLinkHover: primaryPalettes['5'],
  colorLinkActive: primaryPalettes['7'],

  // FIXME： `命名不对，这个用在 Button 的阴影上 干点
  // 且亮色模式用值也不对，应该是不透明度的用法
  colorDefaultOutline: whiteAlphaPalettes['4'],
  // ============== 背景  ============== //
  // FIXME: Avatar 用了这个颜色，感觉效果不对
  colorBg: darkPalettes['0'],

  // FIXME： Slider 用了，明显不对 色值应该为 darkPalettes['15']
  // colorBgContainer: darkPalettes['15'],
  // @background-color-base -> colorBgContainer
  // @body-background -> colorBgContainer
  colorBgContainer: darkPalettes['0'],
  // FIXME: 只有 Slider 用了，感觉命名有问题
  colorBgContainerSecondary: darkPalettes['26'],
  // @background-color-base -> colorBgComponent
  colorBgComponent: darkPalettes['8'],
  // FIXME：Menu 用了 感觉命名有问题
  // TODO：能不能用透明色？用透明色会造成重叠后变亮的问题，是不是得用实色？
  colorBgComponentSecondary: whiteAlphaPalettes['4'],
  // @disabled-bg -> colorBgComponentDisabled
  // 确认是透明还是实色,试了下透明可能更好
  colorBgComponentDisabled: whiteAlphaPalettes['8'],

  // FIXME: 需要改名称，现在只给 tooltips 用了
  colorBgContainerWeak: darkPalettes['26'],

  // 下面这个 token 是 浮窗等组件的背景色 token
  // FIXME：@popover-background -> colorBgElevated
  // colorBgElevated: darkPalettes['12'];
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
  // TODO: 这个 30 估计要改成 25
  // FIXME： 现在 input 的 clear-icon 用了这个，是不对的。但颜色是对的
  colorTextDisabled: whiteAlphaPalettes['30'],
  colorPlaceholder: whiteAlphaPalettes['25'],

  colorAction: whiteAlphaPalettes['45'],
  // @icon-color-hover -> colorActionHover
  // 用在 draw、modal 的按钮 hover 色
  colorActionHover: whiteAlphaPalettes['75'],

  // ============== Control Token  ============== //
  controlItemBgActive: primaryPalettes['1'],
  // TODO: 确认下 hover 是用 Alpha 还是实色
  // 暂时确认下来应该用 alpha
  controlItemBgHover: whiteAlphaPalettes['8'],

  // FIXME:  @text-color-inverse -> colorTextLightSolid
};

export const darkComponentToken: DeepPartial<OverrideToken> = {
  Button: {
    colorBgTextHover: whiteAlphaPalettes['3'],
    colorBgTextActive: whiteAlphaPalettes['4'],
  },
};
