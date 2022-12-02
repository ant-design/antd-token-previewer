import { Tabs } from 'antd';
import type { Theme } from 'antd-token-previewer';
import classNames from 'classnames';
import type { FC } from 'react';
import React, { useMemo, useState } from 'react';
import type { SelectedToken } from '../interface';
import { tokenCategory } from '../meta';
import type { TokenGroup } from '../meta/interface';
import makeStyle from '../utils/makeStyle';
import AliasPanel from './AliasPanel';
import TokenContent from './TokenContent';

const useStyle = makeStyle('TokenPanelPro', (token) => ({
  '.token-panel-pro': {
    height: '100%',
    display: 'flex',
    borderInlineEnd: `1px solid ${token.colorBorderSecondary}`,
    [`.token-panel-pro-tabs${token.rootCls}-tabs`]: {
      height: '100%',
      overflow: 'auto',
      [`${token.rootCls}-tabs-content`]: {
        height: '100%',
        [`${token.rootCls}-tabs-tabpane`]: {
          height: '100%',
        },
      },
    },
  },
}));

export type TokenPanelProProps = {
  className?: string;
  style?: React.CSSProperties;
  simple?: boolean;
  themes: Theme[];
  selectedTokens?: SelectedToken;
  onTokenSelect?: (token: string | string[], type: keyof SelectedToken) => void;
  infoFollowPrimary?: boolean;
  onInfoFollowPrimaryChange?: (value: boolean) => void;
  aliasOpen?: boolean;
  onAliasOpenChange?: (value: boolean) => void;
  activeTheme?: string;
  onActiveThemeChange?: (theme: string) => void;
};

const TokenPanelPro: FC<TokenPanelProProps> = ({
  className,
  style,
  simple,
  themes,
  selectedTokens,
  onTokenSelect,
  infoFollowPrimary,
  onInfoFollowPrimaryChange,
  aliasOpen,
  onAliasOpenChange,
  activeTheme,
  onActiveThemeChange,
}) => {
  const [wrapSSR, hashId] = useStyle();
  const [activeGroup, setActiveGroup] = useState<string>('brandColor');

  const activeCategory = useMemo(() => {
    return tokenCategory.reduce<TokenGroup<string> | undefined>(
      (result, category) => {
        return (
          result ?? category.groups.find((group) => group.key === activeGroup)
        );
      },
      undefined,
    );
  }, [activeGroup]);

  return wrapSSR(
    <div
      className={classNames(hashId, className, 'token-panel-pro')}
      style={style}
    >
      <Tabs
        defaultActiveKey="color"
        tabBarGutter={32}
        tabBarStyle={{ padding: '0 16px', margin: 0 }}
        style={{ height: '100%', flex: '0 0 540px' }}
        className="token-panel-pro-tabs"
        onChange={(key) => {
          setActiveGroup(
            tokenCategory.find((category) => category.nameEn === key)?.groups[0]
              .key ?? '',
          );
        }}
        items={tokenCategory.map((category) => ({
          key: category.nameEn,
          label: category.name,
          children: (
            <TokenContent
              category={category}
              themes={simple ? [themes[0]] : themes}
              selectedTokens={selectedTokens}
              onTokenSelect={onTokenSelect}
              infoFollowPrimary={infoFollowPrimary}
              onInfoFollowPrimaryChange={onInfoFollowPrimaryChange}
              activeGroup={activeGroup}
              onActiveGroupChange={setActiveGroup}
              activeTheme={activeTheme}
              onActiveThemeChange={onActiveThemeChange}
            />
          ),
        }))}
      />
      <AliasPanel
        open={aliasOpen}
        description={activeCategory?.aliasTokenDescription}
        onOpenChange={(value) => onAliasOpenChange?.(value)}
        activeSeeds={activeCategory?.seedToken}
        themes={simple ? [themes[0]] : themes}
        style={{ flex: aliasOpen ? '0 0 320px' : 'none', width: 0 }}
        selectedTokens={selectedTokens}
        onTokenSelect={onTokenSelect}
      />
    </div>,
  );
};

export default TokenPanelPro;
