import type { FC } from 'react';
import React, { useMemo } from 'react';
import type { MutableTheme } from 'antd-token-previewer';
import type { SeedToken } from 'antd/es/theme/interface';
import { Button, Collapse, Empty, Tooltip } from 'antd';
import {
  CaretRightOutlined,
  QuestionCircleOutlined,
  RightOutlined,
  ShrinkOutlined,
} from '@ant-design/icons';
import { getRelatedComponents } from '../utils/statistic';
import { Pick } from '../icons';
import classNames from 'classnames';
import TokenDetail from './TokenDetail';
import type { AliasToken, SelectedToken } from '../interface';
import { mapRelatedAlias, seedRelatedAlias } from '../token-info/TokenRelation';
import makeStyle from '../utils/makeStyle';
import useMergedState from 'rc-util/es/hooks/useMergedState';

const { Panel } = Collapse;

const useStyle = makeStyle('TokenPanelProAlias', (token) => ({
  '.token-panel-pro-color-alias': {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 45,
    borderTop: `1px solid ${token.colorSplit}`,

    '.token-panel-pro-color-alias-title': {
      display: 'flex',
      alignItems: 'center',
      padding: '0 16px',
      flex: '0 0 60px',

      '&-text': {
        fontSize: token.fontSizeLG,
        fontWeight: token.fontWeightStrong,
      },
    },
    [`.token-panel-pro-alias-collapse${token.rootCls}-collapse`]: {
      [`> ${token.rootCls}-collapse-item > ${token.rootCls}-collapse-content > ${token.rootCls}-collapse-content-box`]:
        {
          paddingBlock: '0',
        },

      [`> ${token.rootCls}-collapse-item`]: {
        [`> ${token.rootCls}-collapse-header`]: {
          alignItems: 'center',
          padding: '8px 16px',
          [`> ${token.rootCls}-collapse-header-text`]: {
            flex: 1,

            '.token-panel-pro-token-collapse-map-collapse-count': {
              color: token.colorTextSecondary,
              display: 'inline-block',
              fontSize: 12,
              lineHeight: '16px',
              padding: '0 6px',
              backgroundColor: token.colorFillAlter,
              borderRadius: 999,
            },
          },

          '.token-panel-pro-token-picked': {
            color: token.colorPrimary,
          },
        },
      },
    },

    '.token-panel-pro-color-alias-expand': {
      height: '100%',
      width: 20,
      transform: 'translateX(-50%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',

      '&:hover': {
        '.token-panel-pro-color-alias-expand-handler': {
          opacity: 1,
        },
      },

      '.token-panel-pro-color-alias-expand-handler': {
        height: 100,
        width: 16,
        borderRadius: 999,
        border: `1px solid ${token.colorSplit}`,
        backgroundColor: '#fff',
        margin: 'auto',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0,
        transition: 'box-shadow 0.2s',

        '&:hover': {
          boxShadow: token.boxShadow,
        },
      },
    },
  },
}));

export type AliasPanelProps = {
  className?: string;
  style?: React.CSSProperties;
  themes: MutableTheme[];
  activeSeed: keyof SeedToken;
  selectedTokens?: SelectedToken;
  onTokenSelect?: (token: string, type: keyof SelectedToken) => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

const AliasPanel: FC<AliasPanelProps> = ({
  className,
  activeSeed,
  themes,
  style,
  selectedTokens,
  onTokenSelect,
  open: customOpen,
  onOpenChange,
}) => {
  const [wrapSSR, hashId] = useStyle();
  const [open, setOpen] = useMergedState(customOpen ?? true, {
    value: customOpen,
    onChange: onOpenChange,
  });

  const shownAlias = useMemo(
    () =>
      (selectedTokens?.map?.length
        ? Array.from(
            new Set(
              selectedTokens?.map.reduce<string[]>((result, map) => {
                return result.concat(...((mapRelatedAlias as any)[map] ?? []));
              }, []),
            ),
          )
        : seedRelatedAlias[activeSeed]
      )?.sort(),
    [selectedTokens, activeSeed],
  );

  return wrapSSR(
    <div
      className={classNames(className, 'token-panel-pro-color-alias', hashId)}
      style={style}
    >
      {open ? (
        <>
          <div className="token-panel-pro-color-alias-title">
            <span className="token-panel-pro-color-alias-title-text">
              Alias Token
            </span>
            <Tooltip title="TBD">
              <QuestionCircleOutlined style={{ fontSize: 14, marginLeft: 4 }} />
            </Tooltip>
            <Button
              type="text"
              icon={<ShrinkOutlined />}
              style={{ marginLeft: 'auto' }}
              onClick={() => setOpen(false)}
            />
          </div>
          <div style={{ flex: 1, overflow: 'auto' }}>
            <Collapse
              className="token-panel-pro-alias-collapse"
              ghost
              expandIcon={({ isActive }) => (
                <CaretRightOutlined
                  rotate={isActive ? 90 : 0}
                  style={{ fontSize: 12 }}
                />
              )}
            >
              {shownAlias?.map((aliasToken) => (
                <Panel
                  header={
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <span style={{ marginRight: 8 }}>{aliasToken}</span>
                      <span className="token-panel-pro-token-collapse-map-collapse-count">
                        {getRelatedComponents(aliasToken).length}
                      </span>
                      <div
                        style={{ padding: 4, marginLeft: 'auto' }}
                        onClick={(e) => {
                          e.stopPropagation();
                          onTokenSelect?.(aliasToken, 'alias');
                        }}
                      >
                        <Pick
                          className={classNames('token-panel-pro-token-pick', {
                            'token-panel-pro-token-picked':
                              selectedTokens?.alias?.includes(aliasToken),
                          })}
                        />
                      </div>
                    </div>
                  }
                  key={aliasToken}
                >
                  <TokenDetail
                    style={{ paddingBottom: 10 }}
                    themes={themes}
                    path={['override', 'alias']}
                    tokenName={aliasToken as keyof AliasToken}
                  />
                </Panel>
              ))}
            </Collapse>
            {!shownAlias?.length && (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="???????????? Alias Token"
              />
            )}
          </div>
        </>
      ) : (
        <div className="token-panel-pro-color-alias-expand">
          <div
            className="token-panel-pro-color-alias-expand-handler"
            onClick={() => setOpen(true)}
          >
            <RightOutlined style={{ fontSize: 12 }} />
          </div>
        </div>
      )}
    </div>,
  );
};

export default AliasPanel;
