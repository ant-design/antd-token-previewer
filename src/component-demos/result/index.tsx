import React from 'react';

import Demo from './result';
import info from './info';
import warning from './warning';
import danger from './danger';
import ResultWithDesc from './resultWithDesc';

import type { PreviewerDemo } from '../../interface';

const previewerDemo: PreviewerDemo = {
  default: <Demo />,
  optional: [info, warning, danger, ResultWithDesc],
};

export default previewerDemo;
