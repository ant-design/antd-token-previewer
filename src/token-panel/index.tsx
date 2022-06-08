import { CheckOutlined, SearchOutlined } from '@ant-design/icons';
import { Dropdown, Input, Menu, Tag } from '@madccc/antd';
import type { ThemeConfig } from '@madccc/antd/es/config-provider/context';
import classNames from 'classnames';
import React, { useMemo, useState } from 'react';
import { classifyToken, TOKEN_SORTS } from '../utils/classifyToken';
import makeStyle from '../utils/makeStyle';
import TokenCard, { IconMap, TextMap } from './token-card';
import type { Theme } from '../interface';

const useStyle = makeStyle('AliasTokenPreview', (token) => ({
  '.preview-panel': {
    height: '100%',
    minWidth: 300,
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    '.preview-panel-space': {
      marginBottom: 20,
      paddingInlineStart: token.paddingXS,
    },
    '.preview-panel-search': {
      backgroundColor: 'rgba(0, 0, 0, 2%)',
      borderRadius: token.radiusLG,
      transition: `background-color ${token.motionDurationSlow}`,

      input: {
        fontSize: token.fontSizeSM,
      },

      '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 4%)',
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
  const [filterTypes, setFilterTypes] = useState<string[]>([]);

  const { selectedTokens, onTokenSelect } = props;

  // TODO: Split AliasToken and SeedToken
  const groupedToken = useMemo(
    () => classifyToken(config.override?.derivative ?? {}),
    [config],
  );
  // const displayTokens = useMemo(() => {
  //   if (!search) {
  //     return groupedToken;
  //   }
  //   return Object.entries(groupedToken).reduce(
  //     (acc, [tokenType, tokenList]) => {
  //       // name match
  //       if (tokenType.includes(search) || TextMap[tokenType].includes(search)) {
  //         acc[tokenType] = tokenList;
  //         return acc;
  //       }
  //
  //       // value match
  //       const targetTokens = tokenList.filter(
  //         ({ tokenName, value }) =>
  //           tokenName.includes(search) || `${value}`?.includes(search),
  //       );
  //       if (targetTokens.length > 0) {
  //         acc[tokenType] = acc[tokenType] || [];
  //         acc[tokenType].push(...targetTokens);
  //       }
  //       return acc;
  //     },
  //     {} as typeof groupedToken,
  //   );
  // }, [groupedToken, search]);

  return wrapSSR(
    <PreviewContext.Provider value={props}>
      <div className={classNames('preview-panel', hashId)}>
        <div style={{ padding: 16 }}>
          <h3 className={classNames('preview-panel-space', hashId)}>
            Alias Token 预览
          </h3>
          <Input
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            bordered={false}
            prefix={
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
                  <SearchOutlined style={{ marginRight: 8 }} />
                </Dropdown>
                {filterTypes.map((item) => (
                  <Tag
                    color="#108ee9"
                    key={item}
                    closable
                    onClose={() =>
                      setFilterTypes((prev) =>
                        prev.filter((type) => type !== item),
                      )
                    }
                  >
                    {item}
                  </Tag>
                ))}
              </>
            }
            className={classNames('preview-panel-search', hashId)}
            placeholder="搜索 Token / 色值 / 文本 / 圆角等"
          />
          {selectedTokens.length > 0 && (
            <div style={{ marginTop: 16 }}>
              {selectedTokens.map((token) => (
                <Tag
                  key={token}
                  style={{ color: '#000' }}
                  closable
                  onClose={() => onTokenSelect(token)}
                >
                  {token}
                </Tag>
              ))}
            </div>
          )}
        </div>
        <div style={{ flex: 1, overflow: 'auto', padding: '0 16px' }}>
          {TOKEN_SORTS.filter(
            (type) => filterTypes.includes(type) || filterTypes.length === 0,
          ).map((key) => (
            <TokenCard
              key={key}
              typeName={key}
              tokenArr={groupedToken[key]}
              keyword={search}
            />
          ))}
        </div>
      </div>
    </PreviewContext.Provider>,
  );
};
