import type { FC } from 'react';
import React, { useState } from 'react';
import makeStyle from '../utils/makeStyle';
import { Tabs } from 'antd';
import classNames from 'classnames';
import ColorTokenContent from './ColorTokenContent';
import type { MutableTheme } from 'antd-token-previewer';
import type { SelectedToken } from '../interface';
import AliasPanel from './AliasPanel';
import type { SeedToken } from 'antd/es/theme/interface';
import { seedRelatedMap } from '../token-info/TokenRelation';

const { TabPane } = Tabs;

const useStyle = makeStyle('TokenPanelPro', (token) => ({
  '.token-panel-pro': {
    height: '100%',
    display: 'flex',
    [`.token-panel-pro-tabs${token.rootCls}-tabs`]: {
      height: '100%',
      overflow: 'auto',
      [`${token.rootCls}-tabs-content`]: {
        height: '100%',
      },
    },
  },
}));

export type TokenPanelProProps = {
  className?: string;
  style?: React.CSSProperties;
  simple?: boolean;
  themes: MutableTheme[];
  selectedTokens?: SelectedToken;
  onTokenSelect?: (token: string, type: keyof SelectedToken) => void;
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
  const [activeSeed, setActiveSeed] = useState<keyof SeedToken>('colorPrimary');

  const handleNext = () => {
    const seeds = Object.keys(seedRelatedMap);
    const currentIndex = seeds.indexOf(activeSeed);
    if (currentIndex < seeds.length) {
      const nextSeed = (seeds[currentIndex + 1] ?? '') as keyof SeedToken;
      setActiveSeed(nextSeed);
      onTokenSelect?.(nextSeed, 'seed');
    }
  };

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
      >
        <TabPane key="color" tab="颜色">
          <ColorTokenContent
            themes={simple ? [themes[0]] : themes}
            selectedTokens={selectedTokens}
            onTokenSelect={onTokenSelect}
            infoFollowPrimary={infoFollowPrimary}
            onInfoFollowPrimaryChange={onInfoFollowPrimaryChange}
            activeSeed={activeSeed}
            onActiveSeedChange={(seed) => setActiveSeed(seed)}
            activeTheme={activeTheme}
            onActiveThemeChange={onActiveThemeChange}
            onNext={handleNext}
          />
        </TabPane>
        <TabPane key="size" tab="尺寸大小" disabled>
          Size
        </TabPane>
        <TabPane key="others" tab="其他" disabled>
          Others
        </TabPane>
      </Tabs>
      <AliasPanel
        open={aliasOpen}
        onOpenChange={(value) => onAliasOpenChange?.(value)}
        activeSeed={activeSeed}
        themes={simple ? [themes[0]] : themes}
        style={{ flex: aliasOpen ? '0 0 320px' : 'none', width: 0 }}
        selectedTokens={selectedTokens}
        onTokenSelect={onTokenSelect}
      />
    </div>,
  );
};

export default TokenPanelPro;
