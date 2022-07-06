import React from 'react';

import Default from './date-picker';
import danger from './danger';
import warning from './warning';
import icon from './icon';

import type { ComponentDemo } from '../../interface';

const previewerDemo: ComponentDemo[] = [{ demo: <Default /> }, danger, warning,icon];

export default previewerDemo;
