import React from 'react';
import { Dropdown } from '@madccc/antd';
import { DownOutlined } from '@ant-design/icons';

import menu from './menu';

import type { ComponentDemo } from '../../interface';

const Demo = () => (
  <Dropdown overlay={menu}>
    <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
      Hover me <DownOutlined />
    </a>
  </Dropdown>
);

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorError', 'colorErrorHover'],
};

export default componentDemo;
