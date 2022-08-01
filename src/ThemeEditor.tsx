import type { FC } from 'react';
import React, { useEffect, useMemo, useState } from 'react';
import TokenPanelPro from './token-panel-pro';
import ComponentDemoGroup from './component-panel/ComponentDemoGroup';
import { antdComponents } from './component-panel';
import { TokenPanelIcon } from './icons';
import makeStyle from './utils/makeStyle';
import classNames from 'classnames';
import { theme } from 'antd';
import type { MutableTheme, SelectedToken, Theme } from './interface';
import type { ThemeConfig } from 'antd/es/config-provider/context';
import {
  mapRelatedAlias,
  seedRelatedAlias,
  seedRelatedMap,
} from './token-info/TokenRelation';
import { getRelatedComponents } from './utils/statistic';
import getDesignToken from './utils/getDesignToken';

const { darkAlgorithm } = theme;

const useStyle = makeStyle('ThemeEditor', (token) => ({
  '.antd-theme-editor': {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
    height: '100vh',
    display: 'flex',
    '.antd-theme-editor-sidebar': {
      padding: 12,
      width: 52,
      flex: '0 0 52px',
      borderRight: '1px solid rgba(0, 0, 0, 0.04)',
      boxSizing: 'border-box',

      '&-icon-wrapper': {
        width: 28,
        height: 28,
        borderRadius: 4,
        backgroundColor: token.colorPrimaryBg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

        '> svg': {
          fontSize: 20,
          color: token.colorPrimary,
        },
      },
    },
  },
}));

const defaultThemes: Theme[] = [
  {
    name: '默认主题',
    key: 'default',
    config: {},
  },
  {
    name: '暗色主题',
    key: 'dark',
    config: {
      algorithm: darkAlgorithm,
    },
  },
];

export type ThemeEditorProps = {
  simple?: boolean;
  theme?: Theme;
  onThemeChange?: (theme: Theme) => void;
};

