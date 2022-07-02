import React from 'react';

import Default from './menu';

import danger from './menuDanger';
import MenuInLayout from './menuInLayout';

import type { PreviewerDemo } from '../../interface';

const previewerDemo: PreviewerDemo = {
  default: <Default />,
  optional: [danger, MenuInLayout],
};

export default previewerDemo;
