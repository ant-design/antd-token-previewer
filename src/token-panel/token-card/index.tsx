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
import { Collapse, Space } from 'antd';
import classNames from 'classnames';
import type { ReactNode } from 'react';
import React from 'react';
import makeStyle from '../../utils/makeStyle';
import TokenItem from '../token-item';
import type { MutableTheme, TokenName, TokenValue } from '../../interface';
import { Motion, ShapeLine } from '../../icons';
import type { TokenType } from '../../utils/classifyToken';
import useStatistic from '../../hooks/useStatistic';
import useMergedState from 'rc-util/es/hooks/useMergedState';
import type { ThemeConfig } from 'antd/es/config-provider/context';

const { Panel } = Collapse;

interface TokenCardProps {
  title: string;
  icon?: ReactNode;
  tokenArr: string[];
  tokenPath: string[];
  keyword?: string;
  hideUseless?: boolean;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  activeToken?: TokenName;
  onActiveTokenChange?: (token: string | undefined) => void;
  onTokenChange?: (
    theme: MutableTheme,
    tokenName: string,
    value: TokenValue,
  ) => void;
  themes: MutableTheme[];
  selectedTokens?: TokenName[];
  onTokenSelect?: (token: TokenName) => void;
  enableTokenSelect?: boolean;
  hideUsageCount?: boolean;
  fallbackConfig?: ThemeConfig;
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
          padding: {
            _skip_check_: true,
            value: `0 ${token.paddingXS}px 12px !important`,
          },
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
  title,
  icon,
  tokenArr,
  keyword,
  hideUseless,
  defaultOpen,
  open: customOpen,
  onOpenChange,
  activeToken,
  onActiveTokenChange,
  onTokenChange,
  tokenPath,
  selectedTokens,
  themes,
  onTokenSelect,
  enableTokenSelect,
  hideUsageCount,
  fallbackConfig,
}: TokenCardProps) => {
  const [wrapSSR, hashId] = useStyle();
  const { getRelatedComponents } = useStatistic();
  const [open, setOpen] = useMergedState(false, {
    onChange: onOpenChange,
    defaultValue: defaultOpen,
    value: customOpen,
  });

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
          // onOpenChange?.(keys.length > 0);
          setOpen(keys.length > 0);
        }}
      >
        <Panel
          header={
            <Space size="small">
              <span>{title}</span>
              <span>{icon}</span>
            </Space>
          }
          key="1"
        >
          {tokenArr
            .filter(
              (tokenName) =>
                (!keyword ||
                  tokenName.toLowerCase().includes(keyword.toLowerCase())) &&
                (!hideUseless || getRelatedComponents(tokenName).length > 0),
            )
            .map((tokenName) => (
              <TokenItem
                tokenPath={tokenPath}
                onActiveChange={(active) =>
                  onActiveTokenChange?.(active ? tokenName : undefined)
                }
                active={activeToken === tokenName}
                tokenName={tokenName}
                key={tokenName}
                onTokenChange={onTokenChange}
                themes={themes}
                selectedTokens={selectedTokens}
                onTokenSelect={onTokenSelect}
                enableTokenSelect={enableTokenSelect}
                hideUsageCount={hideUsageCount}
                fallbackConfig={fallbackConfig}
              />
            ))}
        </Panel>
      </Collapse>
    </div>,
  );
};
