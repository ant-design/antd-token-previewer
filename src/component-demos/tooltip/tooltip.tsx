import React from 'react';
import { Tooltip } from 'antd';
import type { ComponentDemo } from '../../interface';

const Demo = () => (
  <Tooltip title="prompt text">
    <span>Tooltip will show on mouse enter.</span>
  </Tooltip>
);
const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorBgTooltipTmp', 'colorTextLightSolid'],
  key: 'default',
};

export default componentDemo;
