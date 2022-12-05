import type { DerivativeFunc } from '@ant-design/cssinjs';
import { Spin } from 'antd';
import classNames from 'classnames';
import React, {
  forwardRef,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import { antdComponents } from './component-panel';
import ComponentDemoGroup from './component-panel/ComponentDemoGroup';
import type { ThemeDiff } from './hooks/useControlledTheme';
import useControlledTheme from './hooks/useControlledTheme';
import type { SelectedToken, Theme } from './interface';
import {
  mapRelatedAlias,
  seedRelatedAlias,
  seedRelatedMap,
} from './meta/TokenRelation';
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

export type ThemeEditorRef = {
  getDiff: () => ThemeDiff;
  updateRef: () => void;
};

export type ThemeEditorProps = {
  simple?: boolean;
  theme?: Theme;
  onThemeChange?: (theme: Theme) => void;
  className?: string;
  style?: React.CSSProperties;
  darkAlgorithm?: DerivativeFunc<any, any>;
};

const ThemeEditor = forwardRef<ThemeEditorRef, ThemeEditorProps>(
  (
    {
      simple,
      theme: customTheme,
      onThemeChange,
      className,
      style,
      darkAlgorithm,
    },
    ref,
  ) => {
    const [wrapSSR, hashId] = useStyle();
    const [selectedTokens, setSelectedTokens] = useState<SelectedToken>({
      seed: ['colorPrimary'],
    });
    const [aliasOpen, setAliasOpen] = useState<boolean>(false);
    const [activeTheme, setActiveTheme] = useState<string>(
      customTheme ? customTheme.key : 'default',
    );

    const [loading, setLoading] = useState<boolean>(false);
    const loadingRef = React.useRef<object>();

    const {
      themes,
      infoFollowPrimary,
      onInfoFollowPrimaryChange,
      getDiff,
      updateRef,
      switchDark,
    } = useControlledTheme({
      theme: customTheme,
      defaultTheme,
      onChange: onThemeChange,
      darkAlgorithm,
    });

    useImperativeHandle(ref, () => ({
      getDiff,
      updateRef,
    }));

    const handleTokenSelect: TokenPanelProProps['onTokenSelect'] = (
      token,
      type,
    ) => {
      setLoading(true);
      const currentLoading = {};
      loadingRef.current = currentLoading;
      setTimeout(() => {
        if (loadingRef.current === currentLoading) {
          setSelectedTokens((prev) => {
            const tokens =
              typeof token === 'string' ? (token ? [token] : []) : token;
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
          setLoading(false);
        }
      }, 800);
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

    const handleActiveThemeChange: TokenPanelProProps['onActiveThemeChange'] = (
      newActive,
    ) => {
      if (simple) {
        switchDark();
      } else {
        setActiveTheme(newActive);
      }
    };

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
            onActiveThemeChange={handleActiveThemeChange}
          />
        </div>
        <div style={{ flex: 1, overflow: 'auto', height: '100%' }}>
          <Spin spinning={loading}>
            <ComponentDemoGroup
              selectedTokens={computedSelectedTokens}
              themes={[memoizedActiveTheme]}
              components={antdComponents}
              activeComponents={relatedComponents}
            />
          </Spin>
        </div>
      </div>,
    );
  },
);

export default ThemeEditor;
