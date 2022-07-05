import React from 'react';

import Default from './transfer';
import danger from './danger';
import warning from './warning';

import type { PreviewerDemo } from '../../interface';

const previewerDemo: PreviewerDemo = {
  default: <Default />,
  optional: [warning, danger],
};

export default previewerDemo;
