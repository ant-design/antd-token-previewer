import { render } from '@testing-library/react';
import { ConfigProvider, theme } from 'antd';
import { getDesignToken } from 'antd-token-previewer';
import type { ThemeConfig } from 'antd/es/config-provider/context';
import React from 'react';
import getValueByPath from '../src/utils/getValueByPath';

const { useToken, darkAlgorithm } = theme;

describe('Utils', () => {
  describe('getValueByPath', () => {
    it('should work', () => {
      const obj = {
        a: {
          b: {
            c: 'c',
          },
        },
      };
      expect(getValueByPath(obj, ['a', 'b', 'c'])).toBe('c');
    });

    it('should return null when path is not exist', () => {
      expect(getValueByPath({}, ['a', 'b'])).toBeUndefined();
    });

    it('null object should return null', () => {
      expect(getValueByPath(null, ['a', 'b'])).toBeUndefined();
    });
  });

  it('getDesignToken should be consistent with useToken', () => {
    const themeConfig: ThemeConfig = {
      token: {
        colorPrimary: '#f5f5',
        colorLink: '#66ccff',
      },
      algorithm: darkAlgorithm,
    };
    let tokenFromHook;

    const Component = () => {
      const { token } = useToken();
      tokenFromHook = token;
      delete (tokenFromHook as any)._hashId;
      delete (tokenFromHook as any)._tokenKey;
      return null;
    };

    render(
      <ConfigProvider theme={themeConfig}>
        <Component />
      </ConfigProvider>,
    );
    expect(getDesignToken(themeConfig)).toStrictEqual(tokenFromHook);
  });
});
