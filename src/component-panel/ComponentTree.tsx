import React, { useEffect, useMemo, useRef } from 'react';
import type { FC } from 'react';
import { Badge, Segmented, Tree } from '@madccc/antd';
import classNames from 'classnames';
import useStatistic from '../hooks/useStatistic';
import makeStyle from '../utils/makeStyle';
import useMergedState from 'rc-util/lib/hooks/useMergedState';

const useStyle = makeStyle('ComponentTree', (token) => ({
  '.component-tree-wrapper': {
    minWidth: 160,
    borderRight: `${token.lineWidth}px ${token.lineType} ${token.colorSplit}`,
    height: '100%',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: token.paddingXS,

    '.component-tree-head': {
      padding: token.paddingXS,
      display: 'flex',
      alignItems: 'center',
      flex: 'none',

      '.component-tree-filter-type': {
        color: token.colorTextSecondary,
        marginRight: token.marginXS,
        fontSize: token.fontSizeSM,
      },

      '.component-tree-filter-segmented': {
        fontSize: token.fontSizeSM,
      },
    },

    '.component-tree': {
      fontSize: token.fontSizeSM,

      '.component-tree-item.component-tree-item-active': {
        color: token.colorPrimary,
      },

      '.component-tree-item': {
        transition: `color ${token.motionDurationMid}`,
      },
    },
  },
}));

export type ComponentTreeProps = {
  onSelect?: (component: string) => void;
  components: Record<string, string[]>;
  selectedTokens?: string[];
  filterMode?: 'filter' | 'highlight';
  onFilterModeChange?: (mode: 'filter' | 'highlight') => void;
};

const ComponentTree: FC<ComponentTreeProps> = ({
  onSelect,
  components,
  selectedTokens,
  filterMode: customFilterMode = 'filter',
  onFilterModeChange,
}) => {
  const [wrapSSR, hashId] = useStyle();
  const { relatedComponents } = useStatistic(selectedTokens);
  const [filterMode, setFilterMode] = useMergedState<'filter' | 'highlight'>(
    customFilterMode,
  );
  const treeRef = useRef<HTMLDivElement>(null);

  const treeData = useMemo(
    () =>
      Object.entries(components)
        .filter(
          ([, group]) =>
            filterMode === 'highlight' ||
            !relatedComponents.length ||
            group.some((item) => relatedComponents.includes(item)),
        )
        .map(([type, group]) => ({
          title: type,
          key: `type-${type}`,
          children: group
            .filter(
              (item) =>
                filterMode === 'highlight' ||
                !relatedComponents.length ||
                relatedComponents.includes(item),
            )
            .map((item) => ({
              title: (
                <span
                  className={classNames('component-tree-item', {
                    'component-tree-item-active':
                      filterMode === 'highlight' &&
                      relatedComponents.includes(item),
                  })}
                >
                  {item}
                </span>
              ),
              switcherIcon: () => (
                <Badge
                  color={
                    filterMode === 'highlight' &&
                    relatedComponents.includes(item)
                      ? 'blue'
                      : 'transparent'
                  }
                />
              ),
              key: item,
            })),
        })),
    [components, relatedComponents, filterMode],
  );

  useEffect(() => {
    if (filterMode === 'highlight') {
      setTimeout(() => {
        treeRef.current
          ?.getElementsByClassName('component-tree-item-active')[0]
          ?.scrollIntoView({
            block: 'start',
            inline: 'nearest',
            behavior: 'smooth',
          });
      }, 100);
    }
  }, [selectedTokens, filterMode]);

  return wrapSSR(
    <div className={classNames('component-tree-wrapper', hashId)}>
      <div className="component-tree-head">
        <div className="component-tree-filter-type">筛选方式</div>
        <Segmented
          className="component-tree-filter-segmented"
          size="small"
          value={filterMode}
          onChange={(value) => {
            onFilterModeChange?.(value as any);
            setFilterMode(value as any);
          }}
          options={[
            { label: '过滤', value: 'filter' },
            { label: '高亮', value: 'highlight' },
          ]}
        />
      </div>
      <div ref={treeRef} style={{ overflow: 'auto', flex: 1 }}>
        <Tree
          showIcon
          defaultExpandAll
          treeData={treeData}
          className="component-tree"
          onSelect={(node) => onSelect?.(node[0] as string)}
        />
      </div>
    </div>,
  );
};

export default ComponentTree;
