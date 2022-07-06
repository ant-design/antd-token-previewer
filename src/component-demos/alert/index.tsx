import React from 'react';

import AlertDemo from './alert';
import error from './error';
import info from './info';
import success from './success';
import warning from './warning';

import type { ComponentDemo } from '../../interface';

const previewerDemo: ComponentDemo[] = [
  { demo: <AlertDemo /> },
  error,
  info,
  success,
  warning,
];

export default previewerDemo;
