import React from 'react';
import { Tooltip } from '@madccc/antd';

export default () => (
  <Tooltip title="prompt text">
    {' '}
    <span>Tooltip will show on mouse enter.</span>{' '}
  </Tooltip>
);
