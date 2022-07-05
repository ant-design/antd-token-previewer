import React from 'react';

import Default from './input';
import clearIcon from './clearIcon';
import danger from './danger';
import warning from './warning';

import type { PreviewerDemo } from '../../interface';

const previewerDemo: PreviewerDemo = {
  default: <Default />,
  optional: [clearIcon, danger, warning],
};

export default previewerDemo;
