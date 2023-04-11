import classNames from 'classnames';
import type { FC } from 'react';
import React, { useState } from 'react';
import type { SelectedToken, Theme } from './interface';
import type { TokenPanelProProps } from './token-panel-pro';
import TokenPanelPro from './token-panel-pro';
import ComponentDemoPro from './token-panel-pro/ComponentDemoPro';
import makeStyle from './utils/makeStyle';

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
  advanced?: boolean;
};

const GlobalTokenEditor: FC<GlobalTokenEditorProps> = (props) => {
  const { theme, infoFollowPrimary, onInfoFollowPrimaryChange, advanced } =
    props;

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
        style={{ flex: 1, overflow: 'auto', height: '100%' }}
        advanced={advanced}
      />
    </div>
  );
};

export default GlobalTokenEditor;
