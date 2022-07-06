import React from 'react';
import { Button, Space } from 'antd';

export default () => (
  <Space>
    <Button type="primary">Primary Button</Button>
    <Button>Default Button</Button>
    <Button type="dashed">Dashed Button</Button> <br />
    <Button type="text">Text Button</Button>
    <Button ghost>Ghost Button</Button>
    <Button type="link">Link Button</Button>
  </Space>
);
