import { render } from '@testing-library/react';
import { ConfigProvider, theme } from 'antd';
import { getDesignToken } from 'antd-token-previewer';
import type { ThemeConfig } from 'antd/es/config-provider/context';
import React from 'react';
import { tokenCategory, tokenMeta } from '../src/meta';
import type { KitchenToken } from '../src/utils/convertToken';
import { convertTokenConfigToArr } from '../src/utils/convertToken';
import getValueByPath from '../src/utils/getValueByPath';

const { useToken, darkAlgorithm } = theme;

describe('Utils', () => {
  describe('convertToken', () => {
    const tokenPair: { arr: KitchenToken[]; config: ThemeConfig }[] = [
      {
        arr: [
          {
            id: 'colorBgElevated',
            name: '浮层容器背景色',
            searchKey: '颜色/Color/中性色/Neutral Color',
            groupName: '颜色/中性色',
            sort: 0,
            type: 'token',
            content: {
              type: 'color',
              value: '#fff',
              token: 'colorBgElevated',
              description:
                '浮层容器背景色，在暗色模式下的该颜色会比 colorBgContainer 要亮一些。例如：模态框、弹出框、菜单等。',
              source: 'map',
            },
          },
        ],
        config: {
          token: {
            colorBgElevated: '#fff',
          },
        },
      },
      {
        arr: [
          {
            id: 'colorPrimary',
            name: '品牌主色',
            searchKey: '颜色/Color/品牌色/Brand Color',
            groupName: '颜色/品牌色',
            sort: 0,
            type: 'token',
            content: {
              type: 'color',
              value: 'rgba(0, 0, 0, 0.01)',
              token: 'colorPrimary',
              description:
                '品牌色是体现产品特性和传播理念最直观的视觉元素之一。在你完成品牌主色的选取之后，我们会自动帮你生成一套完整的色板，并赋予它们有效的设计语义。',
              source: 'Button',
            },
          },
        ],
        config: {
          components: {
            Button: {
              colorPrimary: 'rgba(0, 0, 0, 0.01)',
            },
          },
        },
      },
    ];
    tokenPair.forEach(({ arr, config }, index) => {
      it(`convertTokenConfigToArr ${index + 1}`, () => {
        expect(
          convertTokenConfigToArr(config, tokenMeta, tokenCategory),
        ).toStrictEqual(arr);
      });
    });
  });

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
