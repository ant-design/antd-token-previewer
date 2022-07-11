import React from 'react';
import { Image } from 'antd';

import type { ComponentDemo } from '../../interface';

const Demo = () => {
  return <Image width={200} height={200} src="error" placeholder />;
};

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorBgContainerDisabled'],
};

export default componentDemo;
