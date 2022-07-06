import React from 'react';

import ButtonDemo from './button';
import ButtonIconDemo from './button-icon';
import DangerButton from './dangerButton';

import type { ComponentDemo } from '../../interface';

const previewerDemo: ComponentDemo[] = [
  { demo: <ButtonDemo /> },
  ButtonIconDemo,
  DangerButton,
];

export default previewerDemo;
