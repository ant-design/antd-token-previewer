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
  infoFollowPrimary?: boolean;
}) => MutableTheme[];

const useControlledTheme: UseControlledTheme = ({
  theme: customTheme,
  defaultTheme,
  onChange,
  infoFollowPrimary,
}) => {
  const [theme, setTheme] = useState<Theme>(customTheme ?? defaultTheme);
  const [darkTheme, setDarkTheme] = useState<Theme>({
    name: '暗色主题',
    key: 'dark',
    config: { ...theme.config, algorithm: darkAlgorithm },
  });
  const darkThemeRef = useRef<Theme>(darkTheme);
  const darkThemeUpdatedRef = useRef<object>({});

  const getNewTheme = (newTheme: Theme): Theme => {
    const newToken = { ...newTheme.config.token };
    if (infoFollowPrimary) {
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

  useEffect(() => {
    if (infoFollowPrimary) {
      setTheme(getNewTheme(theme));
      setDarkTheme(getNewTheme(darkTheme));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [infoFollowPrimary]);

  return [
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
  ];
};

export default useControlledTheme;
