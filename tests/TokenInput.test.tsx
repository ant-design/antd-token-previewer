import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import TokenInput from '../src/TokenInput';

describe('TokenInput', () => {
  it('reset btn should display correctly', (done) => {
    const { container } = render(<TokenInput value="test" />);
    expect(
      container.querySelector('.ant-input-group-addon > span > button'),
    ).toBeFalsy();
    fireEvent.change(container.querySelector('input')!, {
      target: { value: 'newVal' },
    });

    expect(
      container.querySelector('.ant-input-group-addon > span > button'),
    ).toBeTruthy();

    setImmediate(() => {
      done();
    });
  });
});
