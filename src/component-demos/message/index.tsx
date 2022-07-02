import React from 'react';

import Demo from './message';
import error from './error';
import info from './info';
import success from './success';
import warning from './warning';

import type { PreviewerDemo } from '../../interface';

const previewerDemo: PreviewerDemo = {
  default: <Demo />,
  optional: [error, info, success, warning],
};

export default previewerDemo;
