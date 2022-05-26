import { SearchOutlined } from '@ant-design/icons';
import { Input } from '@madccc/antd';
import { GlobalToken } from '@madccc/antd/lib/_util/theme/interface';
import classNames from 'classnames';
import React, { useMemo, useState } from 'react';
import { classifyToken } from '../../utils/classifyToken';
import makeStyle from '../../utils/makeStyle';
import TokenCard, { TextMap } from './token-card';

const useStyle = makeStyle('AliasTokenPreview', (token) => ({
  '.preview-panel': {
    width: '20vw',
    height: '100%',
    backgroundColor: 'white',
    padding: '20px',
    paddingTop: '40px',
    '.preview-panel-space': {
      marginBottom: '25px',
    },
    '.preview-panel-search': {
      backgroundColor: `${token.colorSplit}`,
    },
  },
}));

export interface TokenPreviewProps {
  tokens: {
    title: string;
    token: GlobalToken;
    onTokenChange: (v: any) => {};
  }[];
  selectedTokens: { tokenName: string }[];
  onSelectedTokens: (v: { tokenName: string }[]) => void;
}

export const PreviewContext = React.createContext<TokenPreviewProps>(null);

export default (props: TokenPreviewProps) => {
  const { tokens } = props;
  const [wrapSSR, hashId] = useStyle();
  const [{ token }] = tokens;
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
      {},
    ) as typeof groupedToken;
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
        {Object.keys(displayTokens).map((key) => {
          return (
            <TokenCard key={key} typeName={key} tokenArr={groupedToken[key]} />
          );
        })}
      </div>
    </PreviewContext.Provider>,
  );
};
