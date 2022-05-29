import { SearchOutlined } from '@ant-design/icons';
import { Input } from '@madccc/antd';
import classNames from 'classnames';
import React, { useMemo, useState } from 'react';
import { classifyToken } from '../utils/classifyToken';
import makeStyle from '../utils/makeStyle';
import TokenCard, { TextMap } from './token-card';
import type { ThemeConfig } from '@madccc/antd/es/config-provider/context';

const useStyle = makeStyle('AliasTokenPreview', (token) => ({
  '.preview-panel': {
    height: '100%',
    width: 330,
    padding: token.paddingXS,
    backgroundColor: 'white',
    '.preview-panel-space': {
      marginBottom: '25px',
    },
    '.preview-panel-search': {
      backgroundColor: `${token.colorSplit}`,
    },
  },
}));

export interface TokenPreviewProps {
  themes: {
    title: string;
    token: ThemeConfig['token'];
    onTokenChange: (v: any) => void;
  }[];
  selectedTokens: string[];
  onSelectToken: (token: string) => void;
}

export const PreviewContext = React.createContext<TokenPreviewProps>({
  themes: [],
  selectedTokens: [],
  onSelectToken: () => {},
});

export default (props: TokenPreviewProps) => {
  const { themes } = props;
  const [wrapSSR, hashId] = useStyle();
  const [{ token }] = themes;
  const [search, setSearch] = useState<string>('');
  const groupedToken = useMemo(() => classifyToken(token), [token]);
  const displayTokens = useMemo(() => {
    if (!search) {
      return groupedToken;
    }
    return Object.entries(groupedToken).reduce(
      (acc, [tokenType, tokenList]) => {
        // name match
        if (tokenType.includes(search) || TextMap[tokenType].includes(search)) {
          acc[tokenType] = tokenList;
          return acc;
        }

        // value match
        const targetTokens = tokenList.filter(
          ({ tokenName, value }) =>
            tokenName.includes(search) || `${value}`?.includes(search),
        );
        if (targetTokens.length > 0) {
          acc[tokenType] = acc[tokenType] || [];
          acc[tokenType].push(...targetTokens);
        }
        return acc;
      },
      {} as typeof groupedToken,
    );
  }, [groupedToken, search]);

  return wrapSSR(
    <PreviewContext.Provider value={props}>
      <div className={classNames('preview-panel', hashId)}>
        <h3 className={classNames('preview-panel-space', hashId)}>
          Alias Token 预览
        </h3>
        <Input
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          bordered={false}
          prefix={<SearchOutlined style={{ marginRight: 8 }} />}
          className={classNames(
            'preview-panel-search preview-panel-space',
            hashId,
          )}
          placeholder={'搜索 Token / 色值 / 文本 / 圆角等'}
        />
        {Object.keys(displayTokens).map((key) => (
          <TokenCard key={key} typeName={key} tokenArr={groupedToken[key]} />
        ))}
      </div>
    </PreviewContext.Provider>,
  );
};
