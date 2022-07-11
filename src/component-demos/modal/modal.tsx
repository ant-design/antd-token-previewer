import React from 'react';
import { Modal } from 'antd';

import type { ComponentDemo } from '../../interface';

const Demo = () => {
  return (
    <Modal._InternalPanelDoNotUseOrYouWillBeFired title="Basic Modal">
      <p>Some contents...</p> <p>Some contents...</p> <p>Some contents...</p>
    </Modal._InternalPanelDoNotUseOrYouWillBeFired>
  );
};

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorBgElevated'],
};
export default componentDemo;
