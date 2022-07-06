import React from 'react';

import Default from './menu';

import danger from './menuDanger';
import MenuInLayout from './menuInLayout';

import type { ComponentDemo } from '../../interface';

const previewerDemo: ComponentDemo[] = [
  { demo: <Default /> },
  danger,
  MenuInLayout,
];

export default previewerDemo;
