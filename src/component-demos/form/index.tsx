import React from 'react';

import Default from './form';

import warning from './warning';
import danger from './danger';

import type { PreviewerDemo } from '../../interface';

const previewerDemo: PreviewerDemo = {
  default: <Default />,
  optional: [warning, danger],
};

export default previewerDemo;
