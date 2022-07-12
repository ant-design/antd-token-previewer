import React from 'react';
import { message } from 'antd';
import type { ComponentDemo } from '../../interface';

const { _InternalPanelDoNotUseOrYouWillBeFired } = message;

const Demo = () => (
  <_InternalPanelDoNotUseOrYouWillBeFired
    type={'warning'}
    content={'Warning'}
  />
);

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorWarning'],
  key: 'warning',
};

export default componentDemo;
