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
} from '@ant-design/icons';
import { Collapse, Space } from '@madccc/antd';
import classNames from 'classnames';
import type { ReactNode } from 'react';
import React from 'react';
import makeStyle from '../../utils/makeStyle';
import TokenItem from '../token-item';
import type { TokenName, TokenValue } from '../../interface';

import type { ThemeConfig } from '@madccc/antd/es/config-provider/context';
import { Motion, ShapeLine } from '../../icons';
import type { TokenType } from '../../utils/classifyToken';
import useStatistic from '../../hooks/useStatistic';

const { Panel } = Collapse;

interface TokenCardProps {
  typeName: TokenType;
  tokenArr: {
    tokenName: keyof Exclude<ThemeConfig['token'], undefined>;
    value: TokenValue;
  }[];
  keyword?: string;
  hideUseless?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  activeToken?: TokenName;
  onActiveTokenChange?: (token: TokenName | undefined) => void;
}

export const IconMap: Record<TokenType, ReactNode> = {
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
    marginBottom: token.margin,

    '.ant-input-group-addon, .ant-input-number-group-addon': {
      border: '0 !important',
      color: `rgba(0, 0, 0, 0.25) !important`,
      fontSize: `${token.fontSizeSM}px !important`,
      padding: 0,

      '&:first-child': {
        paddingInlineStart: 0,
      },

      '&:last-child': {
        paddingInlineEnd: 0,
      },
    },

    '.ant-input-group-wrapper, .ant-input-number-group-wrapper': {
      padding: 0,
      height: token.controlHeightSM,

      input: {
        fontSize: token.fontSizeSM,
        lineHeight: token.lineHeightSM,
        padding: `2px ${token.paddingXS}px`,
        height: token.controlHeightSM,
      },
    },

    '.ant-input-group-wrapper .ant-input, .ant-input-number-group-wrapper .ant-input-number':
      {
        background: 'white',
        borderRadius: token.radiusLG,
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
      },

    '.ant-collapse.token-card-collapse': {
      '> .ant-collapse-item > .ant-collapse-header': {
        padding: token.paddingSM,
      },
      '> .ant-collapse-item > .ant-collapse-content > .ant-collapse-content-box':
        {
          padding: `0 ${token.paddingXS}px 12px !important`,
        },
    },
  },

  // FIXME antd collapse expandIconPosition not work
  '.token-card .ant-collapse-icon-position-right .ant-collapse-header:not(.ant-collapse-icon-position-left .ant-collapse-header) > div:first-child':
    {
      position: 'absolute',
      right: 8,
    },
  '.token-card .ant-input-group >.ant-input:not(:first-child):not(:last-child)':
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
            style={{ fontSize: 12 }}
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
              />
            ))}
        </Panel>
      </Collapse>
    </div>,
  );
};
