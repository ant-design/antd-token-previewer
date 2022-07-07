import React, { useState } from 'react';
import { render } from '@testing-library/react';
import type { Theme } from 'antd-token-previewer';
import Previewer from 'antd-token-previewer';

describe('previewer', () => {
  it('should not crash', (done) => {
    render(<Previewer />);
    setImmediate(() => {
      done();
    });
  });

  it('should support controlled', (done) => {
    const Demo = () => {
      const [theme, setTheme] = useState<Theme>({
        name: '小猪蹄',
        key: 'xiaozhuti',
        config: { override: { alias: { colorPrimary: '#9013fe' } } },
      });

      return (
        <Previewer
          showTheme
          theme={theme}
          onThemeChange={(config) => setTheme({ ...theme, config })}
        />
      );
    };

    render(<Demo />);
    setImmediate(() => {
      done();
    });
  });
});
