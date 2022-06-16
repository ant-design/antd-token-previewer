import { CheckOutlined } from '@ant-design/icons';
import { Dropdown, Input, Menu, Switch } from '@madccc/antd';
import classNames from 'classnames';
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { TokenType } from '../utils/classifyToken';
import {
  classifyToken,
  getTypeOfToken,
  TOKEN_SORTS,
} from '../utils/classifyToken';
import makeStyle from '../utils/makeStyle';
import TokenCard, { IconMap, TextMap } from './token-card';
import type { MutableTheme, TokenName } from '../interface';
import { SearchDropdown } from '../icons';
import { getTokenItemId } from './token-item';

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

        '.previewer-token-type-dropdown-icon-active': {
          color: token.colorPrimary,
        },
      },
    },
  },
}));

export interface TokenPreviewProps {
  themes: MutableTheme[];
  selectedTokens: TokenName[];
  onTokenSelect: (token: TokenName) => void;
  filterTypes: TokenType[];
  onFilterTypesChange?: (types: TokenType[]) => void;
}

export const PreviewContext = React.createContext<
  Omit<TokenPreviewProps, 'filterTypes' | 'onFilterTypesChange'>
>({
  themes: [],
  selectedTokens: [],
  onTokenSelect: () => {},
});

export type TokenPanelRef = {
  scrollToToken: (token: TokenName) => void;
};

export default forwardRef<TokenPanelRef, TokenPreviewProps>(
  (props: TokenPreviewProps, ref) => {
    const { themes } = props;
    const [wrapSSR, hashId] = useStyle();
    const [{ config }] = themes;
    const [search, setSearch] = useState<string>('');
    const [showAll, setShowAll] = useState<boolean>(false);
    const [showTokenListShadowTop, setShowTokenListShadowTop] =
      useState<boolean>(false);
    const cardWrapperRef = useRef<HTMLDivElement>(null);
    const [activeCards, setActiveCards] = useState<TokenType[]>([]);
    const [activeToken, setActiveToken] = useState<TokenName | undefined>();

    const { filterTypes, onFilterTypesChange } = props;

    // TODO: Split AliasToken and SeedToken
    const groupedToken = useMemo(
      () => classifyToken(config.override?.alias ?? {}),
      [config],
    );

    useEffect(() => {
      const handleTokenListScroll = () => {
        setShowTokenListShadowTop((cardWrapperRef.current?.scrollTop ?? 0) > 0);
      };
      cardWrapperRef.current?.addEventListener('scroll', handleTokenListScroll);
      const wrapper = cardWrapperRef.current;
      return () => {
        wrapper?.removeEventListener('scroll', handleTokenListScroll);
      };
    }, []);

    useImperativeHandle(ref, () => ({
      scrollToToken: (token) => {
        const type = getTypeOfToken(token);
        if (!activeCards.includes(type)) {
          setActiveCards((prev) => [...prev, type]);
        }
        setActiveToken(token);
        setTimeout(() => {
          const node = cardWrapperRef.current?.querySelector<HTMLElement>(
            `#${getTokenItemId(token)}`,
          );
          if (!node) {
            return;
          }
          node?.scrollIntoView({
            block: 'center',
            inline: 'nearest',
          });
        }, 100);
      },
    }));

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
                                      opacity: filterTypes.includes(type)
                                        ? 1
                                        : 0,
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
                                onFilterTypesChange?.(
                                  filterTypes.includes(type)
                                    ? filterTypes.filter(
                                        (item) => type !== item,
                                      )
                                    : [...filterTypes, type],
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
                          transition: 'color 0.3s',
                        }}
                        className={classNames({
                          'previewer-token-type-dropdown-icon-active':
                            filterTypes.length > 0,
                        })}
                      />
                    </Dropdown>
                  </>
                }
                className="preview-panel-search"
                placeholder="搜索 Token / 色值 / 文本 / 圆角等"
              />
            </div>
            <div
              className={classNames('preview-panel-token-wrapper', {
                'preview-panel-token-wrapper-ping-top': showTokenListShadowTop,
              })}
            >
              <div
                ref={cardWrapperRef}
                style={{ height: '100%', overflow: 'auto', padding: '0 16px' }}
              >
                <div>
                  {TOKEN_SORTS.filter(
                    (type) =>
                      (filterTypes.includes(type) ||
                        filterTypes.length === 0) &&
                      (!search ||
                        groupedToken[type].some((item) =>
                          item.tokenName.includes(search),
                        )),
                  ).map((key) => (
                    <TokenCard
                      key={key}
                      typeName={key}
                      tokenArr={groupedToken[key]}
                      keyword={search}
                      hideUseless={!showAll}
                      open={activeCards.includes(key)}
                      onOpenChange={(open) =>
                        setActiveCards((prev) =>
                          open
                            ? [...prev, key]
                            : prev.filter((item) => item !== key),
                        )
                      }
                      activeToken={activeToken}
                      onActiveTokenChange={(token) => setActiveToken(token)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </PreviewContext.Provider>,
    );
  },
);
