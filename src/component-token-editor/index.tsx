import type { MenuProps } from 'antd';
import {
  Anchor,
  Card,
  ConfigProvider,
  Divider,
  Empty,
  Menu,
  Typography,
} from 'antd';
import tokenStatistic from 'antd/lib/version/token.json';
import classNames from 'classnames';
import type { FC } from 'react';
import React, { useMemo, useRef, useState } from 'react';
import ColorPreview from '../ColorPreview';
import { antdComponents } from '../component-panel';
import type { MutableTheme } from '../interface';
import { useLocale } from '../locale';
import ComponentDemos from '../previews/components';
import { HIGHLIGHT_COLOR } from '../utils/constants';
import getDesignToken from '../utils/getDesignToken';
import getValueByPath from '../utils/getValueByPath';
import makeStyle from '../utils/makeStyle';
import ComponentTokenInput from './component-token-input';
import DemoWrapper from './DemoWrapper';

const { Link } = Typography;

const useStyle = makeStyle('ComponentTokenEditor', (token) => ({
  [token.componentCls]: {
    display: 'flex',
    height: '100%',
    width: '100%',

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
          marginBottom: 20,
        },

        '&-info': {
          fontSize: token.fontSize,
          lineHeight: token.lineHeight,
          color: token.colorTextSecondary,
        },
      },
    },

    [`${token.componentCls}-token-panel`]: {
      flex: '0 0 320px',
      height: '100%',
      background: token.colorBgContainer,
      borderLeft: `1px solid ${token.colorSplit}`,
      display: 'flex',
      flexDirection: 'column',

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

      [`${token.componentCls}-token-item`]: {
        borderRadius: token.borderRadiusLG,
        height: 40,
        display: 'flex',
        alignItems: 'center',
        padding: '0 8px',
        transition: 'all 0.2s',
        cursor: 'pointer',
        '&:not(:last-child)': {
          marginBottom: 4,
        },
        '&:hover': {
          background: token.colorFillTertiary,
        },
        '&-name': {
          fontSize: token.fontSizeSM,
          color: token.colorText,
        },
        '&-tag': {
          fontSize: token.fontSizeSM,
          lineHeight: token.lineHeightSM,
          background: token.colorSuccessBg,
          color: token.colorSuccess,
          padding: '0 6px',
          borderRadius: token.borderRadiusSM,
          marginLeft: 4,
        },
        '&-value': {
          fontSize: token.fontSizeSM,
          lineHeight: token.lineHeightSM,
          marginLeft: 'auto',
          maxWidth: 140,
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          background: token.colorFillQuaternary,
          color: token.colorTextTertiary,
          padding: '0 6px',
          borderRadius: token.borderRadiusSM,
        },
      },
    },
  },
}));

const menuItems: MenuProps['items'] = Object.entries(antdComponents).map(
  ([key, value]) => ({
    key,
    label: key,
    type: 'group',
    children: value.map((item) => ({
      key: item,
      label: item,
    })),
  }),
);

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

  const [, hashId] = useStyle(prefixCls);

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
          </div>
          <div
            className={`${prefixCls}-demo-banner-info`}
          >{`Token 数: ${count.total} (${count.global} 个全局 Token / ${count.component} 个组件 Token)`}</div>
        </div>
        <ConfigProvider theme={{ ...theme.config, inherit: false }}>
          <DemoWrapper>
            {ComponentDemos[activeComponent].map((item) => (
              <Card
                title={`关联 Token: ${item.tokens?.join(', ')}`}
                key={item.key}
              >
                {item.demo}
                <Divider />
              </Card>
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
              title: '颜色',
              href: '#component-color',
              key: 'color',
            },
            {
              title: '尺寸',
              href: '#component-size',
              key: 'size',
            },
            {
              title: '风格',
              href: '#component-style',
              key: 'style',
            },
          ]}
        />
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
              {(tokenGroups.component as any)[key].map((token: string) => {
                const configValue = getValueByPath(theme.config, [
                  'components',
                  activeComponent,
                  token,
                ]);
                const value =
                  configValue ??
                  (tokenStatistic as any)[activeComponent].component[token];
                return (
                  <ComponentTokenInput
                    theme={theme}
                    token={token}
                    component={activeComponent}
                    value={value}
                    color={key === 'color'}
                    key={key}
                  >
                    <div key={key} className={`${prefixCls}-token-item`}>
                      <span
                        className={`${prefixCls}-token-item-name`}
                        style={{ color: configValue ? HIGHLIGHT_COLOR : '' }}
                      >
                        {token}
                      </span>
                      <span className={`${prefixCls}-token-item-tag`}>
                        组件
                      </span>
                      {configValue !== undefined && (
                        <Link
                          style={{
                            fontSize: 12,
                            margin: '0 4px',
                            flex: 'none',
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            theme.onAbort?.([
                              'components',
                              activeComponent,
                              token,
                            ]);
                          }}
                        >
                          {locale.reset}
                        </Link>
                      )}
                      <span
                        className={`${prefixCls}-token-item-value`}
                        title={value}
                      >
                        {value}
                      </span>
                      {key === 'color' && (
                        <ColorPreview
                          size={16}
                          color={value as string}
                          style={{ marginLeft: 8 }}
                        />
                      )}
                    </div>
                  </ComponentTokenInput>
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
                  <ComponentTokenInput
                    theme={theme}
                    token={token}
                    component={activeComponent}
                    color={key === 'color'}
                    value={value}
                    key={key}
                  >
                    <div className={`${prefixCls}-token-item`}>
                      <span
                        className={`${prefixCls}-token-item-name`}
                        style={{ color: configValue ? HIGHLIGHT_COLOR : '' }}
                      >
                        {token}
                      </span>
                      {configValue !== undefined && (
                        <Link
                          style={{
                            fontSize: 12,
                            margin: '0 4px',
                            flex: 'none',
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            theme.onAbort?.([
                              'components',
                              activeComponent,
                              token,
                            ]);
                          }}
                        >
                          {locale.reset}
                        </Link>
                      )}
                      <span
                        className={`${prefixCls}-token-item-value`}
                        title={value}
                      >
                        {value}
                      </span>
                      {key === 'color' && (
                        <ColorPreview
                          size={16}
                          color={value}
                          style={{ marginLeft: 8 }}
                        />
                      )}
                    </div>
                  </ComponentTokenInput>
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
