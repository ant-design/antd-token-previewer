import React from 'react';
import { DatePicker, Space } from 'antd';
import { ComponentDemo } from '../../interface';

function onChange() {}
const Demo = () => (
  <Space direction="vertical">
    <DatePicker onChange={onChange} />
    <DatePicker onChange={onChange} picker="week" />
    <DatePicker onChange={onChange} picker="month" />
    <DatePicker onChange={onChange} picker="quarter" />
    <DatePicker onChange={onChange} picker="year" />
  </Space>
);

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorPrimaryBorder', 'colorBgElevated', 'colorBgContainer'],
};

export default componentDemo;
