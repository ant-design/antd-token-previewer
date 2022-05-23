import type { FC } from 'react';
import React, { useRef, useState } from 'react';
import ComponentTree from './ComponentTree';
import makeStyle from '../utils/makeStyle';
import classNames from 'classnames';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import ComponentDemos from '../demos';
import ComponentCard, { getComponentDemoId } from './ComponentCard';
import { ConfigProvider, Segmented, Switch } from '@madccc/antd';

const components = Object.keys(ComponentDemos);

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

        '> *': {
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

    '.component-demos': {
      padding: token.padding,
      overflow: 'auto',
      width: '100%',

      '> *:not(:first-child)': {
        marginTop: token.margin,
      },
    },
  },
}));

const Index: FC = () => {
  const [wrapSSR, hashId] = useStyle();
  const [showSide, setShowSide] = useState<boolean>(true);
  const demosRef = useRef<HTMLDivElement>(null);
  const [componentSize, setComponentSize] = useState<
    'large' | 'small' | 'middle'
  >('middle');
  const [componentDisabled, setComponentDisabled] = useState<boolean>(false);

  return wrapSSR(
    <div className={classNames('component-panel', hashId)}>
      <div
        className={classNames('component-panel-side', {
          'component-panel-side-hidden': !showSide,
        })}
      >
        <ComponentTree
          onSelect={(component) =>
            demosRef.current
              ?.querySelector(`#${getComponentDemoId(component)}`)
              ?.scrollIntoView({
                block: 'start',
                inline: 'nearest',
                behavior: 'smooth',
              })
          }
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
        <div className="component-demos" ref={demosRef}>
          {components.map((item) => {
            const Demo = (ComponentDemos as any)[item];
            return (
              <ComponentCard key={item} component={item.replace('Demo', '')}>
                <ConfigProvider componentSize={componentSize}>
                  <Demo />
                </ConfigProvider>
              </ComponentCard>
            );
          })}
        </div>
      </div>
    </div>,
  );
};

export default Index;
