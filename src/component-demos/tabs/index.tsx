import React from 'react';

import Default from './tabs';
import card from './cardTabs';

import type { PreviewerDemo } from '../../interface';

const previewerDemo: PreviewerDemo = {
  default: <Default />,
  optional: [card],
};

export default previewerDemo;
