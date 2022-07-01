import React from 'react';

import Default from './tag';
import TagError from './tagError';

import type { PreviewerDemo } from '../../interface';

const previewerDemo: PreviewerDemo = {
  default: <Default />,
  optional: [TagError],
};

export default previewerDemo;
