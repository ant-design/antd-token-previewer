import type { ThemeConfig } from 'antd/es/config-provider/context';
import type { TokenMetaMap } from '../meta/interface';
import isColor from './isColor';

export interface KitchenToken {
  id: string;
  name: string;
  searchKey: string;
  groupName: string;
  sort: number;
  type: 'token';
  content: {
    type: string;
    value: string | number | boolean;
    token: string;
    description: string;
    source: string;
  };
}

function obj2Arr(
  obj: Record<string, string | number | boolean>,
  meta: TokenMetaMap,
  options?: { source?: string },
): KitchenToken[] {
  return Object.entries(obj).map(([key, value]) => ({
    id: key,
    name: meta[key]?.name || key,
    searchKey: '',
    groupName: '',
    sort: 0,
    type: 'token',
    content: {
      type:
        typeof value === 'string' && isColor(value) ? 'color' : typeof value,
      value,
      token: key,
      description: meta[key]?.desc || '',
      source: options?.source ?? meta[key]?.source ?? 'seed',
    },
  }));
}

export function convertTokenConfigToArr(
  config: ThemeConfig,
  meta: TokenMetaMap,
): KitchenToken[] {
  return [
    ...obj2Arr((config.token ?? {}) as any, meta),
    ...Object.entries(config.components ?? {}).reduce<KitchenToken[]>(
      (result, [key, value]) => {
        return result.concat(obj2Arr(value as any, meta, { source: key }));
      },
      [],
    ),
  ];
}
