import React from 'react';

import Demo from './message';
import error from './error';
import info from './info';
import success from './success';
import warning from './warning';

import type { ComponentDemo } from '../../interface';

const previewerDemo: ComponentDemo[] = [
  { demo: <Demo /> },
  error,
  info,
  success,
  warning,
];

export default previewerDemo;
