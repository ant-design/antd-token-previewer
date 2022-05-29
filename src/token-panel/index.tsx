import { SearchOutlined } from '@ant-design/icons';
import { Input } from '@madccc/antd';
import classNames from 'classnames';
import React, { useMemo, useState } from 'react';
import { classifyToken } from '../utils/classifyToken';
import makeStyle from '../utils/makeStyle';
import TokenCard, { TextMap } from './token-card';
import type { ThemeConfig } from '@madccc/antd/es/config-provider/context';
import type { Theme } from '../interface';

const useStyle = makeStyle('AliasTokenPreview', (token) => ({
  '.preview-panel': {
    height: '100%',
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

interface MutableTheme extends Theme {
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
  // TODO: Split AliasToken and SeedToken
  const groupedToken = useMemo(
    () => classifyToken(config.override?.derivative ?? {}),
    [config],
  );
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
