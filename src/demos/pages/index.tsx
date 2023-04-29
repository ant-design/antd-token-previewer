import {
  BellOutlined,
  HomeOutlined,
  QuestionCircleOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Avatar, Button, ConfigProvider, Layout, Menu, theme } from 'antd';
import type { FC } from 'react';
import React from 'react';
import Dashboard from './dashboard';

const { Header, Sider, Content } = Layout;

export type AppDemoProps = {
  style?: React.CSSProperties;
  className?: string;
};

const menuItems: MenuProps['items'] = [
  {
    label: 'Dashboard',
    key: 'dashboard',
    icon: <HomeOutlined />,
  },
];

const AppDemo: FC<AppDemoProps> = ({ className, style }) => {
  const { token } = theme.useToken();

  return (
    <ConfigProvider
      theme={{
        components: {
          Layout: {
            colorBgHeader: token.colorBgLayout,
          },
          Menu: {
            colorItemBg: token.colorBgLayout,
          },
        },
      }}
    >
      <Layout
        className={className}
        style={{
          boxShadow: token.boxShadowTertiary,
          borderRadius: 8,
          overflow: 'hidden',
          ...style,
        }}
      >
        <Header
          style={{
            padding: '0 24px',
            display: 'flex',
            borderBottom: `1px solid ${token.colorSplit}`,
          }}
        >
          <div>
            <img
              alt="Ant Design Pro"
              src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
              style={{ width: 30, height: 30 }}
            />
            <span
              style={{
                marginLeft: 8,
                fontSize: token.fontSizeLG,
                fontWeight: token.fontWeightStrong,
              }}
            >
              Ant Design Pro
            </span>
          </div>
          <div style={{ marginLeft: 'auto' }}>
            <Button
              icon={<SearchOutlined style={{ fontSize: token.fontSizeIcon }} />}
              type="text"
              style={{ marginLeft: 8 }}
            />
            <Button
              icon={<BellOutlined style={{ fontSize: token.fontSizeIcon }} />}
              type="text"
              style={{ marginLeft: 8 }}
            />
            <Button
              icon={
                <QuestionCircleOutlined
                  style={{ fontSize: token.fontSizeIcon }}
                />
              }
              type="text"
              style={{ marginLeft: 8 }}
            />
            <Avatar
              src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*CLp0Qqc11AkAAAAAAAAAAAAAARQnAQ"
              style={{ marginLeft: 12 }}
            />
          </div>
        </Header>
        <Layout>
          <Sider>
            <Menu
              mode="inline"
              style={{ height: '100%', paddingTop: 4 }}
              items={menuItems}
            />
          </Sider>
          <Layout>
            <Content style={{ padding: 24, overflow: 'auto' }}>
              <Dashboard />
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default AppDemo;
