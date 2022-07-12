import React from 'react';
import { Tag } from 'antd';
import type { ComponentDemo } from '../../interface';

const Demo = () => <Tag closable>Error</Tag>;

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorBgContainerSecondary', 'colorAction', 'colorActionHover'],
  key: 'closable',
};

export default componentDemo;
