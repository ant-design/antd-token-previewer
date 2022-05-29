import type { FC, PropsWithChildren } from 'react';
import type { TableProps } from '@madccc/antd';
import { Card, Drawer, Table } from '@madccc/antd';
import React, { useMemo, useState } from 'react';
import { ControlOutlined } from '@ant-design/icons';
import makeStyle from '../utils/makeStyle';
import classNames from 'classnames';
import useStatistic from '../hooks/useStatistic';

const useStyle = makeStyle('ComponentCard', (token) => ({
  '.component-card': {
    borderRadius: 6,
    boxShadow: `0 1px 2px 0 rgba(25,15,15,0.07)`,

    '.component-token-control-icon': {
      color: token.colorAction,
      transition: `color ${token.motionDurationMid}`,

      '&:hover': {
        color: token.colorActionHover,
      },
    },
  },

  '.component-token-table': {
    '.ant-table-cell': {
      borderBottom: 'none',
    },

    'th.ant-table-cell': {
      background: token.colorBgComponent,
      fontSize: token.fontSizeSM,
      color: token.colorTextSecondary,
      fontWeight: 'normal',

      // '&:not(:last-child)::before': {
      //   backgroundColor: 'transparent !important',
      // }
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
        height: 20,
        width: 20,
        borderRadius: '50%',
        marginRight: token.marginXS,
        boxShadow: `0 1px 2px 0 rgba(25,15,15,0.07)`,
      },

      '.component-token-value-color-tag': {
        backgroundColor: token.colorBgComponentSecondary,
        borderRadius: token.radiusLG,
        padding: '4px 8px',
        minWidth: 140,
      },
    },
  },
}));

export const getComponentDemoId = (component: string, theme: string) =>
  `antd-token-previewer-${theme}-${component}`;

export type ComponentCardProps = PropsWithChildren<{
  component: string;
  theme: string;
}>;

const ComponentCard: FC<ComponentCardProps> = ({
  children,
  component,
  theme,
}) => {
  const [wrapSSR, hashId] = useStyle();
  const [tokenDrawerOpen, setTokenDrawerOpen] = useState<boolean>(false);
  const { getComponentToken } = useStatistic();

  const componentToken = getComponentToken(component);

  const columns: TableProps<{ name: string; value: any }>['columns'] = [
    {
      dataIndex: 'name',
      title: 'Name',
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
              <div
                className="component-token-value-color-preview"
                style={{ backgroundColor: value }}
              />
              <div className="component-token-value-color-tag">{value}</div>
            </div>
          );
        }
        return value;
      },
    },
  ];

  const data = useMemo(
    () =>
      Object.entries(componentToken ?? {}).map(([key, value]) => ({
        name: key,
        value,
      })),
    [componentToken],
  );

  return wrapSSR(
    <div>
      <div
        id={getComponentDemoId(component, theme)}
        style={{ height: 0, transform: 'translateY(-16px)' }}
      />
      <Card
        className={classNames('component-card', hashId)}
        title={component}
        extra={
          <ControlOutlined
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
      >
        <Table
          className={classNames('component-token-table', hashId)}
          dataSource={data}
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
