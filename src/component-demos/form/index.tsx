import React from 'react';

import Default from './form';

import warning from './warning';
import danger from './danger';

import type { ComponentDemo } from '../../interface';

const previewerDemo: ComponentDemo[] = [{ demo: <Default /> }, warning, danger];

export default previewerDemo;
