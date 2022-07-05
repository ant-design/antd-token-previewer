import React from 'react';

import Default from './badge';
import Progress from './progress';
import warning from './warning';

import type { PreviewerDemo } from '../../interface';

const previewerDemo: PreviewerDemo = {
  default: <Default />,
  optional: [Progress, warning],
};

export default previewerDemo;
