import React from 'react';
import { TimePicker } from 'antd';
import type { ComponentDemo } from '../../interface';

function onChange() {}
const Demo = () => <TimePicker onChange={onChange} />;

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorPrimary'],
};

export default componentDemo;
