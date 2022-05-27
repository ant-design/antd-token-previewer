import React from 'react';
import { render } from '@testing-library/react';
import Previewer from 'antd-token-previewer';

describe('previewer', () => {
  it('should not crash', () => {
    render(<Previewer />);
  });
});
