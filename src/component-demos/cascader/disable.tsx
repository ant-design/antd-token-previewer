import React from 'react';
import { Cascader } from 'antd';

import options from './data';
import type { ComponentDemo } from '../../interface';

const { _InternalPanelDoNotUseOrYouWillBeFired: InternalCascader } = Cascader;

const Demo = () => (
  <InternalCascader
    options={options}
    open
    disabled
    placeholder="Please select"
  />
);

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorBgContainerDisabled'],
};

export default componentDemo;
