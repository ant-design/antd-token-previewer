import React from 'react';
import { Image } from 'antd';

import type { ComponentDemo } from '../../interface';

const Demo = () => {
  return (
    <Image
      width={200}
      src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
      loading={'lazy'}
    />
  );
};

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorBgContainerDisabled'],
};

export default componentDemo;
