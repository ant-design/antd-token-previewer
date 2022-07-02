import React from 'react';

import Default from './select';
import SelectTag from './selectTag';
import SelectDanger from './selectDanger';

import type { PreviewerDemo } from '../../interface';

const previewerDemo: PreviewerDemo = {
  default: <Default />,
  optional: [SelectTag, SelectDanger],
};

export default previewerDemo;
