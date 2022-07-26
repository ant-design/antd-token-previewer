import React, { useMemo, useState } from 'react';
import TokenPanelPro from './token-panel-pro';
import ComponentDemoGroup from './component-panel/ComponentDemoGroup';
import { antdComponents } from './component-panel';
import { TokenPanelIcon } from './icons';
import makeStyle from './utils/makeStyle';
import classNames from 'classnames';
import { theme } from 'antd';
import type { MutableTheme, SelectedToken } from './interface';
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

const defaultThemes = [
  {
    name: '默认主题',
    key: 'default',
    config: { token: { colorPrimary: '#1677FF' } },
    fixed: true,
  },
  {
    name: '暗色主题',
    key: 'dark',
    config: {
      token: { colorPrimary: '#1677FF' },
      algorithm: darkAlgorithm,
    },
    fixed: true,
  },
];

const ThemeEditor = () => {
  const [wrapSSR, hashId] = useStyle();
  const [selectedTokens, setSelectedTokens] = useState<SelectedToken>({
    seed: ['colorPrimary'],
  });
  const [infoFollowPrimary, setInfoFollowPrimary] = useState<boolean>(true);

  const [themes, setThemes] = useState<MutableTheme[]>(
    defaultThemes.map((themeItem) => ({
      ...themeItem,
      config: {
        ...themeItem.config,
        token: {
          ...themeItem.config.token,
          colorInfo: getDesignToken(themeItem.config).colorPrimary,
        },
      },
      onThemeChange: (themeConfig: ThemeConfig) => {
        setThemes((prev) =>
          prev.map((prevTheme) =>
            themeItem.key === prevTheme.key
              ? {
                  ...prevTheme,
                  config: themeConfig,
                }
              : prevTheme,
          ),
        );
      },
    })),
  );

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

  const handleInfoFollowPrimaryChange = (checked: boolean) => {
    setInfoFollowPrimary(checked);
    if (checked) {
      setThemes((prev) =>
        prev.map((prevTheme) => {
          // const newDerivative = {
          //   ...prevTheme.config.override?.derivative,
          // };
          // seedRelatedMap.colorInfo?.forEach((item) => {
          //   delete newDerivative[item];
          // })
          // const newAlias = {
          //   ...prevTheme.config.override?.alias,
          // };
          // seedRelatedAlias.colorInfo?.forEach((item) => {
          //   delete newAlias[item];
          // })

          return {
            ...prevTheme,
            config: {
              ...prevTheme.config,
              token: {
                ...prevTheme.config.token,
                colorInfo: getDesignToken(prevTheme.config).colorPrimary,
              },
              // override: {
              //   ...prevTheme.config.override,
              //   derivative: newDerivative,
              //   alias: newAlias,
              // }
            },
          };
        }),
      );
    }
  };

  return wrapSSR(
    <div className={classNames(hashId, 'antd-theme-editor')}>
      <div
        style={{
          flex: '0 0 912px',
          height: '100%',
          backgroundColor: '#F7F8FA',
          backgroundImage:
            'linear-gradient(180deg, #FFFFFF 0%, rgba(246,247,249,0.00) 100%)',
          display: 'flex',
        }}
      >
        <div className="antd-theme-editor-sidebar">
          <div className="antd-theme-editor-sidebar-icon-wrapper">
            <TokenPanelIcon />
          </div>
        </div>
        <TokenPanelPro
          themes={themes}
          style={{ flex: 1 }}
          selectedTokens={selectedTokens}
          onTokenSelect={handleTokenSelect}
          infoFollowPrimary={infoFollowPrimary}
          onInfoFollowPrimaryChange={handleInfoFollowPrimaryChange}
        />
      </div>
      <div style={{ flex: 1, overflow: 'auto', height: '100%' }}>
        <ComponentDemoGroup
          selectedTokens={computedSelectedTokens}
          themes={[themes[0]]}
          components={antdComponents}
          activeComponents={relatedComponents}
        />
      </div>
    </div>,
  );
};

export default ThemeEditor;
