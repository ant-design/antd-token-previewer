import React from 'react';

import Demo from './result';
import info from './info';
import ResultWithDesc from './resultWithDesc';

import type { PreviewerDemo } from '../../interface';

const previewerDemo: PreviewerDemo = {
  default: <Demo />,
  optional: [info, ResultWithDesc],
};

export default previewerDemo;
