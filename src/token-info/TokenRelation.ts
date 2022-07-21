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
    'colorPrimary',
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
    'colorError',
    'colorErrorActive',
  ],
  colorWarning: [
    'colorWarningBg',
    'colorWarningBorder',
    'colorWarning',
    'colorWarningActive',
    'colorWarningHover',
    'colorWarningOutline',
  ],
  colorSuccess: ['colorSuccessBg', 'colorSuccessBorder', 'colorSuccess'],
  colorInfo: ['colorInfoBg', 'colorInfoBorder', 'colorInfo'],
  colorTextBase: ['colorText', 'colorTextLightSolid'],
  colorBgBase: ['colorBgContainer'],
};

export const seedRelatedAlias: SeedRelatedAlias = {
  colorPrimary: ['controlItemBgActive', 'controlItemBgActiveHover'],
  colorError: ['colorHighlight'],
};
