import React from 'react';
import { Cascader } from 'antd';

import options from './data';
const { _InternalPanelDoNotUseOrYouWillBeFired: InternalCascader } = Cascader;

export default (props: any) => (
  <InternalCascader
    options={options}
    {...props}
    open
    placeholder="Please select"
  />
);
