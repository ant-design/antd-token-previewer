import type { MutableTheme } from '../interface';
import type { FC, ReactNode } from 'react';
import React, { Fragment } from 'react';
import ComponentDemos from '../component-demos';
import ComponentCard, { getComponentDemoId } from './ComponentCard';
import { ConfigProvider, Divider } from '@madccc/antd';
import makeStyle from '../utils/makeStyle';
import classNames from 'classnames';
import type { TokenName } from '../interface';

type ComponentDemoGroupProps = {
  themes: MutableTheme[];
  components: Record<string, string[]>;
  activeComponents?: string[];
  size?: 'small' | 'middle' | 'large';
  disabled?: boolean;
  selectedTokens?: string[];
  onTokenClick?: (token: TokenName) => void;
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
                  <div
                    className="previewer-component-demo-group-item"
                    style={{
                      backgroundColor:
                        theme.config.override?.alias?.colorBgContainer,
                    }}
                  >
                    <ComponentCard
                      component={item}
                      theme={theme}
                      onTokenClick={onTokenClick}
                    >
                      <ConfigProvider
                        componentSize={size}
                        componentDisabled={disabled}
                      >
                        {Demos.map((demo, index) => (
                          <Fragment key={index}>
                            {demo}
                            {index < Demos.length - 1 && <Divider />}
                          </Fragment>
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
