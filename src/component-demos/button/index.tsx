import React from 'react';

import ButtonDemo from './button';
import ButtonIconDemo from './button-icon';
import DangerButton from './dangerButton';

import type { PreviewerDemo } from '../../interface';

const previewerDemo: PreviewerDemo = {
  default: <ButtonDemo />,
  optional: [ButtonIconDemo, DangerButton],
};

export default previewerDemo;
