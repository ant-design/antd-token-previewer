import type { GlobalToken } from '@madccc/antd/es/theme/interface';
import type { OverrideToken } from '@madccc/antd/es/theme/interface';
import type {
  SuccessPalettes,
  PrimaryPalettes,
  ErrorPalettes,
  WarningPalettes,
  TextAlphaPalettes,
  BgPalettes,
} from './IPalettes';

interface PaletteSheets {
  primaryPalettes: PrimaryPalettes;
  successPalettes: SuccessPalettes;
  errorPalettes: ErrorPalettes;
  warningPalettes: WarningPalettes;
  textAlphaPalettes: TextAlphaPalettes;
  bgPalettes: BgPalettes;
}

// 全局 Alias Token
const genAliasToken = ({
  primaryPalettes,
  successPalettes,
  errorPalettes,
  warningPalettes,
  textAlphaPalettes,
  bgPalettes,
}: PaletteSheets): Partial<GlobalToken> => ({
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

  colorBgLayout: bgPalettes['0'],
  // 这个 token 是 浮窗等组件的背景色 token
  colorBgElevated: bgPalettes['12'],

  colorBgContainer: bgPalettes['8'],
  // TODO 这一个是斑马线的效果
  colorBgContainerSecondary: textAlphaPalettes['4'],
  colorBgContainerDisabled: textAlphaPalettes['8'],

  colorBgContent: bgPalettes['15'],
  colorBgContentHover: bgPalettes['26'],

  // ============== 分割线  ============== //
  colorBorder: bgPalettes['26'],
  // TODO：Secondary 在纯实色背景下的颜色和 Split 是一样的
  colorBorderSecondary: bgPalettes['19'],
  colorSplit: textAlphaPalettes['12'],

  // ============== 文本  ============== //
  colorText: textAlphaPalettes['85'],
  colorTextHeading: textAlphaPalettes['85'],
  colorTextSecondary: textAlphaPalettes['45'],
  //  @disabled-color -> colorTextDisabled
  colorTextDisabled: textAlphaPalettes['25'],
  colorTextPlaceholder: textAlphaPalettes['25'],

  colorAction: textAlphaPalettes['45'],
  // @icon-color-hover -> colorActionHover
  // 用在 draw、modal 的按钮 hover 色
  colorActionHover: textAlphaPalettes['85'],

  // ============== Control Token  ============== //
  // TODO: 确认下 hover 是用 Alpha 还是实色
  // 暂时确认下来应该用 alpha
  controlItemBgHover: textAlphaPalettes['8'],

  controlItemBgActive: primaryPalettes['1'],
  controlItemBgActiveDisabled: textAlphaPalettes['25'],
  // TODO: 需要在设计上确认暗色模式的交互逻辑。现在是hover以后就变暗，很怪
  controlItemBgActiveHover: primaryPalettes['0'],
});

const genComponentToken = ({
  textAlphaPalettes,
  bgPalettes,
}: Pick<PaletteSheets, 'textAlphaPalettes' | 'bgPalettes'>): OverrideToken => ({
  Button: {
    colorBgTextHover: textAlphaPalettes['3'],
    colorBgTextActive: textAlphaPalettes['4'],
  },
  // TODO: Segmented 样式逻辑设计的不统一
  Segmented: {
    bgColor: 'rgba(0,0,0,0.25)',
    bgColorHover: 'rgba(0,0,0,0.45)',
    bgColorSelected: bgPalettes['19'],
  },
  Skeleton: {
    color: textAlphaPalettes['12'],
    colorGradientEnd: textAlphaPalettes['25'],
  },
  // TODO：整体考虑优化下禁用的效果
  // 要用 whiteAlphaPalettes['25']
  Pagination: {},
  Rate: { defaultColor: textAlphaPalettes['12'] },
  Radio: {},
  Calendar: {},
  Avatar: {
    bgColor: textAlphaPalettes['25'],
    groupBorderColor: bgPalettes['0'],
  },
  // FIXME：TimePicker 的 now 要用 antd 自己的 link

  Table: {
    // TODO: 激活样式该不该用实色？还是不透明的用法？
    headerSortActiveBgColor: bgPalettes['15'],
    headerHoverBgColor: textAlphaPalettes['12'],
  },
  Tooltip: {
    colorBgDefault: bgPalettes['26'],
  },
});

export { genAliasToken, genComponentToken };
