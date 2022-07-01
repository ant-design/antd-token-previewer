import type { ThemeConfig } from 'antd/es/config-provider/context';
import type { TokenEntity } from '../interface';
import isColor from './isColor';

function obj2Arr(
  obj: Record<string, string | number>,
  src: string,
): TokenEntity[] {
  return Object.entries(obj).map(([key, value]) => ({
    name: key,
    token: key,
    value,
    type: typeof value === 'string' && isColor(value) ? 'color' : typeof value,
    description: key,
    source: src,
  }));
}

export function convertTokenConfigToArr(config: ThemeConfig): TokenEntity[] {
  return [
    ...obj2Arr(config.token ?? {}, 'seed'),
    ...Object.entries(config.override ?? {}).reduce<TokenEntity[]>(
      (result, [key, value]) => {
        return result.concat(obj2Arr(value as any, key));
      },
      [],
    ),
  ];
}

export function convertTokenArrToConfig(arr: TokenEntity[]): ThemeConfig {
  const config: ThemeConfig = {};
  arr.forEach((item) => {
    if (item.source === 'seed') {
      if (!config.token) {
        config.token = {};
      }
      (config.token as any)[item.token] = item.value;
    } else {
      if (!config.override) {
        config.override = {};
      }
      if (!(config.override as any)[item.source]) {
        (config.override as any)[item.source] = {};
      }
      ((config.override as any)[item.source] as any)[item.token] = item.value;
    }
  });
  return config;
}
