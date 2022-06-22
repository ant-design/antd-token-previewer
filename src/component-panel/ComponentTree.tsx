import React, { useEffect, useMemo, useRef, useState } from 'react';
import type { FC } from 'react';
import { Badge, Tree, Input } from '@madccc/antd';
import classNames from 'classnames';
import useStatistic from '../hooks/useStatistic';
import makeStyle from '../utils/makeStyle';
import type { FilterMode } from '../FilterPanel';
import { SearchOutlined } from '@ant-design/icons';

const useStyle = makeStyle('ComponentTree', (token) => ({
  '.component-tree-wrapper': {
    minWidth: 200,
    borderRight: `${token.lineWidth}px ${token.lineType} ${token.colorSplit}`,
    height: '100%',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    paddingBlock: token.paddingXS,

    '.component-tree-search': {
      margin: '0 8px 12px',
      width: 'calc(100% - 16px)',
      backgroundColor: 'rgba(0, 0, 0, 2%)',
      borderRadius: token.radiusLG,
      height: 24,
      input: {
        fontSize: 12,
      },
      '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 4%)',
      },
    },

    [`${token.rootCls}-tree.component-tree`]: {
      fontSize: token.fontSizeSM,

      '.component-tree-item.component-tree-item-highlight': {
        color: token.colorPrimary,
      },

      [`${token.rootCls}-tree-node-content-wrapper`]: {
        transition: `background-color ${token.motionDurationSlow}`,
        borderRadius: 4,
      },

      [`${token.rootCls}-tree-treenode-selected ${token.rootCls}-tree-node-content-wrapper`]:
        {
          backgroundColor: token.colorBgComponent,
        },

      [`${token.rootCls}-tree-treenode-active ${token.rootCls}-tree-node-content-wrapper`]:
        {
          color: token.colorTextLightSolid,
          backgroundColor: token.colorPrimary,

          '.component-tree-item.component-tree-item-highlight': {
            color: token.colorTextLightSolid,
          },
        },

      '.component-tree-item': {
        transition: `color ${token.motionDurationMid}`,
        lineHeight: `24px`,
        height: 24,
        display: 'inline-block',
      },
    },
  },
}));

export type ComponentTreeProps = {
  onSelect?: (component: string) => void;
  components: Record<string, string[]>;
  selectedTokens?: string[];
  filterMode?: FilterMode;
  activeComponent?: string;
};

const getTreeItemId = (component: string) => `component-tree-item-${component}`;

const ComponentTree: FC<ComponentTreeProps> = ({
  onSelect,
  components,
  selectedTokens,
  filterMode = 'filter',
  activeComponent,
}) => {
  const [wrapSSR, hashId] = useStyle();
  const { relatedComponents } = useStatistic(selectedTokens);
  const treeRef = useRef<HTMLDivElement>(null);
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    treeRef.current
      ?.querySelector<HTMLElement>(`#${getTreeItemId(activeComponent || '')}`)
      ?.scrollIntoView({
        block: 'nearest',
        inline: 'nearest',
      });
  }, [activeComponent]);

  const treeData = useMemo(
    () =>
      Object.entries(components)
        .filter(
          ([, group]) =>
            (filterMode === 'highlight' ||
              !relatedComponents.length ||
              group.some((item) => relatedComponents.includes(item))) &&
            (!search ||
              group.some((item) =>
                item.toLowerCase().includes(search.toLowerCase()),
              )),
        )
        .map(([type, group]) => ({
          title: type,
          key: `type-${type}`,
          children: group
            .filter(
              (item) =>
                (filterMode === 'highlight' ||
                  !relatedComponents.length ||
                  relatedComponents.includes(item)) &&
                (!search || item.toLowerCase().includes(search.toLowerCase())),
            )
            .map((item) => ({
              title: (
                <span
                  id={getTreeItemId(item)}
                  className={classNames('component-tree-item', {
                    'component-tree-item-highlight':
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
    [components, relatedComponents, filterMode, search],
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
      <Input
        allowClear
        placeholder="Type to search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        prefix={<SearchOutlined />}
        bordered={false}
        className="component-tree-search"
      />
      <div ref={treeRef} style={{ overflow: 'auto', flex: 1 }}>
        <Tree
          activeKey={activeComponent}
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
