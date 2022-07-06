import React from 'react';

import Default from './checkbox';
import disabled from './disabled';

import type { PreviewerDemo } from '../../interface';

const previewerDemo: PreviewerDemo = {
  default: <Default />,
  optional: [disabled],
};

export default previewerDemo;
