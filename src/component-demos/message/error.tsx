import React from 'react';
import { message } from '@madccc/antd';
import type { ComponentDemo } from '../../interface';

const { _InternalPanelDoNotUseOrYouWillBeFired } = message;

const Demo = () => (
  <_InternalPanelDoNotUseOrYouWillBeFired type={'error'} content={'Error'} />
);

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorError'],
};

export default componentDemo;
