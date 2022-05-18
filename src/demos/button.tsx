import type { FC } from 'react';
import React from 'react';
import { Button, Card } from '@madccc/antd';

const ButtonDemo: FC = () => {
  return (
    <Card title="按钮 Button">
      <Button type="primary">Primary</Button>
    </Card>
  );
};

export default ButtonDemo;
