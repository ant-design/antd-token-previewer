import type { ThemeConfig } from 'antd/es/config-provider/context';
import type { OverrideToken } from 'antd/es/theme/interface';
import type { ReactElement } from 'react';

export type Theme = {
  name: string;
  key: string;
  config: ThemeConfig;
};

export type AliasToken = Exclude<OverrideToken['alias'], undefined>;
export type TokenValue = string | number | string[] | number[];
export type TokenName = keyof AliasToken;

export interface ComponentDemo {
  tokens?: TokenName[];
  demo: ReactElement;
  key: string;
}
export interface PreviewerDemo {
  default: ReactElement;
  optional?: ComponentDemo[];
}

export interface MutableTheme extends Theme {
  onThemeChange?: (newTheme: ThemeConfig, path: string[]) => void;
  onReset?: (path: string[]) => void;
  getCanReset?: (path: string[]) => boolean;
}

export interface TokenEntity {
  name: string;
  token: string;
  value: string | number;
  type: string;
  description: string;
  source: string;
}

export type PreviewerProps = {
  onSave?: (tokenList: TokenEntity[], themeConfig: ThemeConfig) => void;
  showTheme?: boolean;
  theme?: Theme;
  onThemeChange?: (config: ThemeConfig) => void;
};

export type SelectedToken = {
  seed?: string[];
  map?: string[];
  alias?: string[];
};
