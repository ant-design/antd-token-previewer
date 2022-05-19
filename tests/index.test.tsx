import { render } from '@testing-library/react';
import Previewer from '../src';
import React from 'react';

describe('previewer', () => {
  it('should not crash', () => {
    render(<Previewer />);
  });
});
