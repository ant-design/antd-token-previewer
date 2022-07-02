import React from 'react';
import { Tag } from '@madccc/antd';
import type { ComponentDemo } from '../../interface';

const Demo = () => <Tag color="error">Error</Tag>;

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorError', 'colorErrorBg', 'colorErrorBorder'],
};

export default componentDemo;
