import {
  AlignLeftOutlined,
  BgColorsOutlined,
  CaretRightOutlined,
  FileUnknownOutlined,
  FontColorsOutlined,
  RadiusSettingOutlined,
  TabletOutlined,
  ControlOutlined,
} from '@ant-design/icons';
import { Collapse, Space } from '@madccc/antd';
import classNames from 'classnames';
import type { ReactNode } from 'react';
import React from 'react';
import makeStyle from '../../utils/makeStyle';
import TokenItem from '../token-item';
import type { TokenValue } from '../../interface';

import type { ThemeConfig } from '@madccc/antd/es/config-provider/context';
import { Motion, ShapeLine } from '../../icons';

const { Panel } = Collapse;

interface TokenCardProps {
  typeName: string;
  tokenArr: {
    tokenName: keyof Exclude<ThemeConfig['token'], undefined>;
    value: TokenValue;
  }[];
}

const IconMap: Record<string, ReactNode> = {
  color: <BgColorsOutlined />,
  space: <ShapeLine />,
  font: <FontColorsOutlined />,
  line: <AlignLeftOutlined />,
  screen: <TabletOutlined />,
  motion: <Motion />,
  radius: <RadiusSettingOutlined />,
  control: <ControlOutlined />,
  others: <FileUnknownOutlined />,
};
export const TextMap: Record<string, string> = {
  color: 'Color 色彩',
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
    border: `1px solid ${token.colorBorder}`,
    marginBottom: token.margin,

    '.ant-input-group-addon, .ant-input-number-group-addon': {
      border: '0 !important',
      color: `rgba(0, 0, 0, 0.25) !important`,
      fontSize: token.fontSizeSM,

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
      },
    },

    '.ant-input-group-wrapper .ant-input, .ant-input-number-group-wrapper .ant-input-number':
      {
        background: 'white',
        borderRadius: token.radiusLG,
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
      },

    '.ant-collapse': {
      '> .ant-collapse-item > .ant-collapse-header': {
        padding: token.paddingSM,
      },
      '.ant-collapse-content-box': {
        padding: `0 ${token.paddingXS}px !important`,
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

export default ({ typeName, tokenArr }: TokenCardProps) => {
  const [wrapSSR, hashId] = useStyle();

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
          {tokenArr.map((item) => (
            <TokenItem tokenName={item.tokenName} key={item.tokenName} />
          ))}
        </Panel>
      </Collapse>
    </div>,
  );
};
