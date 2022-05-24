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
  },
}));

export const getComponentDemoId = (component: string) =>
  `antd-token-previewer-${component}`;

export type ComponentCardProps = PropsWithChildren<{
  component: string;
}>;

const ComponentCard: FC<ComponentCardProps> = ({ children, component }) => {
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
        id={getComponentDemoId(component)}
        style={{ height: 0, transform: 'translateY(-16px)' }}
      />
      <Card
        className={classNames('component-card', hashId)}
        title={component}
        extra={
          <ControlOutlined
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
