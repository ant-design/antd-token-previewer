import { Tabs } from 'antd';
import type { Theme } from 'antd-token-previewer';
import type { SeedToken } from 'antd/es/theme/interface';
import classNames from 'classnames';
import type { FC } from 'react';
import React, { useMemo, useState } from 'react';
import type { SelectedToken } from '../interface';
import makeStyle from '../utils/makeStyle';
import AliasPanel from './AliasPanel';
import type { ColorTokenContentProps } from './ColorTokenContent';
import ColorTokenContent from './ColorTokenContent';

const { TabPane } = Tabs;

type SeedCategory = {
  title: string;
  key: string;
  description: string;
  seedTokens: (keyof SeedToken)[];
  mapTokenGroups?: string[];
  aliasTokenDescription?: string;
};

export const seedCategories: SeedCategory[] = [
  {
    title: '品牌色',
    key: 'brandColor',
    description:
      '品牌色是体现产品特性和传播理念最直观的视觉元素之一。在你完成品牌主色的选取之后，我们会自动帮你生成一套完整的色板，并赋予它们有效的设计语义。',
    seedTokens: ['colorPrimary'],
  },
  {
    title: '成功色',
    key: 'successColor',
    description: 'TBD',
    seedTokens: ['colorSuccess'],
  },
  {
    title: '警戒色',
    key: 'warningColor',
    description: 'TBD',
    seedTokens: ['colorWarning'],
  },
  {
    title: '错误色',
    key: 'errorColor',
    description: 'TBD',
    seedTokens: ['colorError'],
  },
  {
    title: '信息色',
    key: 'infoColor',
    description: 'TBD',
    seedTokens: ['colorInfo'],
  },
  {
    title: '中性色',
    key: 'neutralColor',
    description:
      '中性色主要被大量的应用在界面的文字、背景、边框和填充的 4 种场景。合理地选择中性色能够令页面信息具备良好的主次关系，助力阅读体验。',
    seedTokens: ['colorTextBase', 'colorBgBase'],
    mapTokenGroups: ['text', 'border', 'fill', 'background'],
    aliasTokenDescription:
      '你可以利用 Alias Token 来精准控制部分组件的效果。例如 Input 、InputNumber、Select 等Control 类组件都共享了相同的 controlXX token 。只需修改值，即可实现不改变 Button 的情况下，修改 Control 类组件的效果。',
  },
];

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
  const [activeSeeds, setActiveSeeds] = useState<(keyof SeedToken)[]>([
    'colorPrimary',
  ]);

  const handleNext: ColorTokenContentProps['onNext'] = (seeds) => {
    setActiveSeeds(seeds);
    onTokenSelect?.(seeds, 'seed');
  };

  const activeCategory = useMemo(() => {
    return seedCategories.find(
      ({ seedTokens }) => seedTokens.join('') === activeSeeds.join(''),
    );
  }, [activeSeeds]);

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
            activeSeeds={activeSeeds}
            onActiveSeedsChange={(seeds) => setActiveSeeds(seeds)}
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
        description={activeCategory?.aliasTokenDescription}
        onOpenChange={(value) => onAliasOpenChange?.(value)}
        activeSeeds={activeSeeds}
        themes={simple ? [themes[0]] : themes}
        style={{ flex: aliasOpen ? '0 0 320px' : 'none', width: 0 }}
        selectedTokens={selectedTokens}
        onTokenSelect={onTokenSelect}
      />
    </div>,
  );
};

export default TokenPanelPro;
