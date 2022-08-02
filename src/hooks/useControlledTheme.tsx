import type { MutableTheme, Theme } from '../interface';
import { useEffect, useRef, useState } from 'react';
import { theme as antTheme } from 'antd';
import getValueByPath from '../utils/getValueByPath';
import deepUpdateObj from '../utils/deepUpdateObj';
import getDesignToken from '../utils/getDesignToken';

const { darkAlgorithm } = antTheme;

export type SetThemeState = (theme: Theme, modifiedPath: string[]) => void;

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
    const path = ['config', ...modifiedPath];
    if (
      !getValueByPath(darkThemeRef.current?.config, modifiedPath) &&
      !getValueByPath(darkThemeUpdatedRef.current, modifiedPath)
    ) {
      setDarkTheme(
        getNewTheme(
          deepUpdateObj({ ...darkTheme }, path, getValueByPath(newTheme, path)),
        ),
      );
    }
  };

  const handleSetDarkTheme: SetThemeState = (newTheme, modifiedPath) => {
    setDarkTheme(getNewTheme(newTheme));
    darkThemeUpdatedRef.current = deepUpdateObj(
      darkThemeUpdatedRef.current,
      modifiedPath,
      true,
    );
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
      },
      {
        ...darkTheme,
        onThemeChange: (config, path) =>
          handleSetDarkTheme({ ...darkTheme, config }, path),
      },
    ],
    infoFollowPrimary,
    onInfoFollowPrimaryChange: handleInfoFollowPrimaryChange,
  };
};

export default useControlledTheme;
