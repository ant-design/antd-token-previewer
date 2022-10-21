import type { ThemeConfig } from 'antd/es/config-provider/context';
import type { TokenMetaMap, TokenTree } from '../meta/interface';
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
  category: TokenTree,
  options?: { source?: string },
): KitchenToken[] {
  return Object.entries(obj).map(([key, value]) => {
    const searchKey: string[] = [];
    const groupName: string[] = [];
    category.forEach((item) => {
      item.groups.forEach((group) => {
        if (
          group.seedToken.includes(key) ||
          group.mapToken?.includes(key) ||
          group.aliasToken?.includes(key)
        ) {
          searchKey.push(item.name);
          searchKey.push(item.nameEn);
          searchKey.push(group.name);
          searchKey.push(group.nameEn);
          groupName.push(item.name);
          groupName.push(group.name);
        }
      });
    });

    return {
      id: key,
      name: meta[key]?.name || key,
      searchKey: searchKey.filter((item) => item).join('/'),
      groupName: groupName.filter((item) => item).join('/'),
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
    };
  });
}

export function convertTokenConfigToArr(
  config: ThemeConfig,
  meta: TokenMetaMap,
  category: TokenTree,
): KitchenToken[] {
  return [
    ...obj2Arr((config.token ?? {}) as any, meta, category),
    ...Object.entries(config.components ?? {}).reduce<KitchenToken[]>(
      (result, [key, value]) => {
        return result.concat(
          obj2Arr(value as any, meta, category, { source: key }),
        );
      },
      [],
    ),
  ];
}
