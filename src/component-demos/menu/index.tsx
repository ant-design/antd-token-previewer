import React from 'react';

import Default from './menu';

import danger from './menuDanger';

import type { PreviewerDemo } from '../../interface';

const previewerDemo: PreviewerDemo = {
  default: <Default />,
  optional: [danger],
};

export default previewerDemo;
