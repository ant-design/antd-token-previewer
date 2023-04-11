import classNames from 'classnames';
import type { FC } from 'react';
import React, { useMemo, useState } from 'react';
import { antdComponents } from './component-panel';
import type { SelectedToken, Theme } from './interface';
import {
  mapRelatedAlias,
  seedRelatedAlias,
  seedRelatedMap,
} from './meta/TokenRelation';
import type { TokenPanelProProps } from './token-panel-pro';
import TokenPanelPro from './token-panel-pro';
import ComponentDemoPro from './token-panel-pro/ComponentDemoPro';
import makeStyle from './utils/makeStyle';
import { getRelatedComponents } from './utils/statistic';

const useStyle = makeStyle('GlobalTokenEditor', (token) => ({
  [token.componentCls]: {
    display: 'flex',
    height: '100%',
  },
}));

export type GlobalTokenEditorProps = {
  theme: Theme;
  infoFollowPrimary?: boolean;
  onInfoFollowPrimaryChange?: (checked: boolean) => void;
};

const GlobalTokenEditor: FC<GlobalTokenEditorProps> = (props) => {
  const { theme, infoFollowPrimary, onInfoFollowPrimaryChange } = props;

  const prefixCls = 'antd-global-token-editor';
  const [, hashId] = useStyle(prefixCls);

  const [aliasOpen, setAliasOpen] = useState<boolean>(false);

  const [selectedTokens, setSelectedTokens] = useState<SelectedToken>({
    seed: ['colorPrimary'],
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

  return (
    <div className={classNames(hashId, prefixCls)}>
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
          theme={theme}
          style={{ flex: 1 }}
          selectedTokens={selectedTokens}
          onTokenSelect={handleTokenSelect}
          infoFollowPrimary={infoFollowPrimary}
          onInfoFollowPrimaryChange={onInfoFollowPrimaryChange}
        />
      </div>
      <ComponentDemoPro
        theme={theme}
        components={antdComponents}
        activeComponents={relatedComponents}
        selectedTokens={computedSelectedTokens}
        style={{ flex: 1, overflow: 'auto', height: '100%' }}
        componentDrawer
      />
    </div>
  );
};

export default GlobalTokenEditor;
