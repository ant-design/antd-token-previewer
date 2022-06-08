import classNames from 'classnames';
import type { FC } from 'react';
import React, { useRef, useState } from 'react';
import ComponentTree from './ComponentTree';
import makeStyle from '../utils/makeStyle';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import ComponentDemos from '../component-demos';
import ComponentCard, { getComponentDemoId } from './ComponentCard';
import { ConfigProvider, Segmented, Switch } from '@madccc/antd';
import type { Theme } from '../interface';
import useStatistic from '../hooks/useStatistic';

const useStyle = makeStyle('ComponentPanel', (token) => ({
  '.component-panel': {
    boxShadow:
      '0 2px 4px 0 rgba(0,0,0,0.05), 0 1px 2px 0 rgba(25,15,15,0.07), 0 0 1px 0 rgba(0,0,0,0.08)',
    backgroundColor: '#fff',
    display: 'flex',
    borderRadius: 6,
    height: '100%',
    overflow: 'hidden',

    '.component-panel-main': {
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: token.colorBgContainer,
      flex: 1,
      width: 0,

      '.component-panel-head': {
        padding: `${token.padding}px ${token.paddingSM}px`,
        flex: 'none',
        backgroundColor: token.colorBgComponent,
        display: 'flex',
        alignItems: 'center',
        borderBottom: `${token.lineWidth}px ${token.lineType} ${token.colorBgContainer}`,

        '> *:not(:first-child)': {
          marginLeft: token.margin,
        },

        '.ant-segmented-item': {
          minWidth: 52,
        },
      },

      '.component-panel-toggle-side-icon': {
        flex: 'none',
        cursor: 'pointer',
        marginRight: token.marginXS,

        '.anticon': {
          color: token.colorAction,
          transition: `color ${token.motionDurationMid}`,

          '&:hover': {
            color: token.colorActionHover,
          },
        },
      },
    },

    '.component-panel-side': {
      flex: 'none',
      width: 160,
      overflow: 'hidden',
      transition: `transform ${token.motionDurationMid}, width ${token.motionDurationMid}`,
    },

    '.component-panel-side.component-panel-side-hidden': {
      width: 0,
      transform: 'translateX(-160px)',
    },

    '.component-demos-wrapper': {
      display: 'flex',
      flex: 1,
      height: 0,
    },

    '.component-demos': {
      padding: token.padding,
      height: '100%',
      overflow: 'auto',

      '> *:not(:first-child)': {
        marginTop: token.margin,
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
  Other: ['Anchor', 'BackTop'],
};

type ComponentDemoGroupProps = {
  theme: string;
  components: Record<string, string[]>;
  activeComponents?: string[];
  size?: 'small' | 'middle' | 'large';
  disabled?: boolean;
};

const ComponentDemoGroup: FC<ComponentDemoGroupProps> = ({
  theme,
  components,
  size,
  disabled,
  activeComponents,
}) => {
  return (
    <>
      {Object.entries(components)
        .reduce<string[]>((result, [, group]) => result.concat(group), [])
        .filter(
          (item) =>
            !activeComponents ||
            activeComponents.length === 0 ||
            activeComponents.includes(item),
        )
        .map((item) => {
          const Demo = (ComponentDemos as any)[`${item}Demo`];
          return Demo ? (
            <ComponentCard theme={theme} key={item} component={item}>
              <ConfigProvider componentSize={size} componentDisabled={disabled}>
                <Demo />
              </ConfigProvider>
            </ComponentCard>
          ) : null;
        })}
    </>
  );
};

export type ComponentPanelProps = {
  themes: Theme[];
  selectedTokens?: string[];
};

const Index: FC<ComponentPanelProps> = ({ themes, selectedTokens }) => {
  const [wrapSSR, hashId] = useStyle();
  const [showSide, setShowSide] = useState<boolean>(true);
  const demosRef = useRef<HTMLDivElement>(null);
  const demosRef2 = useRef<HTMLDivElement>(null);
  const [componentSize, setComponentSize] = useState<
    'large' | 'small' | 'middle'
  >('middle');
  const [componentDisabled, setComponentDisabled] = useState<boolean>(false);
  const [filterMode, setFilterMode] = useState<'filter' | 'highlight'>(
    'filter',
  );

  const { relatedComponents } = useStatistic(selectedTokens);

  return wrapSSR(
    <div className={classNames('component-panel', hashId)}>
      <div
        className={classNames('component-panel-side', {
          'component-panel-side-hidden': !showSide,
        })}
      >
        <ComponentTree
          filterMode={filterMode}
          onFilterModeChange={(value) => setFilterMode(value)}
          selectedTokens={selectedTokens}
          components={antdComponents}
          onSelect={(component) => {
            demosRef.current
              ?.querySelector(
                `#${getComponentDemoId(component, themes[0].key)}`,
              )
              ?.scrollIntoView({
                block: 'start',
                inline: 'nearest',
                behavior: 'smooth',
              });
          }}
        />
      </div>
      <div className="component-panel-main">
        <div className="component-panel-head">
          <div
            className="component-panel-toggle-side-icon"
            onClick={() => setShowSide((prev) => !prev)}
          >
            {showSide ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
          </div>
          <div>
            <span style={{ marginRight: 8 }}>组件尺寸：</span>
            <Segmented
              value={componentSize}
              onChange={(value) => setComponentSize(value as any)}
              options={[
                { label: '大', value: 'large' },
                { label: '中', value: 'middle' },
                { label: '小', value: 'small' },
              ]}
            />
          </div>
          <div>
            <span style={{ marginRight: 8, verticalAlign: 'middle' }}>
              禁用：
            </span>
            <Switch
              checked={componentDisabled}
              onChange={(checked) => setComponentDisabled(checked)}
            />
          </div>
        </div>
        <div className="component-demos-wrapper">
          <ConfigProvider theme={themes[0].config}>
            <div className="component-demos" ref={demosRef}>
              <ComponentDemoGroup
                theme={themes[0].key}
                components={antdComponents}
                size={componentSize}
                disabled={componentDisabled}
                activeComponents={relatedComponents}
              />
            </div>
          </ConfigProvider>
          {themes[1] && (
            <ConfigProvider theme={themes[1].config}>
              <div className="component-demos" ref={demosRef2}>
                <ComponentDemoGroup
                  theme={themes[1].key}
                  components={antdComponents}
                  size={componentSize}
                  disabled={componentDisabled}
                  activeComponents={relatedComponents}
                />
              </div>
            </ConfigProvider>
          )}
        </div>
      </div>
    </div>,
  );
};

export default Index;
