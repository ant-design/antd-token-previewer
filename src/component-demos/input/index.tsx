import React from 'react';

import Default from './input';
import clearIcon from './clearIcon';
import danger from './danger';
import warning from './warning';

import type { ComponentDemo } from '../../interface';

const previewerDemo: ComponentDemo[] = [
  { demo: <Default /> },
  clearIcon,
  danger,
  warning,
];

export default previewerDemo;
