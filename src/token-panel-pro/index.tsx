import { Anchor } from 'antd';
import type { Theme } from 'antd-token-previewer';
import classNames from 'classnames';
import type { FC } from 'react';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import type { SelectedToken } from '../interface';
import { useLocale } from '../locale';
import { tokenCategory } from '../meta';
import type { TokenGroup } from '../meta/interface';
import makeStyle from '../utils/makeStyle';
import TokenContent from './TokenContent';

const useStyle = makeStyle('TokenPanelPro', (token) => ({
  '.token-panel-pro': {
    width: '100%',
    height: '100%',
    display: 'flex',
    borderInlineEnd: `1px solid ${token.colorBorderSecondary}`,

    '.token-panel-pro-content': {
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',

      [`${token.rootCls}-anchor-wrapper`]: {
        padding: '0px 16px',
      },

      [`${token.rootCls}-anchor`]: {
        padding: '10px 0',
      },

      '.token-panel-pro-list': {
        overflow: 'auto',
      },
    },
  },
}));

export type TokenPanelProProps = {
  className?: string;
  style?: React.CSSProperties;
  theme: Theme;
  selectedTokens?: SelectedToken;
  onTokenSelect?: (token: string | string[], type: keyof SelectedToken) => void;
  infoFollowPrimary?: boolean;
  onInfoFollowPrimaryChange?: (value: boolean) => void;
  onAliasOpenChange?: (value: boolean) => void;
  activeTheme?: string;
};

const TokenPanelPro: FC<TokenPanelProProps> = ({
  className,
  style,
  theme,
  selectedTokens,
  onTokenSelect,
  infoFollowPrimary,
  onInfoFollowPrimaryChange,
}) => {
  const hashId = useStyle();
  const [activeGroup, setActiveGroup] = useState<string>('brandColor');
  const locale = useLocale();

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

  useEffect(() => {
    onTokenSelect?.(activeCategory?.seedToken ?? [], 'seed');
  }, [activeCategory]);

  const tokenListRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className={classNames(hashId, className, 'token-panel-pro')}
      style={style}
    >
      <div className="token-panel-pro-content">
        <Anchor
          affix={false}
          direction="horizontal"
          getContainer={() => tokenListRef.current!}
          onChange={(key) => {
            setActiveGroup(
              tokenCategory.find((category) => category.nameEn === key)
                ?.groups[0].key ?? '',
            );
          }}
          items={tokenCategory.map((category) => ({
            key: category.nameEn,
            title: locale._lang === 'zh-CN' ? category.name : category.nameEn,
            href: `#${category.nameEn}`,
          }))}
        />
        <div className="token-panel-pro-list" ref={tokenListRef}>
          {tokenCategory.map((category) => (
            <TokenContent
              id={category.nameEn}
              key={category.nameEn}
              category={category}
              theme={theme}
              selectedTokens={selectedTokens}
              onTokenSelect={onTokenSelect}
              infoFollowPrimary={infoFollowPrimary}
              onInfoFollowPrimaryChange={onInfoFollowPrimaryChange}
              activeGroup={activeGroup}
              onActiveGroupChange={setActiveGroup}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TokenPanelPro;
