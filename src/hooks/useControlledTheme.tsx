import type { DerivativeFunc } from '@ant-design/cssinjs';
import { theme as antTheme } from 'antd';
import type { ThemeConfig } from 'antd/es/config-provider/context';
import type { AliasToken, SeedToken } from 'antd/es/theme/interface';
import { useEffect, useRef, useState } from 'react';
import type { MutableTheme, Theme, TokenValue } from '../interface';
import deepUpdateObj from '../utils/deepUpdateObj';
import getDesignToken from '../utils/getDesignToken';
import getValueByPath from '../utils/getValueByPath';

const { darkAlgorithm: defaultDark, defaultAlgorithm } = antTheme;

export type SetThemeState = (
  theme: Theme,
  modifiedPath: string[],
  updated?: boolean,
) => void;

export type ThemeDiff = {
  [key in keyof AliasToken]?: {
    before: TokenValue;
    after: TokenValue;
  };
};

export type UseControlledTheme = (options: {
  theme?: Theme;
  defaultTheme: Theme;
  onChange?: (theme: Theme) => void;
  darkAlgorithm?: DerivativeFunc<any, any>;
}) => {
  themes: MutableTheme[];
  infoFollowPrimary: boolean;
  onInfoFollowPrimaryChange: (value: boolean) => void;
  getDiff: () => ThemeDiff;
  updateRef: () => void;
  switchDark: () => void;
};

const useControlledTheme: UseControlledTheme = ({
  theme: customTheme,
  defaultTheme,
  onChange,
  darkAlgorithm = defaultDark,
}) => {
  const [theme, setTheme] = useState<Theme>(customTheme ?? defaultTheme);
  const [darkTheme, setDarkTheme] = useState<Theme>({
    name: '暗色模式',
    key: 'dark',
    config: { ...theme.config, algorithm: darkAlgorithm },
  });
  const [infoFollowPrimary, setInfoFollowPrimary] = useState<boolean>(false);
  const themeRef = useRef<Theme>(theme);
  const darkThemeRef = useRef<Theme>(darkTheme);
  const darkThemeUpdatedRef = useRef<object>({});
  const [, setRenderHolder] = useState(0);

  const forceUpdate = () => setRenderHolder((prev) => prev + 1);

  const getNewTheme = (newTheme: Theme, force?: boolean): Theme => {
    const newToken = { ...newTheme.config.token };
    if (infoFollowPrimary || force) {
      newToken.colorInfo = getDesignToken(newTheme.config).colorPrimary;
    }
    return { ...newTheme, config: { ...newTheme.config, token: newToken } };
  };

  const handleSetTheme: SetThemeState = (newTheme) => {
    if (customTheme) {
      onChange?.(getNewTheme(newTheme));
    } else {
      setTheme(getNewTheme(newTheme));
    }

    // Sync dark theme
    // if (
    //   modifiedPath[0] === 'token' &&
    //   !getValueByPath(darkThemeRef.current?.config, modifiedPath) &&
    //   !getValueByPath(darkThemeUpdatedRef.current, modifiedPath)
    // ) {
    //   const path = ['config', ...modifiedPath];
    //   setDarkTheme(
    //     getNewTheme(
    //       deepUpdateObj({ ...darkTheme }, path, getValueByPath(newTheme, path)),
    //     ),
    //   );
    // }
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

  const isThemeDifferent = getCanReset(themeRef.current?.config, theme.config);

  const getDiffByPath = (path: string[]) => {
    const diff = Object.keys(
      getValueByPath(theme.config, path) ?? {},
    ).reduce<ThemeDiff>((result, token) => {
      let newResult = result;
      if (isThemeDifferent([...path, token])) {
        newResult = { ...result };
        newResult[token as keyof SeedToken] = {
          before: getValueByPath(themeRef.current?.config, [...path, token]),
          after: getValueByPath(theme.config, [...path, token]),
        };
      }
      return newResult;
    }, {});

    return Object.keys(
      getValueByPath(themeRef.current.config, path) ?? {},
    ).reduce<ThemeDiff>((result, token) => {
      let newResult = result;
      if (isThemeDifferent([...path, token])) {
        if (newResult[token as keyof SeedToken] !== undefined) {
          return newResult;
        } else {
          newResult = { ...result };
        }
        newResult[token as keyof SeedToken] = {
          before: getValueByPath(themeRef.current?.config, [...path, token]),
          after: getValueByPath(theme.config, [...path, token]),
        };
      }
      return newResult;
    }, diff);
  };

  const getDiff = (): ThemeDiff => getDiffByPath(['token']);

  const switchDark = () => {
    handleSetTheme(
      theme.config.algorithm === darkAlgorithm
        ? { ...theme, config: { ...theme.config, algorithm: defaultAlgorithm } }
        : { ...theme, config: { ...theme.config, algorithm: darkAlgorithm } },
      ['config', 'algorithm'],
    );
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
    getDiff,
    updateRef: () => {
      themeRef.current = theme;
      forceUpdate();
    },
    switchDark,
  };
};

export default useControlledTheme;
