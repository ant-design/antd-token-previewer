import type { Theme } from '../interface';
import type { FC, ReactNode } from 'react';
import React from 'react';
import ComponentDemos from '../component-demos';
import ComponentCard, { getComponentDemoId } from './ComponentCard';
import { ConfigProvider, Divider } from '@madccc/antd';
import makeStyle from '../utils/makeStyle';
import classNames from 'classnames';

type ComponentDemoGroupProps = {
  themes: Theme[];
  components: Record<string, string[]>;
  activeComponents?: string[];
  size?: 'small' | 'middle' | 'large';
  disabled?: boolean;
  selectedTokens?: string[];
};

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
      backgroundColor: token.colorBgContainer,
    },
  },
}));

const ComponentDemoGroup: FC<ComponentDemoGroupProps> = ({
  themes,
  components,
  size,
  disabled,
  activeComponents,
  selectedTokens,
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
                <ConfigProvider key={item} theme={theme.config}>
                  <div className="previewer-component-demo-group-item">
                    <ComponentCard theme={theme} component={item}>
                      <ConfigProvider
                        componentSize={size}
                        componentDisabled={disabled}
                      >
                        {Demos.map((demo, index) => (
                          <>
                            {demo}
                            {index < Demos.length - 1 && <Divider />}
                          </>
                        ))}
                      </ConfigProvider>
                    </ComponentCard>
                  </div>
                </ConfigProvider>
              ))}
            </div>
          );
        })}
    </>,
  );
};

export default ComponentDemoGroup;
