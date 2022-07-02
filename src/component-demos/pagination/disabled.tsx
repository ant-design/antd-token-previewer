import React from 'react';
import { Pagination } from '@madccc/antd';
import type { ComponentDemo } from '../../interface';

const Demo: React.FC = () => (
  <Pagination showQuickJumper defaultCurrent={2} total={10} disabled />
);

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['controlItemBgActiveDisabled'],
};

export default componentDemo;
