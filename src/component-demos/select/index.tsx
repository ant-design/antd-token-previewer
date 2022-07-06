import React from 'react';

import Default from './select';
import SelectTag from './selectTag';
import danger from './danger';
import warning from './warning';
import icon from './icon';

import type { ComponentDemo } from '../../interface';

const previewerDemo: ComponentDemo[] = [
  { demo: <Default /> },
  SelectTag,
  danger,
  warning,
  icon
];

export default previewerDemo;
