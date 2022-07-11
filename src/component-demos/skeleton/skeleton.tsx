import React from 'react';
import { Skeleton } from 'antd';

import type { ComponentDemo } from '../../interface';

const Demo = () => <Skeleton />;

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorBgFillTmp', 'colorTextPlaceholder'],
};

export default componentDemo;
