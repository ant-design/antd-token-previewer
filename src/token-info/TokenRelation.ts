import type { SeedToken } from 'antd/es/theme/interface';
import type { PureAliasToken, PureMapToken } from '../hooks/useTokenLayer';

type SeedRelatedMap = {
  [key in keyof SeedToken]?: (keyof PureMapToken)[];
};

type SeedRelatedAlias = {
  [key in keyof SeedToken]?: (keyof PureAliasToken)[];
};

export const seedRelatedMap: SeedRelatedMap = {
  colorPrimary: [
    'colorPrimaryBg',
    'colorPrimaryBgHover',
    'colorPrimaryOutline',
    'colorPrimaryBorder',
    'colorPrimaryBorderHover',
    'colorPrimaryHover',
    'colorPrimaryActive',
    'colorLink',
    'colorLinkHover',
    'colorLinkActive',
  ],
  colorError: [
    'colorErrorBg',
    'colorErrorOutline',
    'colorErrorBorder',
    'colorErrorHover',
    'colorErrorActive',
  ],
  colorWarning: [
    'colorWarningBg',
    'colorWarningBorder',
    'colorWarningActive',
    'colorWarningHover',
    'colorWarningOutline',
  ],
  colorSuccess: ['colorSuccessBg', 'colorSuccessBorder'],
  colorInfo: ['colorInfoBg', 'colorInfoBorder'],
  colorTextBase: [
    'colorText',
    'colorTextLabel',
    'colorTextDisabled',
    'colorTextSecondary',
    'colorTextHeading',
    'colorAction',
    'colorActionHover',
  ],
  colorBgBase: [
    'colorBgContainer',
    'colorBgContainerDisabled',
    'colorBgContainerSecondary',
    'colorBgElevated',
    'colorBgLayout',
    'colorBgContent',
    'colorBgItemHover',
    'colorBgFillTmp',
    'colorBgTooltipTmp',
    'colorBgMask',
    'colorBgContentHover',
  ],
};

export const seedRelatedAlias: SeedRelatedAlias = {
  colorPrimary: ['controlItemBgActive', 'controlItemBgActiveHover'],
  colorError: ['colorHighlight'],
  colorTextBase: ['colorTextPlaceholder', 'controlItemBgActiveDisabled'],
  colorBgBase: ['controlItemBgHover'],
};
