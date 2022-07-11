import React from 'react';
import { Rate } from 'antd';

import type { ComponentDemo } from '../../interface';

const Demo = () => <Rate />;

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorBgFillTmp'],
};

export default componentDemo;
