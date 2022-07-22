import type { GlobalToken } from 'antd/es/theme/interface';
import type { OverrideToken } from 'antd/es/theme/interface';
import type {
  SuccessPalettes,
  PrimaryPalettes,
  ErrorPalettes,
  WarningPalettes,
  TextMapToken,
  BgMapToken,
} from './IPalettes';

interface MapTokenSheets {
  primaryPalettes: PrimaryPalettes;
  successPalettes: SuccessPalettes;
  errorPalettes: ErrorPalettes;
  warningPalettes: WarningPalettes;
  textMapToken: TextMapToken;
  bgMapToken: BgMapToken;
}

// 全局 Alias Token
const genAliasToken = ({
  primaryPalettes,
  successPalettes,
  errorPalettes,
  warningPalettes,
  textMapToken,
  bgMapToken,
}: MapTokenSheets): Partial<GlobalToken> => ({
  // ============== 基础公用  ============== //

  colorPrimary: primaryPalettes['6'],
  colorPrimaryHover: primaryPalettes['5'],
  colorPrimaryActive: primaryPalettes['7'],
  // TODO: 建议改名为 colorPrimaryBorder
  colorPrimaryBorder: primaryPalettes['3'],
  colorPrimaryBorderHover: primaryPalettes['4'],

  colorSuccessBg: successPalettes['1'],
  colorSuccess: successPalettes['6'],
  colorSuccessBorder: successPalettes['3'],

  colorErrorBg: errorPalettes['1'],
  colorError: errorPalettes['6'],
  colorErrorBorder: errorPalettes['3'],

  colorWarningBg: warningPalettes['1'],
  colorWarning: warningPalettes['6'],
  colorWarningBorder: warningPalettes['3'],

  colorInfo: primaryPalettes['6'],
  colorInfoBg: primaryPalettes['1'],
  colorInfoBorder: primaryPalettes['3'],

  colorLink: primaryPalettes['6'],
  colorLinkHover: primaryPalettes['5'],
  colorLinkActive: primaryPalettes['7'],
  // ============== 背景  ============== //

  colorBgLayout: bgMapToken.colorBgLayout,
  // 这个 token 是 浮窗等组件的背景色 token
  colorBgElevated: bgMapToken.colorBgElevated,

  colorBgContainer: bgMapToken.colorBgContainer,

  // ============== 填色  ============== //
  // TODO 这一个是斑马线的效果
  colorFillAlter: bgMapToken.colorFillQuaternary,
  colorBgContainerDisabled: bgMapToken.colorFillTertiary,

  colorFillContentHover: bgMapToken.colorFill,

  // ============== 分割线  ============== //
  colorBorder: bgMapToken.colorFill,
  // TODO：Secondary 在纯实色背景下的颜色和 Split 是一样的
  colorBorderSecondary: bgMapToken.colorFillSecondary,
  colorSplit: bgMapToken.colorFillSecondary,

  // ============== 文本  ============== //
  colorText: textMapToken.colorText,
  colorTextHeading: textMapToken.colorText,
  colorTextSecondary: textMapToken.colorTextTertiary,
  colorTextDisabled: textMapToken.colorTextQuaternary,
  colorTextPlaceholder: textMapToken.colorTextQuaternary,

  colorIcon: textMapToken.colorTextTertiary,
  // @icon-color-hover -> colorIconHover
  // 用在 draw、modal 的按钮 hover 色
  colorIconHover: textMapToken.colorText,

  // ============== Control Token  ============== //
  // TODO: 确认下 hover 是用 Alpha 还是实色
  // 暂时确认下来应该用 alpha
  controlItemBgHover: bgMapToken.colorFillTertiary,

  controlItemBgActive: primaryPalettes['1'],
  controlItemBgActiveDisabled: bgMapToken.colorFill,
  // TODO: 需要在设计上确认暗色模式的交互逻辑。现在是hover以后就变暗，很怪
  controlItemBgActiveHover: primaryPalettes['0'],
});

const genComponentToken = ({
  textMapToken,
  bgMapToken,
}: Pick<MapTokenSheets, 'textMapToken' | 'bgMapToken'>): OverrideToken => ({
  Button: {
    colorBgTextHover: bgMapToken.colorFillQuaternary,
    colorBgTextActive: bgMapToken.colorFillTertiary,
  },
  // TODO: Segmented 样式逻辑设计的不统一
  Segmented: {
    bgColor: 'rgba(0,0,0,0.25)',
    bgColorHover: 'rgba(0,0,0,0.45)',
    bgColorSelected: bgMapToken.colorFillSecondary,
  },
  Skeleton: {
    color: bgMapToken.colorFillSecondary,
    colorGradientEnd: textMapToken.colorTextQuaternary,
  },
  Rate: { defaultColor: bgMapToken.colorFillSecondary },
  Avatar: {
    bgColor: textMapToken.colorTextQuaternary,
    groupBorderColor: bgMapToken.colorBgLayout,
  },
  Table: {
    // TODO: 激活样式该不该用实色？还是不透明的用法？
    headerSortActiveBgColor: bgMapToken.colorFillTertiary,
    headerHoverBgColor: bgMapToken.colorFillSecondary,
  },
  Tooltip: {
    colorBgDefault: bgMapToken.colorFill,
  },
});

export { genAliasToken, genComponentToken };
