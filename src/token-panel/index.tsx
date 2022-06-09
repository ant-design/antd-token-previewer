import { CheckOutlined } from '@ant-design/icons';
import { Dropdown, Input, Menu, Switch, Tag } from '@madccc/antd';
import type { ThemeConfig } from '@madccc/antd/es/config-provider/context';
import classNames from 'classnames';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import type { TokenType } from '../utils/classifyToken';
import { classifyToken, TOKEN_SORTS } from '../utils/classifyToken';
import makeStyle from '../utils/makeStyle';
import TokenCard, { IconMap, TextMap } from './token-card';
import type { Theme } from '../interface';
import { SearchDropdown } from '../icons';

const useStyle = makeStyle('AliasTokenPreview', (token) => ({
  '.preview-panel-wrapper': {
    overflow: 'auto',
    height: '100%',
    '.preview-panel': {
      height: '100%',
      minWidth: 300,
      backgroundColor: 'white',
      display: 'flex',
      flexDirection: 'column',
      '.preview-panel-token-wrapper': {
        position: 'relative',
        flex: 1,
        overflow: 'hidden',
        '&::before, &::after': {
          position: 'absolute',
          zIndex: 1,
          opacity: 0,
          transition: 'opacity .3s',
          content: '""',
          pointerEvents: 'none',
          left: 0,
          right: 0,
          height: 40,
        },

        '&::before': {
          top: 0,
          boxShadow: 'inset 0 10px 8px -8px #00000014',
        },

        '&::after': {
          bottom: 0,
          boxShadow: 'inset 0 -10px 8px -8px #00000014',
        },

        '&.preview-panel-token-wrapper-ping-top': {
          '&::before': {
            opacity: 1,
          },
        },

        '&.preview-panel-token-wrapper-ping-bottom': {
          '&::after': {
            opacity: 1,
          },
        },
      },
      '.preview-panel-subtitle': {
        fontSize: token.fontSizeSM,
        color: token.colorTextSecondary,
      },
      '.preview-panel-space': {
        marginBottom: 20,
        paddingInlineStart: token.paddingXS,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',

        '.preview-hide-token': {
          color: token.colorTextSecondary,
          fontSize: token.fontSizeSM,
          lineHeight: token.lineHeightSM,
          display: 'flex',
          alignItems: 'center',
          '>*:first-child': {
            marginRight: 2,
          },
        },
      },
      '.preview-panel-search': {
        backgroundColor: 'rgba(0, 0, 0, 2%)',
        borderRadius: token.radiusLG,

        '.ant-input-group-addon': {
          backgroundColor: 'inherit',
          border: 'none',
          padding: 0,
          transition: `background-color ${token.motionDurationSlow}`,

          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 4%)',
          },
        },

        input: {
          fontSize: token.fontSizeSM,
          paddingInlineStart: 4,
        },
      },
    },

    '.ant-tag.previewer-token-filter-tag': {
      color: token.colorPrimary,
      backgroundColor: token.colorPrimaryOutline,
      border: 'none',
      borderRadius: 4,

      '> .anticon': {
        color: token.colorPrimary,
      },
    },
  },
}));

export interface MutableTheme extends Theme {
  onThemeChange?: (newTheme: ThemeConfig) => void;
}

export interface TokenPreviewProps {
  themes: MutableTheme[];
  selectedTokens: string[];
  onTokenSelect: (token: string) => void;
}

export const PreviewContext = React.createContext<TokenPreviewProps>({
  themes: [],
  selectedTokens: [],
  onTokenSelect: () => {},
});

