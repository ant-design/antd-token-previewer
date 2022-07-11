import type { MenuProps } from 'antd';
import { Button, Menu } from 'antd';
import React from 'react';

import items from './data';

import type { ComponentDemo } from '../../interface';

const Demo: React.FC = () => {
  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
  };

  return (
    <div>
      <Button onClick={focus}>点击触发 focus 态，显示 colorPrimaryHover</Button>
      <Menu
        onClick={onClick}
        style={{ width: 256 }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        items={items}
      />
    </div>
  );
};

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: [
    'colorPrimary',
    'colorBgContainer',
    'colorBgContainerSecondary',
    'colorBorderSecondary',
    'colorPrimaryHover',
  ],
};

export default componentDemo;
