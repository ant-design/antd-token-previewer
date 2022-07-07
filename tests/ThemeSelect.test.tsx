import { fireEvent, render } from '@testing-library/react';
import ThemeSelect from '../src/ThemeSelect';
import React, { useState } from 'react';

const themes = [
  { name: 'Default Theme', key: 'default', config: {}, fixed: true },
  {
    name: 'Dark Theme',
    key: 'dark',
    config: {},
    closable: true,
  },
  {
    name: 'Compact Theme',
    key: 'compact',
    config: {},
    closable: true,
  },
];

const Demo = () => {
  const [shownThemes, setShownThemes] = useState<string[]>(['default', 'dark']);
  const [enabledThemes, setEnabledThemes] = useState<string[]>(['default']);

  return (
    <ThemeSelect
      enabledThemes={enabledThemes}
      shownThemes={shownThemes}
      themes={themes}
      onEnabledThemeChange={(value) => setEnabledThemes(value)}
      onShownThemeChange={(value) => setShownThemes(value)}
    />
  );
};

describe('ThemeSelect', () => {
  it('should render correctly', (done) => {
    const { container } = render(<Demo />, {
      container: document.body,
    });
    expect(container).toMatchSnapshot();
    setImmediate(() => {
      done();
    });
  });

  it('should show selected themes correctly', (done) => {
    const { container } = render(<Demo />, {
      container: document.body,
    });
    fireEvent.click(
      container.querySelector('.previewer-theme-select-add-btn')!,
    );
    expect(
      container.querySelector('.previewer-theme-select-add-btn')?.className,
    ).toContain('ant-dropdown-open');
    fireEvent.click(container.querySelector('li.ant-dropdown-menu-item')!);
    expect(container).toMatchSnapshot();
    setImmediate(() => {
      done();
    });
  });

  it('should toggle active theme correctly', (done) => {
    const { container } = render(<Demo />);
    expect(
      container.querySelectorAll('.previewer-theme-select-tag-active').length,
    ).toBe(1);
    fireEvent.click(
      container.querySelectorAll('.previewer-theme-select-tag')[1],
    );
    expect(
      container.querySelectorAll('.previewer-theme-select-tag-active').length,
    ).toBe(2);
    fireEvent.click(
      container.querySelectorAll('.previewer-theme-select-tag')[1],
    );
    expect(
      container.querySelectorAll('.previewer-theme-select-tag-active').length,
    ).toBe(1);
    setImmediate(() => {
      done();
    });
  });

  it('should support remove theme from tags', (done) => {
    const { container } = render(<Demo />);
    expect(
      container.querySelectorAll('.previewer-theme-select-tag').length,
    ).toBe(2);
    fireEvent.click(
      container.querySelector('.previewer-theme-select-tag-close-btn')!,
    );
    expect(
      container.querySelectorAll('.previewer-theme-select-tag').length,
    ).toBe(1);

    setImmediate(() => {
      done();
    });
  });

  it('should not toggle fixed theme', (done) => {
    const { container } = render(<Demo />);
    expect(
      container.querySelector('.previewer-theme-select-tag')?.children.length,
    ).toBe(0);
    expect(
      container.querySelectorAll('.previewer-theme-select-tag-active').length,
    ).toBe(1);
    fireEvent.click(container.querySelector('.previewer-theme-select-tag')!);
    expect(
      container.querySelectorAll('.previewer-theme-select-tag-active').length,
    ).toBe(1);

    setImmediate(() => {
      done();
    });
  });
});
