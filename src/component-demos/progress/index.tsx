import React from 'react';

import Demo from './progress';
import info from './info';
import danger from './danger';

import type { PreviewerDemo } from '../../interface';

const previewerDemo: PreviewerDemo = {
  default: <Demo />,
  optional: [info, danger],
};

export default previewerDemo;
