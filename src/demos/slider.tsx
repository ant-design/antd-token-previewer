import React from 'react';
import { Slider } from '@madccc/antd';

export default () => (
  <>
    <Slider defaultValue={30} />
    <Slider range defaultValue={[20, 50]} />
  </>
);
