import React from 'react';
import { Popover, Button } from 'antd';
import type { ComponentDemo } from '../../interface';

const content = (
  <div>
    <p>Content</p> <p>Content</p>
  </div>
);
const Demo = () => (
  <div>
    <Popover._InternalPanelDoNotUseOrYouWillBeFired
      content={content}
      title="Title"
    ></Popover._InternalPanelDoNotUseOrYouWillBeFired>
    <Button type="primary">Hover me</Button>
  </div>
);

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorBgElevated'],
  key: 'default',
};

export default componentDemo;
