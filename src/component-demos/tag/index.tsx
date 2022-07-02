import React from 'react';

import Default from './tag';
import error from './error';
import info from './info';
import success from './success';
import warning from './warning';

import type { PreviewerDemo } from '../../interface';

const previewerDemo: PreviewerDemo = {
  default: <Default />,
  optional: [error, info, success, warning],
};

export default previewerDemo;
