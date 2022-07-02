import React from 'react';

import Default from './table';
import Filter from './filterTable';

import type { PreviewerDemo } from '../../interface';

const previewerDemo: PreviewerDemo = {
  default: <Default />,
  optional: [Filter],
};

export default previewerDemo;
