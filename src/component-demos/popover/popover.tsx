import React from 'react';
import { Popover, Button } from 'antd';
import { ComponentDemo } from '../../interface';

const content = (
  <div>
    <p>Content</p> <p>Content</p>
  </div>
);
const Demo = () => (
  <Popover content={content} title="Title">
    <Button type="primary">Hover me</Button>
  </Popover>
);

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorBgElevated'],
};

export default componentDemo;
