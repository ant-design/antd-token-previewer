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
    [`${token.componentCls}-token-panel-wrapper`]: {
      backgroundColor: token.colorBgContainer,
      height: '100%',
      backgroundImage:
        'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0, 0, 0, 0.02) 100%)',
      display: 'flex',
      transition: 'all 0.3s',
    },
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
          flex: `0 0 480px`,
        }}
        className={`${prefixCls}-token-panel-wrapper`}
      >
        <TokenPanelPro
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
      />
    </div>
  );
};

export default GlobalTokenEditor;
