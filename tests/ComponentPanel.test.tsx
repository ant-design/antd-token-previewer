import { fireEvent, render } from '@testing-library/react';
import { theme } from 'antd';
import tokenStatistic from 'antd/lib/version/token.json';
import React from 'react';
import type { ComponentPanelProps } from '../src/component-panel';
import ComponentPanel, { antdComponents } from '../src/component-panel';

const { useToken } = theme;

describe.skip('ComponentPanel', () => {
  const Panel = ({ themes, ...restProps }: Partial<ComponentPanelProps>) => {
    const { token } = useToken();

    const mergedThemes = themes || [
      {
        name: '默认主题',
        key: 'default',
        config: { token: token },
      },
    ];

    return <ComponentPanel themes={mergedThemes} {...restProps} />;
  };

  it('filterMode filter should work', () => {
    const { container } = render(<Panel selectedTokens={['colorPrimary']} />);
    const relatedComponents = Object.entries(tokenStatistic)
      .filter(([, { global: tokens }]) =>
        tokens.includes('colorPrimary' as unknown as never),
      )
      .map(([name]) => name);
    const [treeLength, componentLength] = Object.entries(antdComponents).reduce(
      (result, [, components]) => {
        let typeLen = 0;
        components.forEach((item) => {
          if (relatedComponents.includes(item)) {
            typeLen += 1;
          }
        });
        const componentLen = typeLen;
        if (typeLen > 0) {
          typeLen += 1;
        }
        return [result[0] + typeLen, result[1] + componentLen];
      },
      [0, 0],
    );
    expect(
      container
        .querySelector('.component-tree')
        ?.querySelector('.ant-tree-list')
        ?.querySelectorAll('.ant-tree-treenode').length,
    ).toBe(treeLength);
    expect(
      Array.from(
        container.querySelector('.component-demos')?.children || [],
      ).filter((el: any) => el.style.display !== 'none').length,
    ).toBe(componentLength);
  });

  it('search should work', () => {
    const { container } = render(<Panel />);
    fireEvent.change(
      container.querySelector('.component-tree-search > input')!,
      { target: { value: 'but' } },
    );
    expect(
      container
        .querySelector('.component-tree')
        ?.querySelector('.ant-tree-list')
        ?.querySelectorAll('.ant-tree-treenode').length,
    ).toBe(2);
  });
});
