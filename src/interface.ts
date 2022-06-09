import type { ThemeConfig } from '@madccc/antd/es/config-provider/context';
import type { OverrideToken } from '@madccc/antd/es/_util/theme/interface';

export type Theme = {
  name: string;
  key: string;
  config: ThemeConfig;
};

export type AliasToken = Exclude<OverrideToken['alias'], undefined>;
export type TokenValue = string | number | string[] | number[];
