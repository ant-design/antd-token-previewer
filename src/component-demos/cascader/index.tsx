import React from 'react';

import Default from './cascader';
import HighLight from './highlight';

import type { PreviewerDemo } from '../../interface';

const previewerDemo: PreviewerDemo = {
  default: <Default />,
  optional: [HighLight],
};

export default previewerDemo;
