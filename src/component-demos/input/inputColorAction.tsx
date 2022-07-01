import React from 'react';
import { Input } from '@madccc/antd';

import type { ComponentDemo } from '../../interface';

const Demo = () => (
  <Input
    placeholder="Basic usage"
    value={'右侧的图标就是 colorActionTmp'}
    allowClear
  />
);

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorAction', 'colorActionHover'],
};
export default componentDemo;
