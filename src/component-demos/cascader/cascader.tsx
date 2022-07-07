import React from 'react';
import { Cascader } from 'antd';

import options from './data';

export default (props: any) => (
  <Cascader options={options} {...props} open placeholder="Please select" />
);
