import React from 'react';

import TypographyDemo from './typography';
import Heading4 from './Heading4';
import warning from './warning';
import error from './error';

import type { ComponentDemo } from '../../interface';

const previewerDemo: ComponentDemo[] = [
  { demo: <TypographyDemo /> },
  Heading4,
  error,
  warning,
];

export default previewerDemo;
