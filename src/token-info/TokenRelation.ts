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
    'colorPrimaryBorder',
    'colorPrimaryBorderHover',
    'colorPrimaryHover',
    'colorPrimaryActive',
    'colorPrimaryText',
    'colorPrimaryTextHover',
  ],
  colorError: [
    'colorErrorBg',
    'colorErrorBorder',
    'colorErrorHover',
    'colorErrorActive',
  ],
  colorWarning: [
    'colorWarningBg',
    'colorWarningBorder',
    'colorWarningActive',
    'colorWarningHover',
  ],
  colorSuccess: ['colorSuccessBg', 'colorSuccessBorder'],
  colorInfo: ['colorInfoBg', 'colorInfoBorder'],
  colorTextBase: [
    'colorText',
    'colorTextSecondary',
    'colorTextTertiary',
    'colorTextQuaternary',
  ],
  colorBgBase: [
    'colorBgContainer',
    'colorBgElevated',
    'colorBgLayout',
    'colorFill',
    'colorFillSecondary',
    'colorFillTertiary',
    'colorFillQuaternary',
  ],
};

export const seedRelatedAlias: SeedRelatedAlias = {
  colorPrimary: [
    'controlItemBgActive',
    'controlItemBgActiveHover',
    'controlOutline',
    'colorLink',
    'colorLinkHover',
    'colorLinkActive',
  ],
  colorError: ['colorHighlight', 'colorErrorOutline'],
  colorWarning: ['colorWarningOutline'],
  colorTextBase: [
    'colorTextPlaceholder',
    'controlItemBgActiveDisabled',
    'colorTextLabel',
    'colorTextDisabled',
    'colorTextHeading',
    'colorIcon',
    'colorIconHover',
    'colorBgMask',
    'colorBgSpotlight',
  ],
  colorBgBase: [
    'controlItemBgHover',
    'colorBgContainerDisabled',
    'colorFillAlter',
    'colorFillContent',
    'colorFillContentHover',
  ],
};
