import type { ThemeCode } from '../hooks/useControlledTheme';
import { themeMap } from '../hooks/useControlledTheme';
import type { MutableTheme } from '../interface';

export const isLeftChecked = (str: ThemeCode, theme: MutableTheme) => {
  if (!theme.config.algorithm) {
    return true;
  }
  return Array.isArray(theme.config.algorithm)
    ? !theme.config.algorithm.includes(themeMap[str])
    : theme.config.algorithm !== themeMap[str];
};

export const switchAlgorithm =
  (themeStr: 'dark' | 'compact', theme: MutableTheme) => () => {
    let newAlgorithm = theme.config.algorithm;
    if (!newAlgorithm) {
      newAlgorithm = themeMap[themeStr];
    } else if (Array.isArray(newAlgorithm)) {
      newAlgorithm = newAlgorithm.includes(themeMap[themeStr])
        ? newAlgorithm.filter((item) => item !== themeMap[themeStr])
        : [...newAlgorithm, themeMap[themeStr]];
    } else {
      newAlgorithm =
        newAlgorithm === themeMap[themeStr]
          ? undefined
          : [newAlgorithm, themeMap[themeStr]];
    }
    theme.onThemeChange?.({ ...theme.config, algorithm: newAlgorithm }, [
      'config',
      'algorithm',
    ]);
  };
