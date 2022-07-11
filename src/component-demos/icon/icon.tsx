import React from 'react';
import { Space } from 'antd';
import {
  HomeOutlined,
  SettingFilled,
  SmileOutlined,
  SyncOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
import type { ComponentDemo } from '../../interface';

const Demo = () => (
  <Space>
    <HomeOutlined /> <SettingFilled /> <SmileOutlined /> <SyncOutlined spin />
    <SmileOutlined rotate={180} /> <LoadingOutlined />
  </Space>
);

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: [],
};

export default componentDemo;
