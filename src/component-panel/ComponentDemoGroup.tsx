import type { Theme } from '../interface';
import type { FC } from 'react';
import React from 'react';
import ComponentDemos from '../component-demos';
import ComponentCard from './ComponentCard';
import { ConfigProvider } from '@madccc/antd';
import makeStyle from '../utils/makeStyle';
import classNames from 'classnames';

type ComponentDemoGroupProps = {
  themes: Theme[];
  components: Record<string, string[]>;
  activeComponents?: string[];
  size?: 'small' | 'middle' | 'large';
  disabled?: boolean;
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
          const Demo = (ComponentDemos as any)[`${item}Demo`];
          return Demo ? (
            <div
              className={classNames('previewer-component-demo-group', hashId)}
              key={item}
              style={{}}
            >
              {themes.map((theme) => (
                <ConfigProvider key={item} theme={theme.config}>
                  <div className="previewer-component-demo-group-item">
                    <ComponentCard theme={theme} component={item}>
                      <ConfigProvider
                        componentSize={size}
                        componentDisabled={disabled}
                      >
                        <Demo />
                      </ConfigProvider>
                    </ComponentCard>
                  </div>
                </ConfigProvider>
              ))}
            </div>
          ) : null;
        })}
    </>,
  );
};

export default ComponentDemoGroup;
