import React from 'react';

import AnchorDemo from './anchor';
import AnchorLayout from './anchorInLayout';

import type { PreviewerDemo } from '../../interface';

const previewerDemo: PreviewerDemo = {
  default: <AnchorDemo />,
  optional: [AnchorLayout],
};

export default previewerDemo;
