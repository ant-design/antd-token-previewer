import React from 'react';
import { Modal } from 'antd';

import type { ComponentDemo } from '../../interface';

const Demo = () => {
  return (
    <Modal._InternalPanelDoNotUseOrYouWillBeFired
      type={'confirm'}
      title={'Confirm This?'}
    />
  );
};

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorWarning'],
  key: 'default',
};
export default componentDemo;
