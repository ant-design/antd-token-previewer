import React from 'react';

import Default from './inputNumber';
import danger from './danger';
import warning from './warning';

import type { ComponentDemo } from '../../interface';

const previewerDemo: ComponentDemo[] = [{ demo: <Default /> }, danger, warning];

export default previewerDemo;
