import type { MenuProps } from 'antd';
import { Anchor, ConfigProvider, Empty, Menu, Switch, Tooltip } from 'antd';
import tokenMeta from 'antd/lib/version/token-meta.json';
import tokenStatistic from 'antd/lib/version/token.json';
import classNames from 'classnames';
import type { FC } from 'react';
import React, { useMemo, useRef, useState } from 'react';
import { useDebouncyFn } from 'use-debouncy';
import { antdComponents } from '../component-panel';
import type { MutableTheme } from '../interface';
import { useLocale } from '../locale';
import ComponentDemos from '../previews/components';
import deepUpdateObj from '../utils/deepUpdateObj';
import getDesignToken from '../utils/getDesignToken';
import getValueByPath from '../utils/getValueByPath';
import makeStyle from '../utils/makeStyle';
import DemoCard from './DemoCard';
import DemoWrapper from './DemoWrapper';
import TokenItem from './TokenItem';

const useStyle = makeStyle('ComponentTokenEditor', (token) => ({
  [token.componentCls]: {
    display: 'flex',
    height: '100%',
    width: '100%',

    [`${token.componentCls}-menu`]: {
      [`${token.rootCls}-menu-item-group-title`]: {
        paddingLeft: 28,
        marginBlock: 16,
        fontSize: 13,

        '&::after': {
          position: 'relative',
          top: 12,
          display: 'block',
          width: 'calc(100% - 20px)',
          height: 1,
          background: token.colorSplit,
          content: '""',
        },
      },
      [`${token.componentCls}-menu-component-sub`]: {
        fontSize: 12,
        marginLeft: 8,
        fontWeight: 'normal',
      },
    },
    [`${token.componentCls}-demo`]: {
      flex: 1,
      width: 0,
      background: token.colorBgLayout,
      display: 'flex',
      flexDirection: 'column',

      [`${token.componentCls}-demo-banner`]: {
        padding: '28px 24px 24px',
        flex: 'none',
        background: token.colorBgContainer,
        borderBottom: `1px solid ${token.colorSplit}`,

        '&-title': {
          fontSize: token.fontSizeHeading3,
          lineHeight: token.lineHeightHeading3,
          color: token.colorTextHeading,
        },

        '&-info': {
          fontSize: token.fontSize,
          lineHeight: token.lineHeight,
          color: token.colorTextSecondary,
          marginLeft: 12,
        },
      },
    },

    [`${token.componentCls}-token-panel`]: {
      flex: '0 0 400px',
      height: '100%',
      background: token.colorBgContainer,
      borderLeft: `1px solid ${token.colorSplit}`,
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',

      '&-block': {
        padding: '16px 6px',

        '&:not(:last-child)': {
          borderBottom: `1px solid ${token.colorSplit}`,
        },
      },

      '&-subtitle': {
        fontSize: token.fontSizeSM,
        lineHeight: token.lineHeightSM,
        fontWeight: token.fontWeightStrong,
        marginBottom: 12,
        marginLeft: 8,
        color: token.colorText,
      },

      [`&-anchor${token.rootCls}-anchor-wrapper`]: {
        padding: '0px 16px',

        [`${token.rootCls}-anchor`]: {
          padding: '10px 0',
        },
      },
    },
  },
}));

const getTokenCount = (component: string) => {
  // @ts-ignore
  const componentStatistic = tokenStatistic[component];
  const globalCount = componentStatistic?.global.length || 0;
  const componentCount =
    Object.keys(componentStatistic?.component || {}).length || 0;

  return {
    total: globalCount + componentCount,
    global: globalCount,
    component: componentCount,
  };
};

const classifyTokens = (tokens: string[]) => {
  const result: {
    color: string[];
    size: string[];
    style: string[];
  } = {
    color: [],
    size: [],
    style: [],
  };

  for (const token of tokens) {
    if (
      ['color', 'bg'].some((key) => token.toLocaleLowerCase().includes(key)) ||
      token.toLocaleLowerCase().endsWith('outline')
    ) {
      result.color.push(token);
    } else if (
      ['size', 'margin', 'padding', 'height', 'width'].some((key) =>
        token.toLocaleLowerCase().includes(key),
      )
    ) {
      result.size.push(token);
    } else {
      result.style.push(token);
    }
  }

  result.color.sort();
  result.size.sort();
  result.style.sort();

  return result;
};

export interface ComponentTokenEditorProps {
  theme: MutableTheme;
}

