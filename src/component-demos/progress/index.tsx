import React from 'react';

import Demo from './progress';
import info from './info';

import type { PreviewerDemo } from '../../interface';

const previewerDemo: PreviewerDemo = {
  default: <Demo />,
  optional: [info],
};

export default previewerDemo;