export default (props: TokenPreviewProps) => {
  const { themes } = props;
  const [wrapSSR, hashId] = useStyle();
  const [{ config }] = themes;
  const [search, setSearch] = useState<string>('');
  const [filterTypes, setFilterTypes] = useState<TokenType[]>([]);
  const [showAll, setShowAll] = useState<boolean>(false);
  const [showTokenListShadowTop, setShowTokenListShadowTop] =
    useState<boolean>(false);
  const [showTokenListShadowBottom, setShowTokenListShadowBottom] =
    useState<boolean>(true);
  const cardWrapperRef = useRef<HTMLDivElement>(null);

  const { selectedTokens, onTokenSelect } = props;

  // TODO: Split AliasToken and SeedToken
  const groupedToken = useMemo(
    () => classifyToken(config.override?.alias ?? {}),
    [config],
  );

  useEffect(() => {
    const handleTokenListScroll = () => {
      setShowTokenListShadowTop((cardWrapperRef.current?.scrollTop ?? 0) > 0);
      setShowTokenListShadowBottom(
        (cardWrapperRef.current?.scrollTop ?? 0) +
          (cardWrapperRef.current?.clientHeight ?? 0) <
          (cardWrapperRef.current?.firstElementChild?.clientHeight ?? 0),
      );
    };
    cardWrapperRef.current?.addEventListener('scroll', handleTokenListScroll);
    const wrapper = cardWrapperRef.current;
    return () => {
      wrapper?.removeEventListener('scroll', handleTokenListScroll);
    };
  }, []);

  return wrapSSR(
    <PreviewContext.Provider value={props}>
      <div className={classNames('preview-panel-wrapper', hashId)}>
        <div className={classNames('preview-panel')}>
          <div style={{ padding: 16 }}>
            <h3 className={classNames('preview-panel-space', hashId)}>
              <span>Alias Token 预览</span>
              <span className="preview-hide-token">
                <span>显示所有</span>
                <Switch
                  checked={showAll}
                  onChange={(value) => setShowAll(value)}
                  size="small"
                />
              </span>
            </h3>
            <Input
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              bordered={false}
              addonBefore={
                <>
                  <Dropdown
                    overlay={
                      <Menu
                        items={[
                          {
                            label: '筛选项',
                            type: 'group',
                            key: 'title-key',
                            style: { fontSize: 12 },
                          },
                          ...TOKEN_SORTS.map((type) => ({
                            icon: (
                              <span>
                                <CheckOutlined
                                  style={{
                                    opacity: filterTypes.includes(type) ? 1 : 0,
                                    marginRight: 8,
                                    fontSize: 12,
                                  }}
                                />
                                {IconMap[type]}
                              </span>
                            ),
                            label: TextMap[type],
                            key: type,
                            onClick: () => {
                              setFilterTypes((prev) =>
                                prev.includes(type)
                                  ? prev.filter((item) => type !== item)
                                  : [...prev, type],
                              );
                            },
                          })),
                        ]}
                      />
                    }
                    trigger={['click']}
                  >
                    <SearchDropdown
                      style={{
                        width: 32,
                        cursor: 'pointer',
                        fontSize: 18,
                        paddingTop: 2,
                      }}
                    />
                  </Dropdown>
                </>
              }
              className={classNames('preview-panel-search', hashId)}
              placeholder="搜索 Token / 色值 / 文本 / 圆角等"
            />
          </div>
          <div
            className={classNames('preview-panel-token-wrapper', {
              'preview-panel-token-wrapper-ping-top': showTokenListShadowTop,
              'preview-panel-token-wrapper-ping-bottom':
                showTokenListShadowBottom,
            })}
          >
            <div
              ref={cardWrapperRef}
              style={{ height: '100%', overflow: 'auto', padding: '0 16px' }}
            >
              <div>
                {TOKEN_SORTS.filter(
                  (type) =>
                    filterTypes.includes(type) || filterTypes.length === 0,
                ).map((key) => (
                  <TokenCard
                    key={key}
                    typeName={key}
                    tokenArr={groupedToken[key]}
                    keyword={search}
                    hideUseless={!showAll}
                  />
                ))}
              </div>
            </div>
          </div>
          {(filterTypes.length > 0 || selectedTokens.length > 0) && (
            <div style={{ padding: 12 }}>
              {filterTypes.length > 0 && (
                <div style={{ marginBlock: 8 }}>
                  <span className="preview-panel-subtitle">显示分组：</span>
                  {filterTypes.map((item) => (
                    <Tag
                      className="previewer-token-filter-tag"
                      key={item}
                      closable
                      onClose={() =>
                        setFilterTypes((prev) =>
                          prev.filter((type) => type !== item),
                        )
                      }
                      style={{ marginBlock: 2 }}
                    >
                      {TextMap[item]}
                    </Tag>
                  ))}
                </div>
              )}
              {selectedTokens.length > 0 && (
                <div style={{ marginBlock: 8 }}>
                  <span className="preview-panel-subtitle">已选中：</span>
                  {selectedTokens.map((token) => (
                    <Tag
                      key={token}
                      closable
                      onClose={() => onTokenSelect(token)}
                      style={{ marginBlock: 2 }}
                      className="previewer-token-filter-tag"
                    >
                      {token}
                    </Tag>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </PreviewContext.Provider>,
  );
};
