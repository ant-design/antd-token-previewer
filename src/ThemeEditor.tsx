import { DerivativeFunc } from '@ant-design/cssinjs';
import classNames from 'classnames';
import type { FC } from 'react';
import React, { useMemo, useState } from 'react';
import { antdComponents } from './component-panel';
import ComponentDemoGroup from './component-panel/ComponentDemoGroup';
import useControlledTheme from './hooks/useControlledTheme';
import type { SelectedToken, Theme } from './interface';
import {
  mapRelatedAlias,
  seedRelatedAlias,
  seedRelatedMap,
} from './token-info/TokenRelation';
import type { TokenPanelProProps } from './token-panel-pro';
import TokenPanelPro from './token-panel-pro';
import makeStyle from './utils/makeStyle';
import { getRelatedComponents } from './utils/statistic';

const useStyle = makeStyle('ThemeEditor', () => ({
  '.antd-theme-editor': {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
    display: 'flex',
  },
}));

const defaultTheme: Theme = {
  name: '默认主题',
  key: 'default',
  config: {},
};

export type ThemeEditorProps = {
  simple?: boolean;
  theme?: Theme;
  onThemeChange?: (theme: Theme) => void;
  className?: string;
  style?: React.CSSProperties;
  darkAlgorithm?: DerivativeFunc<any, any>;
};

const ThemeEditor: FC<ThemeEditorProps> = ({
  simple,
  theme: customTheme,
  onThemeChange,
  className,
  style,
  darkAlgorithm,
}) => {
  const [wrapSSR, hashId] = useStyle();
  const [selectedTokens, setSelectedTokens] = useState<SelectedToken>({
    seed: ['colorPrimary'],
  });
  const [aliasOpen, setAliasOpen] = useState<boolean>(true);
  const [activeTheme, setActiveTheme] = useState<string>(
    customTheme ? customTheme.key : 'default',
  );

  const { themes, infoFollowPrimary, onInfoFollowPrimaryChange } =
    useControlledTheme({
      theme: customTheme,
      defaultTheme,
      onChange: onThemeChange,
      darkAlgorithm,
    });

  const handleTokenSelect: TokenPanelProProps['onTokenSelect'] = (
    token,
    type,
  ) => {
    setSelectedTokens((prev) => {
      const tokens = typeof token === 'string' ? (token ? [token] : []) : token;
      if (type === 'seed') {
        return {
          seed: tokens,
        };
      }

      let newSelectedTokens = { ...prev };
      tokens.forEach((newToken) => {
        newSelectedTokens = {
          ...prev,
          [type]: prev[type]?.includes(newToken)
            ? prev[type]?.filter((t) => t !== newToken)
            : [...(prev[type] ?? []), newToken],
        };
      });
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

  const memoizedActiveTheme = useMemo(
    () => themes.find((item) => item.key === activeTheme)!,
    [activeTheme, themes],
  );

  return wrapSSR(
    <div
      className={classNames(hashId, 'antd-theme-editor', className)}
      style={style}
    >
      <div
        style={{
          flex: aliasOpen ? '0 0 860px' : `0 0 ${860 - 320}px`,
          height: '100%',
          backgroundColor: '#F7F8FA',
          backgroundImage:
            'linear-gradient(180deg, #FFFFFF 0%, rgba(246,247,249,0.00) 100%)',
          display: 'flex',
          transition: 'all 0.3s',
        }}
      >
        <TokenPanelPro
          aliasOpen={aliasOpen}
          onAliasOpenChange={(open) => setAliasOpen(open)}
          themes={themes}
          simple={simple}
          style={{ flex: 1 }}
          selectedTokens={selectedTokens}
          onTokenSelect={handleTokenSelect}
          infoFollowPrimary={infoFollowPrimary}
          onInfoFollowPrimaryChange={onInfoFollowPrimaryChange}
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