const ThemeEditor: FC<ThemeEditorProps> = ({
  simple,
  theme: customTheme,
  onThemeChange,
}) => {
  const [wrapSSR, hashId] = useStyle();
  const [selectedTokens, setSelectedTokens] = useState<SelectedToken>({
    seed: ['colorPrimary'],
  });
  const [infoFollowPrimary, setInfoFollowPrimary] = useState<boolean>(true);
  const [aliasOpen, setAliasOpen] = useState<boolean>(true);
  const [activeTheme, setActiveTheme] = useState<string>(
    customTheme ? customTheme.key : 'default',
  );

  const handleThemeChange = (key: string, config: ThemeConfig) => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    setThemes((prev) =>
      prev.map((prevTheme) => {
        if (key === prevTheme.key) {
          const newToken = { ...config.token };
          if (infoFollowPrimary) {
            newToken.colorInfo = getDesignToken(config).colorPrimary;
          }
          return {
            ...prevTheme,
            config: { ...config, token: newToken },
          };
        }
        return prevTheme;
      }),
    );
  };

  const defaultMutableTheme = defaultThemes.map((themeItem) => ({
    ...themeItem,
    config: {
      ...themeItem.config,
      token: {
        ...themeItem.config.token,
        colorInfo: getDesignToken(themeItem.config).colorPrimary,
      },
    },
    onThemeChange: (themeConfig: ThemeConfig) => {
      handleThemeChange(themeItem.key, themeConfig);
    },
  }));

  const handleCustomThemeChange = (config: ThemeConfig) => {
    if (customTheme) {
      const newToken = { ...config.token };
      if (infoFollowPrimary) {
        newToken.colorInfo = getDesignToken(config).colorPrimary;
      }
      onThemeChange?.({
        ...customTheme,
        config: { ...config, token: newToken },
      });
    }
  };

  const customMutableTheme = customTheme && {
    ...customTheme,
    config: {
      ...customTheme.config,
      token: {
        ...customTheme.config.token,
        colorInfo: getDesignToken(customTheme.config).colorPrimary,
      },
    },
    onThemeChange: handleCustomThemeChange,
  };

  const [themes, setThemes] = useState<MutableTheme[]>(
    customMutableTheme ? [customMutableTheme] : defaultMutableTheme,
  );

  useEffect(() => {
    setThemes(customMutableTheme ? [customMutableTheme] : defaultMutableTheme);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customTheme, onThemeChange]);

  const handleTokenSelect = (token: string, type: keyof SelectedToken) => {
    setSelectedTokens((prev) => {
      if (type === 'seed') {
        return {
          seed: token ? [token] : [],
        };
      }
      const newSelectedTokens = {
        ...prev,
        [type]: prev[type]?.includes(token)
          ? prev[type]?.filter((t) => t !== token)
          : [...(prev[type] ?? []), token],
      };
      if (type === 'map') {
        delete newSelectedTokens.alias;
      }
      return newSelectedTokens;
    });
  };

  const computedSelectedTokens = useMemo(() => {
    if (
      selectedTokens.seed?.length &&
      !selectedTokens.map?.length &&
      !selectedTokens.alias?.length
    ) {
      return [
        ...selectedTokens.seed,
        ...((seedRelatedMap as any)[selectedTokens.seed[0]] ?? []),
        ...((seedRelatedAlias as any)[selectedTokens.seed[0]] ?? []),
      ];
    }
    if (selectedTokens.map?.length && !selectedTokens.alias?.length) {
      return [
        ...selectedTokens.map,
        ...selectedTokens.map.reduce((result, item) => {
          return result.concat((mapRelatedAlias as any)[item]);
        }, []),
      ];
    }
    if (selectedTokens.alias?.length) {
      return [...selectedTokens.alias];
    }
    return [];
  }, [selectedTokens]);

  const relatedComponents = useMemo(() => {
    return computedSelectedTokens
      ? getRelatedComponents(computedSelectedTokens)
      : [];
  }, [computedSelectedTokens]);

  const followColorPrimary = () => {
    setThemes((prev) =>
      prev.map((prevTheme) => {
        return {
          ...prevTheme,
          config: {
            ...prevTheme.config,
            token: {
              ...prevTheme.config.token,
              colorInfo: getDesignToken(prevTheme.config).colorPrimary,
            },
          },
        };
      }),
    );
  };

  const handleInfoFollowPrimaryChange = (checked: boolean) => {
    setInfoFollowPrimary(checked);
    if (checked) {
      followColorPrimary();
    }
  };

  const memoizedActiveTheme = useMemo(
    () => themes.find((item) => item.key === activeTheme)!,
    [activeTheme, themes],
  );

  return wrapSSR(
    <div className={classNames(hashId, 'antd-theme-editor')}>
      <div
        style={{
          flex: aliasOpen ? '0 0 912px' : `0 0 ${912 - 320 - 1}px`,
          height: '100%',
          backgroundColor: '#F7F8FA',
          backgroundImage:
            'linear-gradient(180deg, #FFFFFF 0%, rgba(246,247,249,0.00) 100%)',
          display: 'flex',
          transition: 'all 0.3s',
        }}
      >
        <div className="antd-theme-editor-sidebar">
          <div className="antd-theme-editor-sidebar-icon-wrapper">
            <TokenPanelIcon />
          </div>
        </div>
        <TokenPanelPro
          aliasOpen={aliasOpen}
          onAliasOpenChange={(open) => setAliasOpen(open)}
          themes={themes}
          simple={simple}
          style={{ flex: 1 }}
          selectedTokens={selectedTokens}
          onTokenSelect={handleTokenSelect}
          infoFollowPrimary={infoFollowPrimary}
          onInfoFollowPrimaryChange={handleInfoFollowPrimaryChange}
          activeTheme={activeTheme}
          onActiveThemeChange={(newActive) => setActiveTheme(newActive)}
        />
      </div>
      <div style={{ flex: 1, overflow: 'auto', height: '100%' }}>
        <ComponentDemoGroup
          selectedTokens={computedSelectedTokens}
          themes={[memoizedActiveTheme]}
          components={antdComponents}
          activeComponents={relatedComponents}
        />
      </div>
    </div>,
  );
};

export default ThemeEditor;
