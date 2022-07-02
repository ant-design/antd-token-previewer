import React from 'react';

import Default from './upload';
import danger from './danger';

import type { PreviewerDemo } from '../../interface';

const previewerDemo: PreviewerDemo = {
  default: <Default />,
  optional: [danger],
};

export default previewerDemo;
