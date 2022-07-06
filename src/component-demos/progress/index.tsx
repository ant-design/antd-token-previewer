import React from 'react';

import Demo from './progress';
import info from './info';
import danger from './danger';

import type { ComponentDemo } from '../../interface';

const previewerDemo: ComponentDemo[] = [{ demo: <Demo /> }, info, danger];

export default previewerDemo;
