import type { ThemeConfig } from 'antd';
import type { ReactElement } from 'react';
import type { AntdComponentsMap } from './component-panel';
import type { PreviewerDemos } from './previews/components';

export type Theme = {
  name: string;
  key: string;
  config: ThemeConfig;
};

export type AliasToken = Exclude<ThemeConfig['token'], undefined>;
export type TokenValue = string | number | string[] | number[] | boolean;
export type TokenName = keyof AliasToken;

export interface ComponentDemo {
  tokens?: TokenName[];
  demo: ReactElement;
  key: string;
}

export interface MutableTheme extends Theme {
  onThemeChange?: (newTheme: ThemeConfig, path: string[]) => void;
  onReset?: (path: string[]) => void;
  onAbort?: (path: string[]) => void;
  getCanReset?: (path: string[]) => boolean;
}

export type PreviewerProps = {
  onSave?: (themeConfig: ThemeConfig) => void;
  showTheme?: boolean;
  initialThemeConfig?: ThemeConfig;
  initialDarkThemeConfig?: ThemeConfig;
  initialCompactThemeConfig?: ThemeConfig;
  theme?: Theme;
  onThemeChange?: (config: ThemeConfig) => void;
  components?: AntdComponentsMap;
  demos?: PreviewerDemos;
};

export type SelectedToken = {
  seed?: string[];
  map?: string[];
  alias?: string[];
};
