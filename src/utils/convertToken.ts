import type { ThemeConfig } from 'antd/es/config-provider/context';
import type { TokenEntity, TokenValue } from '../interface';
import { tokenMeta } from '../meta';
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
  obj: Record<string, TokenValue>,
  meta: TokenMetaMap,
): KitchenToken[] {
  return Object.entries(obj).map(([key, value]) => ({
    id: key,
    name: tokenMeta[key].name,
    searchKey: '',
    groupName: '',
    sort: 0,
    type: 'token',
    content: {
      type: isColor(value) ? 'color' : 'number',
    },
  }));
}

export function convertTokenConfigToArr(
  config: ThemeConfig,
  meta: TokenMetaMap,
): KitchenToken[] {
  return [
    ...obj2Arr((config.token ?? {}) as any, 'seed'),
    ...Object.entries(config.components ?? {}).reduce<TokenEntity[]>(
      (result, [key, value]) => {
        return result.concat(obj2Arr(value as any, key));
      },
      [],
    ),
  ];
}
