import React from 'react';

import TypographyDemo from './typography';
import Heading4 from './Heading4';
import Error from './error';

import type { PreviewerDemo } from '../../interface';

const previewerDemo: PreviewerDemo = {
  default: <TypographyDemo />,
  optional: [
    {
      demo: <Heading4 />,
      tokens: ['fontSizeHeading4'],
    },
    {
      demo: <Error />,
      tokens: ['colorError', 'colorErrorHover', 'colorErrorActive'],
    },
  ],
};

export default previewerDemo;
