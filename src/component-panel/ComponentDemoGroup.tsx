import type { MutableTheme } from '../interface';
import type { FC, ReactNode } from 'react';
import React, { Fragment } from 'react';
import ComponentDemos from '../component-demos';
import ComponentCard, { getComponentDemoId } from './ComponentCard';
import { ConfigProvider, Divider, useDesignToken } from '@madccc/antd';
import makeStyle from '../utils/makeStyle';
import classNames from 'classnames';
import type { TokenName } from '../interface';
import type { ThemeConfig } from '@madccc/antd/es/config-provider/context';

const useStyle = makeStyle('ComponentDemoGroup', (token) => ({
  '.previewer-component-demo-group': {
    display: 'flex',
    width: '100%',
    overflow: 'hidden',

    '&:first-child': {
      '.previewer-component-demo-group-item': {
        paddingTop: token.padding,
      },
    },

    '&:last-child': {
      '.previewer-component-demo-group-item': {
        paddingBottom: token.padding,
      },
    },

    '.previewer-component-demo-group-item': {
      flex: '1 1 50%',
      paddingInline: token.padding,
      paddingBlock: token.padding / 2,
      width: 0,
      backgroundColor: token.colorBgLayout,
    },
  },
}));

type ComponentDemoProps = {
  theme: MutableTheme;
  component: string;
  defaultTheme?: ThemeConfig;
  onTokenClick?: (token: TokenName) => void;
  size?: 'small' | 'middle' | 'large';
  disabled?: boolean;
  demos?: ReactNode[];
};

const ComponentDemo: FC<ComponentDemoProps> = ({
  theme,
  component,
  defaultTheme,
  onTokenClick,
  size = 'middle',
  disabled = false,
  demos = [],
}) => {
  const { token } = useDesignToken();

  return (
    <div
      className="previewer-component-demo-group-item"
      style={{
        backgroundColor: token.colorBgLayout,
      }}
    >
      <ComponentCard
        component={component}
        theme={theme}
        defaultTheme={defaultTheme}
        onTokenClick={onTokenClick}
      >
        <ConfigProvider componentSize={size} componentDisabled={disabled}>
          {demos.map((demo, index) => (
            <Fragment key={index}>
              {demo}
              {index < demos.length - 1 && <Divider />}
            </Fragment>
          ))}
        </ConfigProvider>
      </ComponentCard>
    </div>
  );
};

type ComponentDemoGroupProps = {
  themes: MutableTheme[];
  defaultTheme: ThemeConfig;
  components: Record<string, string[]>;
  activeComponents?: string[];
  size?: 'small' | 'middle' | 'large';
  disabled?: boolean;
  selectedTokens?: string[];
  onTokenClick?: (token: TokenName) => void;
};

const ComponentDemoGroup: FC<ComponentDemoGroupProps> = ({
  themes,
  defaultTheme,
  components,
  size,
  disabled,
  activeComponents,
  selectedTokens,
  onTokenClick,
}) => {
  const [wrapSSR, hashId] = useStyle();

  return wrapSSR(
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
          const componentDemos = ComponentDemos[item];
          if (!componentDemos) {
            return null;
          }
          const Demos: ReactNode[] = [componentDemos.default];
          if (
            selectedTokens &&
            selectedTokens.length > 0 &&
            componentDemos.optional
          ) {
            componentDemos.optional.forEach(({ tokens, demo }) => {
              if (
                (tokens &&
                  tokens.some((token) => selectedTokens.includes(token))) ||
                !tokens
              ) {
                Demos.push(demo);
              }
            });
          }
          return (
            <div
              className={classNames('previewer-component-demo-group', hashId)}
              key={item}
              id={getComponentDemoId(item)}
            >
              {themes.map((theme) => (
                <ConfigProvider key={theme.key} theme={theme.config}>
                  <ComponentDemo
                    component={item}
                    theme={theme}
                    defaultTheme={defaultTheme}
                    onTokenClick={onTokenClick}
                    demos={Demos}
                    disabled={disabled}
                    size={size}
                  />
                </ConfigProvider>
              ))}
            </div>
          );
        })}
    </>,
  );
};

export default ComponentDemoGroup;
