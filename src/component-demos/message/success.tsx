import React from 'react';
import { message } from '@madccc/antd';
import type { ComponentDemo } from '../../interface';

const { _InternalPanelDoNotUseOrYouWillBeFired } = message;

const Demo = () => (
  <_InternalPanelDoNotUseOrYouWillBeFired type={'success'} content={'Error'} />
);

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorSuccess'],
};

export default componentDemo;
