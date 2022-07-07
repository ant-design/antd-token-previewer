import React from 'react';

import Default from './table';
import Filter from './filterTable';

import type { ComponentDemo } from '../../interface';

const previewerDemo: ComponentDemo[] = [{ demo: <Default /> }, Filter];

export default previewerDemo;
