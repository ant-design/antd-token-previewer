import {
  AlignLeftOutlined,
  BgColorsOutlined,
  CaretRightOutlined,
  FileUnknownOutlined,
  FontColorsOutlined,
  RadiusSettingOutlined,
  TabletOutlined,
  ControlOutlined,
  BorderHorizontalOutlined,
  FontSizeOutlined,
  FormatPainterOutlined,
  BulbOutlined,
} from '@ant-design/icons';
import { Collapse, Space } from '@madccc/antd';
import classNames from 'classnames';
import type { ReactNode } from 'react';
import React from 'react';
import makeStyle from '../../utils/makeStyle';
import TokenItem from '../token-item';
import type {
  AliasToken,
  MutableTheme,
  TokenName,
  TokenValue,
} from '../../interface';
import { Motion, ShapeLine } from '../../icons';
import type { TokenType } from '../../utils/classifyToken';
import useStatistic from '../../hooks/useStatistic';

const { Panel } = Collapse;

interface TokenCardProps {
  typeName: TokenType;
  tokenArr: {
    tokenName: keyof AliasToken;
    value: TokenValue;
  }[];
  keyword?: string;
  hideUseless?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  activeToken?: TokenName;
  onActiveTokenChange?: (token: TokenName | undefined) => void;
  onTokenChange?: (
    theme: MutableTheme,
    tokenName: string,
    value: TokenValue,
  ) => void;
}

export const IconMap: Record<TokenType, ReactNode> = {
  seed: <BulbOutlined />,
  colorText: <FontColorsOutlined />,
  colorBg: <BgColorsOutlined />,
  colorSplit: <BorderHorizontalOutlined />,
  colorCommon: <FormatPainterOutlined />,
  space: <ShapeLine />,
  font: <FontSizeOutlined />,
  line: <AlignLeftOutlined />,
  screen: <TabletOutlined />,
  motion: <Motion />,
  radius: <RadiusSettingOutlined />,
  control: <ControlOutlined />,
  others: <FileUnknownOutlined />,
};
export const TextMap: Record<TokenType, string> = {
  seed: 'Seed Token',
  colorCommon: 'Common Color 通用颜色',
  colorText: 'Text Color 文本颜色',
  colorBg: 'Background Color 背景颜色',
  colorSplit: 'Split Color 分割线颜色',
  space: 'Space 间距',
  font: 'Font 文本',
  line: 'Line 线',
  screen: 'Screen 屏幕',
  motion: 'Motion 动画',
  radius: 'Radius 圆角',
  control: 'Control 控件',
  others: 'Others 未分类',
};

const useStyle = makeStyle('TokenCard', (token) => ({
  '.token-card': {
    width: '100%',
    height: 'auto',
    borderRadius: token.radiusLG,
    border: `1px solid rgba(0,0,0,0.09)`,
    marginBottom: token.marginSM,

    [`${token.rootCls}-collapse.token-card-collapse`]: {
      [`> ${token.rootCls}-collapse-item > ${token.rootCls}-collapse-header`]: {
        padding: token.paddingSM,
      },
      [`> ${token.rootCls}-collapse-item > ${token.rootCls}-collapse-content > ${token.rootCls}-collapse-content-box`]:
        {
          padding: `0 ${token.paddingXS}px 12px !important`,
        },
    },
  },
  [`.token-card ${token.rootCls}-input-group >${token.rootCls}-input:not(:first-child):not(:last-child)`]:
    {
      background: 'white',
      borderRadius: token.radiusLG,
    },
}));

export default ({
  typeName,
  tokenArr,
  keyword,
  hideUseless,
  open,
  onOpenChange,
  activeToken,
  onActiveTokenChange,
  onTokenChange,
}: TokenCardProps) => {
  const [wrapSSR, hashId] = useStyle();
  const { getRelatedComponents } = useStatistic();

  return wrapSSR(
    <div className={classNames('token-card', hashId)}>
      <Collapse
        ghost
        expandIcon={({ isActive }) => (
          <CaretRightOutlined
            rotate={isActive ? 450 : 360}
            style={{ fontSize: 12, color: 'rgba(0,0,0,0.45)' }}
          />
        )}
        expandIconPosition="right"
        className="token-card-collapse"
        activeKey={open ? '1' : undefined}
        onChange={(keys) => {
          onOpenChange?.(keys.length > 0);
        }}
      >
        <Panel
          header={
            <Space size="small">
              <span>{IconMap[typeName]}</span>
              <span>{TextMap[typeName]}</span>
            </Space>
          }
          key="1"
        >
          {tokenArr
            .filter(
              (item) =>
                (!keyword ||
                  item.tokenName
                    .toLowerCase()
                    .includes(keyword.toLowerCase())) &&
                (!hideUseless ||
                  getRelatedComponents(item.tokenName).length > 0),
            )
            .map(({ tokenName }) => (
              <TokenItem
                onActiveChange={(active) =>
                  onActiveTokenChange?.(active ? tokenName : undefined)
                }
                active={activeToken === tokenName}
                tokenName={tokenName}
                key={tokenName}
                onTokenChange={onTokenChange}
              />
            ))}
        </Panel>
      </Collapse>
    </div>,
  );
};
