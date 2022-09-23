import { render } from '@testing-library/react';
import type { Theme, ThemeEditorRef } from 'antd-token-previewer';
import { ThemeEditor } from 'antd-token-previewer';
import React, { createRef } from 'react';
import { act } from 'react-dom/test-utils';

describe('ThemeEditor', () => {
  describe('ref', () => {
    it('getDiff should work', () => {
      const ref = createRef<ThemeEditorRef>();
      const Demo = ({ theme }: { theme: Theme }) => {
        return (
          <>
            <button onClick={() => ref.current?.updateRef()}>Diff</button>
            <ThemeEditor
              ref={ref}
              simple
              theme={theme}
              style={{ height: '100vh' }}
            />
          </>
        );
      };
      const { rerender } = render(
        <Demo
          theme={{
            name: 'Theme',
            key: 'theme',
            config: { token: { colorSuccess: '#000000' } },
          }}
        />,
      );
      rerender(
        <Demo
          theme={{
            name: 'Theme',
            key: 'theme',
            config: {
              token: {
                colorPrimary: '#ffffff',
                colorSuccess: '#000fff',
                colorError: '#eeeeee',
                colorBorder: '#dddddd',
              },
            },
          }}
        />,
      );
      expect(ref.current?.getDiff()).toMatchObject({
        alias: { colorBorder: { before: undefined, after: '#dddddd' } },
        map: { colorError: { before: undefined, after: '#eeeeee' } },
        seed: {
          colorPrimary: { before: undefined, after: '#ffffff' },
          colorSuccess: { before: '#000000', after: '#000fff' },
        },
      });
      act(() => {
        ref.current?.updateRef();
      });
      expect(ref.current?.getDiff()).toMatchObject({
        alias: undefined,
        map: undefined,
        seed: undefined,
      });
      rerender(
        <Demo
          theme={{
            name: 'Theme',
            key: 'theme',
            config: {
              token: {
                colorPrimary: '#fffff0',
                colorError: '#eeeee0',
                colorBorder: '#ddddd0',
              },
            },
          }}
        />,
      );
      expect(ref.current?.getDiff()).toMatchObject({
        alias: { colorBorder: { before: '#dddddd', after: '#ddddd0' } },
        map: { colorError: { before: '#eeeeee', after: '#eeeee0' } },
        seed: {
          colorPrimary: { before: '#ffffff', after: '#fffff0' },
          colorSuccess: { before: '#000fff', after: undefined },
        },
      });
    });
  });
});
