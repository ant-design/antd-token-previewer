import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import type { ComponentPanelProps } from '../src/component-panel';
import ComponentPanel from '../src/component-panel';
import useToken from '../src/hooks/useToken';
import { _statistic_build_ as statistic } from 'antd/es/theme/util/statistic';
import { antdComponents } from '../src/component-panel';

describe('ComponentPanel', () => {
  const Panel = ({ themes, ...restProps }: Partial<ComponentPanelProps>) => {
    const [token] = useToken();

    const mergedThemes = themes || [
      {
        name: '默认主题',
        key: 'default',
        config: { override: { alias: token } },
      },
    ];

    return <ComponentPanel themes={mergedThemes} {...restProps} />;
  };

  it('filterMode filter should work', () => {
    const { container } = render(<Panel selectedTokens={['colorPrimary']} />);
    const relatedComponents = Object.entries(statistic)
      .filter(([, { global: tokens }]) => tokens.includes('colorPrimary'))
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
    expect(container.querySelector('.component-demos')?.children.length).toBe(
      componentLength,
    );
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
