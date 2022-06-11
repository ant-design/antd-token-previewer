import type { FC, PropsWithChildren } from 'react';
import type { TableProps } from '@madccc/antd';
import { Card, Divider, Drawer, Table } from '@madccc/antd';
import React, { useMemo, useState } from 'react';
import { Control } from '../icons';
import makeStyle from '../utils/makeStyle';
import classNames from 'classnames';
import useStatistic from '../hooks/useStatistic';
import ColorPreview from '../ColorPreview';
import type { AliasToken, Theme, TokenName } from '../interface';

const useStyle = makeStyle('ComponentCard', (token) => ({
  '.ant-card.component-card': {
    borderRadius: 6,
    boxShadow: `0 1px 2px 0 rgba(25,15,15,0.07)`,

    '.ant-card-head': {
      paddingInline: 18,

      '.ant-card-head-title': {
        paddingBlock: token.paddingSM,
        fontSize: token.fontSize,
      },
    },

    '.ant-card-body': {
      padding: 18,
      overflow: 'auto',
    },

    '.component-token-control-icon': {
      color: token.colorAction,
      transition: `color ${token.motionDurationMid}`,
      fontSize: token.fontSizeLG,
      cursor: 'pointer',

      '&:hover': {
        color: token.colorActionHover,
      },
    },
  },

  '.previewer-component-drawer-subtitle': {
    fontWeight: token.fontWeightStrong,
    marginBottom: token.marginSM,
    marginInlineStart: token.marginXS,
  },

  '.ant-table-wrapper.component-token-table': {
    '.ant-table-cell': {
      borderBottom: 'none',
    },

    'th.ant-table-cell': {
      background: token.colorBgComponent,
      fontSize: token.fontSizeSM,
      color: token.colorTextSecondary,
      fontWeight: 'normal',

      '&:not(:last-child)::before': {
        backgroundColor: 'transparent !important',
      },
    },

    'td.ant-table-cell:first-child::before': {
      position: 'absolute',
      top: '50%',
      right: 0,
      width: 1,
      height: '1.6em',
      backgroundColor: token.colorSplit,
      transform: 'translateY(-50%)',
      transition: `background-color ${token.motionDurationMid}`,
      content: '""',
    },

    '.component-token-value-color': {
      display: 'flex',
      alignItems: 'center',

      '.component-token-value-color-preview': {
        marginRight: token.marginXS,
      },
    },

    '.component-token-value-color-tag': {
      backgroundColor: token.colorBgComponentSecondary,
      borderRadius: token.radiusLG,
      padding: '4px 8px',
      minWidth: 140,
    },
  },
}));

export const getComponentDemoId = (component: string) =>
  `antd-token-previewer-${component}`;

export type ComponentCardProps = PropsWithChildren<{
  component: string;
  theme: Theme;
  onTokenClick?: (token: TokenName) => void;
}>;

const ComponentCard: FC<ComponentCardProps> = ({
  children,
  component,
  theme,
  onTokenClick,
}) => {
  const [wrapSSR, hashId] = useStyle();
  const [tokenDrawerOpen, setTokenDrawerOpen] = useState<boolean>(false);
  const { getComponentToken } = useStatistic();

  const { component: componentToken, global: aliasTokenNames } =
    getComponentToken(component) || { global: [] };

  const columns: TableProps<{ name: string; value: any }>['columns'] = [
    {
      dataIndex: 'name',
      title: 'Name',
      render: (value) => (
        <span
          style={{ cursor: 'pointer' }}
          onClick={() => onTokenClick?.(value)}
        >
          {value}
        </span>
      ),
    },
    {
      dataIndex: 'value',
      title: 'Value',
      render: (value) => {
        if (
          typeof value === 'string' &&
          (value.includes('#') || value.includes('rgb'))
        ) {
          return (
            <div className="component-token-value-color">
              <ColorPreview
                color={value}
                className="component-token-value-color-preview"
              />
              <div className="component-token-value-color-tag">{value}</div>
            </div>
          );
        }
        return value;
      },
    },
  ];

  const componentTokenData = useMemo(
    () =>
      Object.entries(componentToken ?? {}).map(([key, value]) => ({
        name: key,
        value,
      })),
    [componentToken],
  );

  const aliasTokenData = useMemo(() => {
    return aliasTokenNames.sort().map((tokenName) => ({
      name: tokenName,
      value: theme.config.override?.alias?.[tokenName as keyof AliasToken],
    }));
  }, [aliasTokenNames, theme.config.override?.alias]);

  return wrapSSR(
    <div>
      <Card
        className={classNames('component-card', hashId)}
        title={component}
        extra={
          <Control
            className="component-token-control-icon"
            onClick={() => setTokenDrawerOpen((prev) => !prev)}
          />
        }
      >
        {children}
      </Card>
      <Drawer
        visible={tokenDrawerOpen}
        title={`${component} 组件 Token`}
        onClose={() => setTokenDrawerOpen(false)}
        width={600}
      >
        <div
          className={classNames('previewer-component-drawer-subtitle', hashId)}
        >
          Component Token
        </div>
        <Table
          className={classNames('component-token-table', hashId)}
          dataSource={componentTokenData}
          columns={columns}
          rowKey="name"
          size="small"
          pagination={false}
          style={{ marginBottom: 24 }}
        />
        <Divider />
        <div
          className={classNames('previewer-component-drawer-subtitle', hashId)}
        >
          Alias Token
        </div>
        <Table
          className={classNames('component-token-table', hashId)}
          dataSource={aliasTokenData}
          columns={columns}
          rowKey="name"
          size="small"
          pagination={false}
        />
      </Drawer>
    </div>,
  );
};

export default ComponentCard;
