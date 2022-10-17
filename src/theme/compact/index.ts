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
      // FIXME: 左右间距不对
      Button: {
        // @btn-padding-horizontal-base: 12 -1px;
        // @btn-padding-horizontal-lg: @btn-padding-horizontal-base;
        // @btn-padding-horizontal-sm: 8 - 1px;
        // @btn-square-only-icon-size-lg: 16px;
        // @btn-square-only-icon-size: 14px;
        // @btn-square-only-icon-size-sm: 12px;
      },
      Breadcrumb: {
        fontSizeIcon: fontSizeBase,
      },
      // FIXME：由于 antd v5 设计改了，紧凑的也要改
      Dropdown: {
        // 用 lineHeight 来控制每一项的高度
      },
      //  FIXME 分组item 的上下间距不对
      Menu: {
        // @menu-inline-toplevel-item-height: 32px;
        //   v4 是 8 ，现在是 4
        // FIXME：左右间距为12，现在是 8
        // @menu-item-padding: 0 12px;
        // FIXME 图标和文本之间的间距为8
        // @menu-icon-margin-right: 8px;
      },
      // FIXME gap 间距为 6
      Checkbox: {
        // @checkbox-group-item-margin-right: 6px;
      },
      // FIXME compact 上下 4 左右 8
      Tabs: {
        // @tabs-card-horizontal-padding: 4px @padding;
      },
      DatePicker: {
        // @picker-panel-cell-height: 22px;
        // @picker-panel-cell-width: 32px;
        // @picker-text-height: 32px;
        // @picker-time-panel-cell-height: 24px;
        // @picker-panel-without-time-cell-height: 48px;
      },
      // FIXME： 横向间距为 7px，现在为3px
      Tag: {},
      //FIXME : 看不太出来
      Select: {
        // @select-dropdown-height: @height-base;
        // @select-single-item-height-lg: 32px;
        // @select-multiple-item-height: @input-height-base - max(@input-padding-vertical-base, 4) * 2; // Normal 24px
        // @select-multiple-item-height-lg: 24px;
        // @select-multiple-item-spacing-half: 3px;
      },
      // FIXME 有 Bug
      Radio: {
        // 单项之间间距为6px，现在为8px
        //  @radio-wrapper-margin-right: 6px;
      },
      // FIXME 有明显的样式问题
      Switch: {
        // @switch-height: 20px;
        // @switch-sm-height: 14px;
        // @switch-min-width: 40px;
        // @switch-sm-min-width: 24px;
        // @switch-inner-margin-min: 4px;
        // @switch-inner-margin-max: 22px;
      },
      // FIXME 高度大小不对
      Slider: {
        // @slider-handle-size: 12px;
        // @slider-handle-margin-top: -4px;
      },
      Rate: {
        //  TODO: 实现上用了 fontSize + 4 感觉不合理
      },
      Progress: {
        //  TODO: 实现上用了 fontSize = 24 ，似乎是 fontSize + 10 ？
        // compact 需要 20 和 16
        // default 需要 24 和 18
        // @progress-circle-text-font-size: 0.833333em;
      },
      Message: {
        // FIXME
        //  @message-notice-content-padding: 8px 16px;
      },
      // FIXME：底部间距不对，padding 8px
      Modal: {
        // 检查下带线版本是否正确
        //  @modal-header-padding-vertical: 11px;
        // @modal-header-padding: @modal-header-padding-vertical @modal-header-padding-horizontal;
        // @modal-footer-padding-vertical: @padding-sm;
        // @modal-header-close-size: @modal-header-title-line-height + 2 * @modal-header-padding-vertical;
        // @modal-confirm-body-padding: 24px 24px 16px;
      },
      // FIXME: 原来的实现有点问题
      Transfer: {
        // FIXME: 头部高度应该为 36 px
        // @transfer-header-height: 36px;
        // FIXME: SEARCH 图标和文本中间应该要有间距
      },
      // FIXME： item 内部间距问题
      Collapse: {
        // @collapse-content-padding: 8px 16px;
      },
      // FIXME 左右两边间距
      List: {
        //  @list-item-padding-sm: 4px 12px;
        //  @list-item-padding-lg: 12px 16px;
      },
      // FIXME 和 Token 无关的纵向样式问题
      Steps: {},
      //FIXME: 字体大小不对
      Avatar: {
        // @avatar-font-size-base: 16px;
        // @avatar-font-size-lg: 20px;
      },
      // FIXME: 上下12px 现在是 20px
      Notification: {
        //  @notification-padding-vertical: 12px;
      },
      // FIXME: 上下 4px 左边 16px
      Anchor: {
        // @anchor-link-padding: 4px 0 4px 16px;
      },
      // FIXME: 左右两边间距12px
      // 带线版本最小高度28px
      Popover: {},
      // FIXME: padding 16px 12px
      Alert: {},

      // FIXME: Card 内间距 为 12px
      Card: {
        //  @card-padding-base: 12px;
        // @card-padding-base-sm: @card-padding-base;
        // @card-head-height-sm: 30px;
        // @card-head-padding-sm: 6px;
        // @card-actions-li-margin: 4px 0;
        // @card-head-tabs-margin-bottom: -9px;
      },
      // FIXME: Padding 12 8
      Table: {
        //  @table-padding-vertical: 12px;
        // @table-padding-horizontal: 8px;
        // @table-padding-vertical-md: 8px;
        // @table-padding-horizontal-md: 8px;
        // @table-padding-vertical-sm: 4px;
        // @table-padding-horizontal-sm: 4px;
      },
    },
  };
};
