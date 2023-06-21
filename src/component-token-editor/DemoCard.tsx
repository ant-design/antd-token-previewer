import { Card, Divider } from 'antd';
import type { FC } from 'react';
import React from 'react';
import type { ComponentDemo } from '../interface';

export interface DemoCardProps {
  demo: ComponentDemo;
}

const DemoCard: FC<DemoCardProps> = ({ demo: item }) => {
  //
  return (
    <Card title={`关联 Token: ${item.tokens?.join(', ')}`} key={item.key}>
      {item.demo}
      <Divider />
    </Card>
  );
};

export default DemoCard;
