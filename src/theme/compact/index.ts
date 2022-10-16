import { ThemeConfig } from 'antd/es/config-provider/context';

export const compactTheme: () => ThemeConfig = () => {
  const fontSizeBase = 12;
  return {
    token: {
      fontSizeBase,
      paddingLG: 16,
      padding: 8,
      paddingSM: 8,
      paddingXS: 4,
      paddingXXS: 0,
      // control
      controlPaddingHorizontal: 8,
      controlPaddingHorizontalSM: 4,

      marginLG: 16,
      margin: 8,
      marginSM: 8,
      marginXL: 4,
      marginXXS: 0,
      controlHeight: 28,
      controlHeightLG: 32,
      controlHeightSM: 22,
    },
    components: {
      Button: {
        // @btn-padding-horizontal-base: 12 -1px;
        // @btn-padding-horizontal-lg: @btn-padding-horizontal-base;
        // @btn-padding-horizontal-sm: 8 - 1px;
        // @btn-square-only-icon-size-lg: 16px;
        // @btn-square-only-icon-size: 14px;

        // TODO: 针对仅图标的场景需要补充 token
        fontSizeIcon: 14,
        // @btn-square-only-icon-size-sm: 12px;
      },
      Breadcrumb: {
        fontSizeIcon: fontSizeBase,
      },
      // FIXME：由于 antd v5 设计改了，紧凑的也要改
      Dropdown: {
        // 用 lineHeight 来控制每一项的高度
      },
      Checkbox: {
        // FIXME gap 间距为 6
        // @checkbox-group-item-margin-right: 6px;
      },
      // FIXME compact 上下 4 左右 8
      Tabs: {
        // @tabs-card-horizontal-padding: 4px @padding;
      },
      // FIXME： 横向间距为 7px，现在为3px
      Tag: {},
      Rate: {
        //  FIXME: 实现上用了 fontSize + 4 不合理
      },
      //  FIXME: 实现上用了 fontSize =24 ，似乎是 fontSize + 10 ？
      // compact 需要 20 和 16
      // default 需要 24 和 18
      // @progress-circle-text-font-size: 0.833333em;
      Progress: {},
    },
  };
};
