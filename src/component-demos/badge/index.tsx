import React from 'react';

import Default from './badge';
import Progress from './progress';

import type { PreviewerDemo } from '../../interface';

const previewerDemo: PreviewerDemo = {
  default: <Default />,
  optional: [Progress],
};

export default previewerDemo;
