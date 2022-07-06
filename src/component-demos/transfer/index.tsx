import React from 'react';

import Default from './transfer';
import danger from './danger';
import warning from './warning';

import type { ComponentDemo } from '../../interface';

const previewerDemo: ComponentDemo[] = [{ demo: <Default /> }, warning, danger];

export default previewerDemo;
