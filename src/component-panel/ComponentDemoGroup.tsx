import type {
  AliasToken,
  ComponentDemo,
  MutableTheme,
  TokenName,
} from '../interface';
import type { FC } from 'react';
import React, { Fragment } from 'react';
import ComponentDemos from '../component-demos';
import ComponentCard, { getComponentDemoId } from './ComponentCard';
import { ConfigProvider, Divider, Tooltip } from 'antd';
import makeStyle from '../utils/makeStyle';
import classNames from 'classnames';

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
  },
}));

const useDemoStyle = makeStyle('ComponentDemoBlock', (token) => ({
  '.previewer-component-demo-group-item': {
    flex: '1 1 50%',
    paddingInline: token.padding,
    paddingBlock: token.padding / 2,
    width: 0,
    backgroundColor: token.colorBgLayout,

    '.previewer-component-demo-group-item-relative-token': {
      color: token.colorTextSecondary,
      paddingBottom: 8,

      '&:not(:first-child)': {
        marginTop: 12,
      },
    },
  },
}));

type ComponentDemoBlockProps = {
  theme: MutableTheme;
  component: string;
  onTokenClick?: (token: TokenName) => void;
  size?: 'small' | 'middle' | 'large';
  disabled?: boolean;
  demos?: ComponentDemo[];
};

const ComponentDemoBlock: FC<ComponentDemoBlockProps> = ({
  theme,
  component,
  onTokenClick,
  size = 'middle',
  disabled = false,
  demos = [],
}) => {
  const [, hashId] = useDemoStyle();

  return (
    <div className={classNames('previewer-component-demo-group-item', hashId)}>
      <ComponentCard
        component={component}
        theme={theme}
        onTokenClick={onTokenClick}
      >
        <ConfigProvider componentSize={size} componentDisabled={disabled}>
          {demos.map((demo, index) => (
            <Fragment key={index}>
              {index > 0 && <Divider />}
              {demo.tokens && (
                <div className="previewer-component-demo-group-item-relative-token">
                  <Tooltip title={demo.tokens.join(', ')}>
                    <span>
                      关联 token: {demo.tokens.slice(0, 2).join(', ')}
                      {demo.tokens.length > 2 ? '...' : ''}
                    </span>
                  </Tooltip>
                </div>
              )}
              {demo.demo}
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
          const demos: ComponentDemo[] = componentDemos.filter(
            (demo, index) => {
              return (
                ((!selectedTokens || selectedTokens.length === 0) &&
                  index === 0) ||
                selectedTokens?.some((token) =>
                  demo.tokens?.includes(token as keyof AliasToken),
                )
              );
            },
          );
          return (
            <div
              className={classNames('previewer-component-demo-group', hashId)}
              key={item}
              id={getComponentDemoId(item)}
            >
              {themes.map((theme) => (
                <ConfigProvider key={theme.key} theme={theme.config}>
                  <ComponentDemoBlock
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
