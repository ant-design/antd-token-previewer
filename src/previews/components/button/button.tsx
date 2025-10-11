import { Button, Flex, Space } from 'antd';
import React from 'react';
import type { ComponentDemo } from '../../../interface';

const Demo = () => (
  <>
    <Space wrap>
      <Button type="primary">Primary Button</Button>
      <Button>Default Button</Button>
      <Button type="dashed">Dashed Button</Button> <br />
      <Button type="text">Text Button</Button>
      <Button type="link">Link Button</Button>
    </Space>
    <Flex
      justify="center"
      align="center"
      style={{
        backgroundColor: 'rgb(190,200,200)',
        height: 50,
        marginTop: 16,
      }}
    >
      <Button ghost>Ghost Button</Button>
    </Flex>
  </>
);

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: [
    'colorText',
    'colorPrimary',
    'colorPrimaryActive',
    'colorPrimaryHover',
    'controlOutline',
    'controlTmpOutline',
  ],
  key: 'button',
};

export default componentDemo;
