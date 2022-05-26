import {
  AlignLeftOutlined,
  BgColorsOutlined,
  FontSizeOutlined,
  GatewayOutlined,
  PlayCircleOutlined,
  TabletOutlined,
  CaretRightOutlined,
} from '@ant-design/icons';
import { Collapse } from '@madccc/antd';
import '@madccc/antd/dist/@MadCcc/antd.css';
import classNames from 'classnames';
import type { ReactNode } from 'react';
import React from 'react';
import makeStyle from '../../../utils/makeStyle';
import TokenItem from '../token-item';

const { Panel } = Collapse;

interface TokenCardProps {
  typeName: string;
  tokenArr: { tokenName: string; value: string }[];
}

const IconMap: Record<string, ReactNode> = {
  color: <BgColorsOutlined />,
  space: <GatewayOutlined />,
  font: <FontSizeOutlined />,
  line: <AlignLeftOutlined />,
  screen: <TabletOutlined />,
  motion: <PlayCircleOutlined />,
};
export const TextMap: Record<string, string> = {
  color: 'color 色彩',
  space: 'space 间距',
  font: 'font 字',
  line: 'line 行',
  screen: 'screen 屏幕',
  motion: 'motion 动画',
  else: '未分类',
};

const useStyle = makeStyle('TokenCard', (token) => ({
  '.token-card': {
    width: '100%',
    height: 'auto',
    borderRadius: token.radiusLG,
    border: `1px solid ${token.colorBorder}`,
    marginBottom: token.margin,
  },
}));

export default ({ typeName, tokenArr }: TokenCardProps) => {
  const [wrapSSR, hashId] = useStyle();

  return wrapSSR(
    <div className={classNames('token-card', hashId)}>
      <Collapse
        ghost
        expandIcon={({ isActive }) => (
          <CaretRightOutlined rotate={isActive ? 90 : 0} />
        )}
      >
        <Panel
          header={
            <div>
              {IconMap[typeName]} {TextMap[typeName]}
            </div>
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
