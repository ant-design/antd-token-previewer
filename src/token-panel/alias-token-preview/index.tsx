import { SearchOutlined } from '@ant-design/icons';
import { Input } from '@madccc/antd';
import classNames from 'classnames';
import React from 'react';
import useToken from '../../hooks/useToken';
import { classifyToken } from '../../utils/classifyToken';
import makeStyle from '../../utils/makeStyle';
import TokenCard from './token-card';

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

export default () => {
  const [wrapSSR, hashId] = useStyle();
  const token = useToken();

  const groupedToken = classifyToken(token);
  // check group
  console.log(groupedToken);

  return wrapSSR(
    <div className={classNames('preview-panel', hashId)}>
      <h3 className={classNames('preview-panel-space', hashId)}>
        Alias Token 预览
      </h3>
      <Input
        onChange={(e) => {
          console.log(e.target.value);
        }}
        bordered={false}
        prefix={<SearchOutlined />}
        className={classNames(
          'preview-panel-search preview-panel-space',
          hashId,
        )}
        placeholder={'  搜索 Token/色值/文本/圆角等'}
      />
      {Object.keys(groupedToken).map((key) => {
        return (
          <TokenCard key={key} typeName={key} tokenArr={groupedToken[key]} />
        );
      })}
    </div>,
  );
};
