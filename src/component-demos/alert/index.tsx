import React from 'react';

import AlertDemo from './alert';
import AlertError from './alertError';

import type { PreviewerDemo } from '../../interface';

const previewerDemo: PreviewerDemo = {
  default: <AlertDemo />,
  optional: [AlertError],
};

export default previewerDemo;
