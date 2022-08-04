import type { MapToken, SeedToken } from 'antd/es/theme/interface';
import seedToken from 'antd/es/theme/themes/seed';
import defaultMap from 'antd/es/theme/themes/default';
import formatToken from 'antd/es/theme/util/alias';
import type { AliasToken } from 'antd/es/theme/interface';

export type PureAliasToken = Omit<AliasToken, keyof MapToken>;

type SeedRelatedMap = {
  [key in keyof SeedToken]?: (keyof MapToken)[];
};

type SeedRelatedAlias = {
  [key in keyof SeedToken]?: (keyof PureAliasToken)[];
};

type MapRelatedAlias = {
  [key in keyof MapToken]?: (keyof PureAliasToken)[];
};

export const seedRelatedMap: SeedRelatedMap = {
  colorPrimary: [
    'colorPrimaryBg',
    'colorPrimaryBgHover',
    'colorPrimaryBorder',
    'colorPrimaryBorderHover',
    'colorPrimaryHover',
    'colorPrimary',
    'colorPrimaryActive',
    'colorPrimaryTextHover',
    'colorPrimaryText',
    'colorPrimaryTextActive',
  ],
  colorError: [
    'colorErrorBg',
    'colorErrorBgHover',
    'colorErrorBorder',
    'colorErrorBorderHover',
    'colorErrorHover',
    'colorError',
    'colorErrorActive',
    'colorErrorTextHover',
    'colorErrorText',
    'colorErrorTextActive',
  ],
  colorWarning: [
    'colorWarningBg',
    'colorWarningBgHover',
    'colorWarningBorder',
    'colorWarningBorderHover',
    'colorWarningHover',
    'colorWarning',
    'colorWarningActive',
    'colorWarningTextHover',
    'colorWarningText',
    'colorWarningTextActive',
  ],
  colorSuccess: [
    'colorSuccessBg',
    'colorSuccessBgHover',
    'colorSuccessBorder',
    'colorSuccessBorderHover',
    'colorSuccessHover',
    'colorSuccess',
    'colorSuccessActive',
    'colorSuccessTextHover',
    'colorSuccessText',
    'colorSuccessTextActive',
  ],
  colorInfo: [
    'colorInfoBg',
    'colorInfoBgHover',
    'colorInfoBorder',
    'colorInfoBorderHover',
    'colorInfoHover',
    'colorInfo',
    'colorInfoActive',
    'colorInfoTextHover',
    'colorInfoText',
    'colorInfoTextActive',
  ],
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
    'colorBorder',
    'colorBorderSecondary',
    'colorSplit',
    'colorFill',
    'colorFillSecondary',
    'colorFillTertiary',
    'colorFillQuaternary',
  ],
};

const getMapRelatedAlias = () => {
  const mapRelatedAlias: any = {};
  const mapFn = defaultMap;
  const mapToken = mapFn({ ...seedToken });
  const aliasToken = formatToken(mapToken);
  Object.keys(mapToken).forEach((mapKey) => {
    delete (aliasToken as any)[mapKey];
  });

  Object.keys(mapToken).forEach((mapKey) => {
    const newAlias = formatToken({ ...mapToken, [mapKey]: 'changed' });
    Object.keys(aliasToken).forEach((aliasKey) => {
      if ((aliasToken as any)[aliasKey] !== (newAlias as any)[aliasKey]) {
        if (!mapRelatedAlias[mapKey]) {
          mapRelatedAlias[mapKey] = [];
        }
        mapRelatedAlias[mapKey].push(aliasKey);
      }
    });
    mapRelatedAlias[mapKey] = mapRelatedAlias[mapKey]?.sort();
  });

  return mapRelatedAlias;
};

export const mapRelatedAlias: MapRelatedAlias = getMapRelatedAlias();

const getSeedRelatedAlias = (): SeedRelatedAlias => {
  const result: SeedRelatedAlias = {};
  Object.keys(seedToken).forEach((key) => {
    const seedKey = key as keyof SeedToken;
    const arr = ['colorTextBg', 'colorBgBase'].includes(seedKey)
      ? []
      : mapRelatedAlias[seedKey] || [];
    seedRelatedMap[seedKey]?.forEach((mapKey) => {
      arr.push(...(mapRelatedAlias[mapKey] ?? []));
    });
    if (arr.length) {
      (result as any)[key] = Array.from(new Set(arr)).sort();
    }
  });
  return result;
};

export const seedRelatedAlias = getSeedRelatedAlias();
