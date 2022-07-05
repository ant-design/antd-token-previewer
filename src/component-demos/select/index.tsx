import React from 'react';

import Default from './select';
import SelectTag from './selectTag';
import danger from './danger';
import warning from './warning';

import type { PreviewerDemo } from '../../interface';

const previewerDemo: PreviewerDemo = {
  default: <Default />,
  optional: [SelectTag, danger, warning],
};

export default previewerDemo;
