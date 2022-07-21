import type { MapToken, SeedToken } from 'antd/es/theme/interface';
import type { AliasToken } from '../interface';

type SeedRelatedMap = {
  [key in keyof SeedToken]?: (keyof MapToken)[];
};

type SeedRelatedAlias = {
  [key in keyof SeedToken]?: (keyof AliasToken)[];
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
    'colorTextLightSolid',
    'colorTextLabel',
    'colorTextDisabled',
    'colorTextSecondary',
    'colorTextHeading',
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
};
