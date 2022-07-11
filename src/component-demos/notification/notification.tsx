import React from 'react';
import { notification } from 'antd';
import type { ComponentDemo } from '../../interface';

const { _InternalPanelDoNotUseOrYouWillBeFired } = notification;

const Demo = () => (
  <_InternalPanelDoNotUseOrYouWillBeFired
    message={'Notification Title'}
    description={
      'This is the content of the notification. This is the content of the notification. This is the content of the notification.'
    }
  />
);

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorAction', 'colorActionHover', 'colorBgElevated'],
};

export default componentDemo;
