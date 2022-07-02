import React from 'react';

import Demo from './pagination';
import disabled from './disabled';

import type { PreviewerDemo } from '../../interface';

const previewerDemo: PreviewerDemo = {
  default: <Demo />,
  optional: [disabled],
};

export default previewerDemo;
