import type { MutableTheme, Theme } from '../interface';
import { useEffect, useRef, useState } from 'react';
import { theme as antTheme } from 'antd';
import getValueByPath from '../utils/getValueByPath';
import deepUpdateObj from '../utils/deepUpdateObj';
import getDesignToken from '../utils/getDesignToken';
import type { ThemeConfig } from 'antd/es/config-provider/context';

const { darkAlgorithm } = antTheme;

export type SetThemeState = (
  theme: Theme,
  modifiedPath: string[],
  updated?: boolean,
) => void;

export type UseControlledTheme = (options: {
  theme?: Theme;
  defaultTheme: Theme;
  onChange?: (theme: Theme) => void;
}) => {
  themes: MutableTheme[];
  infoFollowPrimary: boolean;
  onInfoFollowPrimaryChange: (value: boolean) => void;
};

const useControlledTheme: UseControlledTheme = ({
  theme: customTheme,
  defaultTheme,
  onChange,
}) => {
  const [theme, setTheme] = useState<Theme>(customTheme ?? defaultTheme);
  const [darkTheme, setDarkTheme] = useState<Theme>({
    name: '暗色主题',
    key: 'dark',
    config: { ...theme.config, algorithm: darkAlgorithm },
  });
  const [infoFollowPrimary, setInfoFollowPrimary] = useState<boolean>(false);
  const themeRef = useRef<Theme>(theme);
  const darkThemeRef = useRef<Theme>(darkTheme);
  const darkThemeUpdatedRef = useRef<object>({});

  const getNewTheme = (newTheme: Theme, force?: boolean): Theme => {
    const newToken = { ...newTheme.config.token };
    if (infoFollowPrimary || force) {
      newToken.colorInfo = getDesignToken(newTheme.config).colorPrimary;
    }
    return { ...newTheme, config: { ...newTheme.config, token: newToken } };
  };

  const handleSetTheme: SetThemeState = (newTheme, modifiedPath) => {
    if (customTheme) {
      onChange?.(getNewTheme(newTheme));
    } else {
      setTheme(getNewTheme(newTheme));
    }

    // Sync dark theme
    if (
      modifiedPath[0] === 'token' &&
      !getValueByPath(darkThemeRef.current?.config, modifiedPath) &&
      !getValueByPath(darkThemeUpdatedRef.current, modifiedPath)
    ) {
      const path = ['config', ...modifiedPath];
      setDarkTheme(
        getNewTheme(
          deepUpdateObj({ ...darkTheme }, path, getValueByPath(newTheme, path)),
        ),
      );
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

  const getCanReset =
    (origin: ThemeConfig, current: ThemeConfig) => (path: string[]) => {
      return getValueByPath(origin, path) !== getValueByPath(current, path);
    };

  const handleSetDarkTheme: SetThemeState = (
    newTheme,
    modifiedPath,
    updated = true,
  ) => {
    setDarkTheme(getNewTheme(newTheme));
    darkThemeUpdatedRef.current = deepUpdateObj(
      darkThemeUpdatedRef.current,
      modifiedPath,
      updated,
    );
  };

  const handleResetDarkTheme = (path: string[]) => {
    let newConfig = { ...darkTheme.config };
    // Follow default theme
    if (
      path[0] === 'token' &&
      !getValueByPath(darkThemeRef.current?.config, path)
    ) {
      newConfig = deepUpdateObj(
        newConfig,
        path,
        getValueByPath(theme.config, path),
      );
    } else {
      newConfig = deepUpdateObj(
        newConfig,
        path,
        getValueByPath(darkThemeRef.current?.config, path),
      );
    }
    handleSetDarkTheme({ ...darkTheme, config: newConfig }, path, false);
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
      setDarkTheme(getNewTheme(darkTheme, true));
    }
  };

  return {
    themes: [
      {
        ...theme,
        onThemeChange: (config, path) =>
          handleSetTheme({ ...theme, config }, path),
        onReset: handleResetTheme,
        getCanReset: getCanReset(themeRef.current?.config, theme.config),
      },
      {
        ...darkTheme,
        onThemeChange: (config, path) =>
          handleSetDarkTheme({ ...darkTheme, config }, path),
        onReset: handleResetDarkTheme,
        getCanReset: (path) =>
          getValueByPath(darkThemeUpdatedRef.current, path) ?? false,
      },
    ],
    infoFollowPrimary,
    onInfoFollowPrimaryChange: handleInfoFollowPrimaryChange,
  };
};

export default useControlledTheme;
