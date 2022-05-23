import React, { useMemo } from 'react';
import type { FC } from 'react';
import { Badge, Segmented, Tree } from '@madccc/antd';
import makeStyle from '../utils/makeStyle';
import classNames from 'classnames';
import useStatistic from '../hooks/useStatistic';

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

const antdComponents = {
  General: ['Button', 'Icon', 'Typography'],
  Layout: ['Divider', 'Grid', 'Layout', 'Space'],
  Navigation: [
    'Affix',
    'Breadcrumb',
    'Dropdown',
    'Menu',
    'PageHeader',
    'Pagination',
    'Steps',
  ],
  'Date Entry': [
    'AutoComplete',
    'Cascader',
    'Checkbox',
    'DatePicker',
    'Form',
    'Input',
    'InputNumber',
    'Mentions',
    'Radio',
    'Rate',
    'Select',
    'Slider',
    'Switch',
    'TimePicker',
    'Transfer',
    'TreeSelect',
    'Upload',
  ],
  'Data Display': [
    'Avatar',
    'Badge',
    'Calendar',
    'Card',
    'Carousel',
    'Collapse',
    'Comment',
    'Descriptions',
    'Empty',
    'Image',
    'List',
    'Popover',
    'Segmented',
    'Statistic',
    'Table',
    'Tabs',
    'Tag',
    'Timeline',
    'Tooltip',
    'Tree',
  ],
  Feedback: [
    'Alert',
    'Drawer',
    'Message',
    'Modal',
    'Notification',
    'Popconfirm',
    'Progress',
    'Result',
    'Skeleton',
    'Spin',
  ],
  Other: ['Anchor', 'BackTop', 'ConfigProvider'],
};

export type ComponentTreeProps = {
  onSelect?: (component: string) => void;
};

const ComponentTree: FC<ComponentTreeProps> = ({ onSelect }) => {
  const [wrapSSR, hashId] = useStyle();
  const { relatedComponents } = useStatistic();

  const treeData = useMemo(
    () =>
      Object.entries(antdComponents).map(([type, components]) => ({
        title: type,
        key: `type-${type}`,
        children: components.map((item) => ({
          title: (
            <span
              className={classNames('component-tree-item', {
                'component-tree-item-active': relatedComponents.includes(item),
              })}
            >
              {item}
            </span>
          ),
          switcherIcon: () => (
            <Badge
              color={relatedComponents.includes(item) ? 'blue' : 'transparent'}
            />
          ),
          key: item,
        })),
      })),
    [relatedComponents],
  );

  return wrapSSR(
    <div className={classNames('component-tree-wrapper', hashId)}>
      <div className="component-tree-head">
        <div className="component-tree-filter-type">筛选方式</div>
        <Segmented
          className="component-tree-filter-segmented"
          size="small"
          options={[
            { label: '过滤', value: 'filter' },
            { label: '高亮', value: 'highlight' },
          ]}
        />
      </div>
      <div style={{ overflow: 'auto', flex: 1 }}>
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
