import React from 'react';

import Demo from './notification';
import info from './info';
import error from './error';
import success from './success';
import warning from './warning';

import type { PreviewerDemo } from '../../interface';

const previewerDemo: PreviewerDemo = {
  default: <Demo />,
  optional: [info, error, success, warning],
};

export default previewerDemo;
