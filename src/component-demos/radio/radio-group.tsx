import { Radio } from 'antd';
import React, { useState } from 'react';
import type { ComponentDemo } from '../../interface';

import type { RadioChangeEvent } from 'antd';

const Demo: React.FC = () => {
  const [value, setValue] = useState(1);

  const onChange = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };

  return (
    <Radio.Group onChange={onChange} value={value}>
      <Radio value={1}>A</Radio>
      <Radio value={2}>B</Radio>
      <Radio value={3}>C</Radio>
      <Radio value={4}>D</Radio>
    </Radio.Group>
  );
};

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: [],
  key: 'group',
};

export default componentDemo;
