import React from 'react';
import { Cascader } from '@madccc/antd';
import type { ComponentDemo } from '../../interface';

const options = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [{ value: 'xihu', label: 'West Lake' }],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [{ value: 'zhonghuamen', label: 'Zhong Hua Men' }],
      },
    ],
  },
];

const Demo = () => {
  // FIXME: 这个应该放到容器里
  return (
    <Cascader
      options={options}
      placeholder="Please select"
      searchValue={'jiang'}
      showSearch
      popupVisible
    />
  );
};

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorHighlight'],
};

export default componentDemo;
