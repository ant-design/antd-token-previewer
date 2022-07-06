import React from 'react';

import Default from './badge';
import Progress from './progress';
import warning from './warning';

import type { ComponentDemo } from '../../interface';

const previewerDemo: ComponentDemo[] = [
  { demo: <Default /> },
  Progress,
  warning,
];

export default previewerDemo;
