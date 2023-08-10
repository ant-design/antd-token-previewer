import type { DerivativeFunc } from '@ant-design/cssinjs';
import { theme as antTheme } from 'antd';
import type { ThemeConfig } from 'antd/es/config-provider/context';
import { useEffect, useRef, useState } from 'react';
import type { MutableTheme, Theme } from '../interface';
import deepUpdateObj from '../utils/deepUpdateObj';
import getValueByPath from '../utils/getValueByPath';

const {
  darkAlgorithm: defaultDark,
  compactAlgorithm,
  defaultAlgorithm,
} = antTheme;

export type ThemeCode = 'default' | 'dark' | 'compact';
export const themeMap: Record<ThemeCode, DerivativeFunc<any, any>> = {
  dark: defaultDark,
  compact: compactAlgorithm,
  default: defaultAlgorithm,
};

export type SetThemeState = (
  theme: Theme,
  modifiedPath: string[],
  updated?: boolean,
) => void;

export type UseControlledTheme = (options: {
  theme?: Theme;
  defaultTheme: Theme;
  onChange?: (theme: Theme) => void;
  darkAlgorithm?: DerivativeFunc<any, any>;
}) => {
  theme: MutableTheme;
  infoFollowPrimary: boolean;
  onInfoFollowPrimaryChange: (value: boolean) => void;
  updateRef: () => void;
};

const useControlledTheme: UseControlledTheme = ({
  theme: customTheme,
  defaultTheme,
  onChange,
}) => {
  const [theme, setTheme] = useState<Theme>(customTheme ?? defaultTheme);
  const [infoFollowPrimary, setInfoFollowPrimary] = useState<boolean>(true);
  const themeRef = useRef<Theme>(theme);
  const [, setRenderHolder] = useState(0);

  const forceUpdate = () => setRenderHolder((prev) => prev + 1);

  const getNewTheme = (newTheme: Theme, force?: boolean): Theme => {
    const result = { ...newTheme };
    if (infoFollowPrimary || force) {
      const newToken = { ...newTheme.config.token };
      if (newToken.colorPrimary) {
        newToken.colorInfo = newToken.colorPrimary;
      } else {
        delete newToken.colorInfo;
      }
      if (Object.keys(newToken).length > 0) {
        result.config = {
          ...newTheme.config,
          token: newToken,
        };
      } else {
        delete result.config.token;
      }
    }
    return result;
  };

  const handleSetTheme: SetThemeState = (newTheme) => {
    onChange?.(getNewTheme(newTheme));
    if (!customTheme) {
      setTheme(getNewTheme(newTheme));
    }
  };

  const handleResetTheme = (path: string[]) => {
    let newConfig = { ...theme.config };
    newConfig = deepUpdateObj(
      newConfig,
      path,
      getValueByPath(themeRef.current?.config, path),
    );
    handleSetTheme({ ...theme, config: newConfig }, path);
  };

  const handleAbortTheme = (path: string[]) => {
    let newConfig = { ...theme.config };
    newConfig = deepUpdateObj(newConfig, path, undefined);
    handleSetTheme({ ...theme, config: newConfig }, path);
  };

  const getCanReset =
    (origin: ThemeConfig, current: ThemeConfig) => (path: string[]) => {
      return getValueByPath(origin, path) !== getValueByPath(current, path);
    };

  // Controlled theme change
  useEffect(() => {
    if (customTheme) {
      setTheme(customTheme);
    }
  }, [customTheme]);

  const handleInfoFollowPrimaryChange = (value: boolean) => {
    setInfoFollowPrimary(value);
    if (value) {
      setTheme(getNewTheme(theme, true));
    }
  };

  return {
    theme: {
      ...theme,
      onThemeChange: (config, path) =>
        handleSetTheme({ ...theme, config }, path),
      onReset: handleResetTheme,
      onAbort: handleAbortTheme,
      getCanReset: getCanReset(themeRef.current?.config, theme.config),
    },
    infoFollowPrimary,
    onInfoFollowPrimaryChange: handleInfoFollowPrimaryChange,
    updateRef: () => {
      themeRef.current = theme;
      forceUpdate();
    },
  };
};

export default useControlledTheme;
