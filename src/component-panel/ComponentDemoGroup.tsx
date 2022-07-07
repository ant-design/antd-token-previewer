import type { AliasToken, MutableTheme } from '../interface';
import type { FC, ReactNode } from 'react';
import React, { Fragment } from 'react';
import ComponentDemos from '../component-demos';
import ComponentCard, { getComponentDemoId } from './ComponentCard';
import { ConfigProvider, Divider, theme as antdTheme } from 'antd';
import makeStyle from '../utils/makeStyle';
import classNames from 'classnames';
import type { TokenName } from '../interface';

const { useToken } = antdTheme;

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
  onTokenClick?: (token: TokenName) => void;
  size?: 'small' | 'middle' | 'large';
  disabled?: boolean;
  demos?: ReactNode[];
};

const ComponentDemo: FC<ComponentDemoProps> = ({
  theme,
  component,
  onTokenClick,
  size = 'middle',
  disabled = false,
  demos = [],
}) => {
  const { token } = useToken();

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
  components: Record<string, string[]>;
  activeComponents?: string[];
  size?: 'small' | 'middle' | 'large';
  disabled?: boolean;
  selectedTokens?: string[];
  onTokenClick?: (token: TokenName) => void;
};

const ComponentDemoGroup: FC<ComponentDemoGroupProps> = ({
  themes,
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
          const demos: ReactNode[] = componentDemos
            .filter(
              (demo, index) =>
                ((!selectedTokens || selectedTokens.length === 0) &&
                  index === 0) ||
                selectedTokens?.some((token) =>
                  demo.tokens?.includes(token as keyof AliasToken),
                ),
            )
            .map((demo) => demo.demo);
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
                    onTokenClick={onTokenClick}
                    demos={demos}
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