const ComponentTokenEditor: FC<ComponentTokenEditorProps> = ({ theme }) => {
  const locale = useLocale();
  const prefixCls = `antd-component-token-editor`;
  const [activeComponent, setActiveComponent] = useState<string>('Button');
  const tokenPanelRef = useRef<HTMLDivElement>(null);

  const hashId = useStyle(prefixCls);

  const count = useMemo(
    () => getTokenCount(activeComponent),
    [activeComponent],
  );

  const tokenGroups = useMemo(() => {
    const globalTokens = (tokenStatistic as any)[activeComponent]?.global || [];
    const componentTokens = Object.keys(
      (tokenStatistic as any)[activeComponent]?.component || {},
    );
    return {
      global: classifyTokens(globalTokens),
      component: classifyTokens(componentTokens),
    };
  }, [activeComponent]);

  const [enableAlgorithm, setEnableAlgorithm] = useState(
    !!getValueByPath(theme.config, [
      'components',
      activeComponent,
      'algorithm',
    ]),
  );

  const debouncedAlgorithmChange = useDebouncyFn((checked: boolean) => {
    theme.onThemeChange?.(
      deepUpdateObj(
        theme.config,
        ['components', activeComponent, 'algorithm'],
        checked || undefined,
      ),
      ['components', activeComponent, 'algorithm'],
    );
  }, 500);

  const handleAlgorithmChange = (checked: boolean) => {
    setEnableAlgorithm(checked);
    debouncedAlgorithmChange(checked);
  };

  const menuItems: MenuProps['items'] = useMemo(
    () =>
      Object.entries(antdComponents).map(([key, value]) => ({
        key,
        label: (locale.components as any)[key],
        type: 'group',
        children: value.map((item) => ({
          key: item,
          label: (
            <span>
              {item}
              {locale._lang === 'zh-CN' && (
                <span className={`${prefixCls}-menu-component-sub`}>
                  {(locale.components as any)[item]}
                </span>
              )}
            </span>
          ),
        })),
      })),
    [locale],
  );

  return (
    <div className={classNames(prefixCls, hashId)}>
      <div
        style={{
          flex: '0 0 258px',
          height: '100%',
          overflow: 'auto',
        }}
      >
        <Menu
          className={`${prefixCls}-menu`}
          items={menuItems}
          selectedKeys={[activeComponent]}
          onSelect={({ key }) => {
            setActiveComponent(key);
          }}
          style={{
            width: '100%',
          }}
        />
      </div>
      <div className={`${prefixCls}-demo`}>
        <div className={`${prefixCls}-demo-banner`}>
          <div className={`${prefixCls}-demo-banner-title`}>
            {activeComponent}
            {locale._lang === 'zh-CN' && (
              <span style={{ marginLeft: 12 }}>
                {(locale.components as any)[activeComponent]}
              </span>
            )}
            <span className={`${prefixCls}-demo-banner-info`}>
              {locale.demo.tokenCount(
                count.total,
                count.global,
                count.component,
              )}
            </span>
          </div>
        </div>
        <ConfigProvider theme={{ ...theme.config, inherit: false }}>
          <DemoWrapper>
            {ComponentDemos[activeComponent].map((item) => (
              <DemoCard demo={item} key={item.key} />
            ))}
          </DemoWrapper>
        </ConfigProvider>
      </div>
      <div className={`${prefixCls}-token-panel`}>
        <Anchor
          affix={false}
          getContainer={() => tokenPanelRef.current!}
          className={`${prefixCls}-token-panel-anchor`}
          direction="horizontal"
          items={[
            {
              title: locale.color,
              href: '#component-color',
              key: 'color',
            },
            {
              title: locale.size,
              href: '#component-size',
              key: 'size',
            },
            {
              title: locale.style,
              href: '#component-style',
              key: 'style',
            },
          ]}
        />
        <Tooltip
          title={locale.componentAlgorithm}
          placement="bottom"
          mouseEnterDelay={0.2}
        >
          <div
            style={{
              position: 'absolute',
              top: 14,
              right: 12,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <label
              htmlFor="component-algorithm"
              style={{ fontSize: 12, marginRight: 4, cursor: 'pointer' }}
            >
              {locale.enableComponentAlgorithm}
            </label>
            <Switch
              id="component-algorithm"
              checked={enableAlgorithm}
              size="small"
              onChange={handleAlgorithmChange}
            />
          </div>
        </Tooltip>
        <div
          ref={tokenPanelRef}
          style={{ flex: 1, height: 0, overflow: 'auto' }}
        >
          {['color', 'size', 'style'].map((key) => (
            <div
              id={`component-${key}`}
              className={`${prefixCls}-token-panel-block`}
              key={key}
            >
              <div className={`${prefixCls}-token-panel-subtitle`}>
                {(locale as any)[key]}
              </div>
              {(tokenGroups.component as any)[key]
                .filter((token: string) => {
                  return (tokenMeta.components as any)[activeComponent].some(
                    (meta: any) => meta.token === token,
                  );
                })
                .map((token: string) => {
                  const configValue = getValueByPath(theme.config, [
                    'components',
                    activeComponent,
                    token,
                  ]);
                  const value =
                    configValue ??
                    (tokenStatistic as any)[activeComponent].component[token];
                  return (
                    <TokenItem
                      key={token}
                      token={token}
                      theme={theme}
                      value={value}
                      configValue={configValue}
                      component={activeComponent}
                      color={key === 'color'}
                      tooltip={
                        (tokenMeta.components as any)[activeComponent].find(
                          (meta: any) => meta.token === token,
                        )?.[locale._lang === 'zh-CN' ? 'desc' : 'descEN']
                      }
                      prefix={
                        <span className={`${prefixCls}-token-item-tag`}>
                          {locale.component}
                        </span>
                      }
                    />
                  );
                })}
              {(tokenGroups.global as any)[key].map((token: string) => {
                const configValue = getValueByPath(theme.config, [
                  'components',
                  activeComponent,
                  token,
                ]);
                const value =
                  configValue ?? (getDesignToken(theme.config) as any)[token];
                return (
                  <TokenItem
                    key={token}
                    token={token}
                    theme={theme}
                    value={value}
                    tooltip={
                      (tokenMeta.global as any)[token]?.[
                        locale._lang === 'zh-CN' ? 'desc' : 'descEn'
                      ]
                    }
                    configValue={configValue}
                    component={activeComponent}
                    color={key === 'color'}
                  />
                );
              })}
              {!(tokenGroups.component as any)[key].length &&
                !(tokenGroups.global as any)[key].length && (
                  <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description="暂无相关 Token"
                  />
                )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ComponentTokenEditor;
