import type { TokenEntity } from '../src/interface';
import type { ThemeConfig } from 'antd/es/config-provider/context';
import {
  convertTokenArrToConfig,
  convertTokenConfigToArr,
} from '../src/utils/convertToken';
import getValueByPath from '../src/utils/getValueByPath';

describe('Utils', () => {
  describe('convertToken', () => {
    const tokenPair: { arr: TokenEntity[]; config: ThemeConfig }[] = [
      {
        arr: [
          {
            name: 'colorBgElevated',
            token: 'colorBgElevated',
            value: '#f5f5',
            type: 'color',
            description: 'colorBgElevated',
            source: 'alias',
          },
        ],
        config: {
          override: {
            alias: {
              colorBgElevated: '#f5f5',
            },
          },
        },
      },
      {
        arr: [
          {
            name: 'colorBgTextHover',
            token: 'colorBgTextHover',
            value: 'rgba(0, 0, 0, 0.01)',
            type: 'color',
            description: 'colorBgTextHover',
            source: 'Button',
          },
        ],
        config: {
          override: {
            Button: {
              colorBgTextHover: 'rgba(0, 0, 0, 0.01)',
            },
          },
        },
      },
    ];
    tokenPair.forEach(({ arr, config }, index) => {
      it(`convertTokenArrToConfig ${index + 1}`, () => {
        expect(convertTokenArrToConfig(arr)).toStrictEqual(config);
      });
      it(`convertTokenConfigToArr ${index + 1}`, () => {
        expect(convertTokenConfigToArr(config)).toStrictEqual(arr);
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
});
