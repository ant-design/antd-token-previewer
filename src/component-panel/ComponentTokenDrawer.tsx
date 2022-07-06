import type { FC } from 'react';
import React, { useMemo } from 'react';
import classNames from 'classnames';
import type { TableProps } from 'antd';
import { Divider, Drawer, Table, Tag } from 'antd';
import makeStyle from '../utils/makeStyle';
import TokenInput from '../TokenInput';
import type { OverrideToken } from 'antd/es/theme/interface';
import useStatistic from '../hooks/useStatistic';
import type { MutableTheme, TokenName } from '../interface';
import getDesignToken from '../utils/getDesignToken';

const useStyle = makeStyle('ComponentTokenDrawer', (token) => ({
  '.previewer-component-token-drawer': {
    '.previewer-component-drawer-subtitle': {
      fontWeight: token.fontWeightStrong,
      marginBottom: token.marginSM,
      marginInlineStart: token.marginXS,
      color: token.colorText,
    },

    '.previewer-component-token-drawer-theme': {
      fontWeight: 'normal',
      marginInlineStart: 8,
      borderRadius: 4,
      backgroundColor: token.colorInfoBg,
      color: token.colorPrimary,
      borderColor: token.colorInfoBg,
    },

    [`${token.rootCls}-table-wrapper.component-token-table`]: {
      [`${token.rootCls}-table-cell`]: {
        borderBottom: 'none',
      },

      [`${token.rootCls}-table-row:hover > td`]: {
        backgroundColor: `${token.colorBgContainer} !important`,
      },

      [`th${token.rootCls}-table-cell`]: {
        background: token.colorBgContainer,
        fontSize: token.fontSizeSM,
        color: token.colorTextSecondary,
        fontWeight: 'normal',

        '&:not(:last-child)::before': {
          backgroundColor: 'transparent !important',
        },
      },

      [`td${token.rootCls}-table-cell:first-child::before`]: {
        position: 'absolute',
        top: '50%',
        insetInlineEnd: 0,
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
          marginInlineEnd: token.marginXS,
        },
      },

      '.component-token-value-color-tag': {
        backgroundColor: token.colorBgContainerSecondary,
        borderRadius: token.radiusLG,
        padding: '4px 8px',
        minWidth: 140,
      },
    },
  },
}));

export type ComponentTokenDrawerProps = {
  visible?: boolean;
  component: string;
  onClose?: () => void;
  theme: MutableTheme;
  onTokenClick?: (token: TokenName) => void;
};

const ComponentTokenDrawer: FC<ComponentTokenDrawerProps> = ({
  visible,
  component,
  onClose,
  theme,
  onTokenClick,
}) => {
  const [, hashId] = useStyle();

  const { getComponentToken } = useStatistic();
  const { component: componentToken, global: aliasTokenNames } =
    getComponentToken(component) || { global: [] };

  const componentTokenColumns: TableProps<{
    name: string;
    value: any;
  }>['columns'] = [
    {
      dataIndex: 'name',
      title: 'Name',
    },
    {
      dataIndex: 'value',
      title: 'Value',
      render: ({ tokenName, value }: any) => {
        return (
          <TokenInput
            light
            value={value}
            onChange={(newValue) => {
              theme.onThemeChange?.({
                ...theme.config,
                override: {
                  ...theme.config.override,
                  [component]: {
                    ...theme.config.override?.[
                      component as keyof OverrideToken
                    ],
                    [tokenName]: newValue,
                  },
                },
              });
            }}
          />
        );
      },
    },
  ];

  const aliasTokenColumns: TableProps<{ name: string; value: any }>['columns'] =
    [
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
        render: ({ value }) => {
          return <TokenInput light value={value} readonly />;
        },
      },
    ];

  const componentTokenData = useMemo(
    () =>
      Object.entries(componentToken ?? {}).map(([key, value]) => ({
        name: key,
        value: {
          tokenName: key,
          value: (theme.config.override as any)?.[component]?.[key] ?? value,
        },
      })),
    [componentToken, theme, component],
  );

  const aliasTokenData = useMemo(() => {
    return aliasTokenNames.sort().map((tokenName) => ({
      name: tokenName,
      value: {
        tokenName,
        value:
          (theme.config.override?.alias as any)?.[tokenName] ??
          (getDesignToken(theme.config) as any)[tokenName],
      },
    }));
  }, [aliasTokenNames, theme.config]);

  return (
    <Drawer
      mask={false}
      visible={visible}
      title={
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span>{`${component} 组件 Token`}</span>
          <Tag className="previewer-component-token-drawer-theme">
            {theme.name}
          </Tag>
        </div>
      }
      onClose={onClose}
      width={600}
      className={classNames('previewer-component-token-drawer', hashId)}
    >
      <div className="previewer-component-drawer-subtitle">Component Token</div>
      <Table
        className="component-token-table"
        dataSource={componentTokenData}
        columns={componentTokenColumns}
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
        columns={aliasTokenColumns}
        rowKey="name"
        size="small"
        pagination={false}
      />
    </Drawer>
  );
};

export default ComponentTokenDrawer;
