import type { DerivativeFunc } from '@ant-design/cssinjs';
import { CaretDownOutlined } from '@ant-design/icons';
import { Dropdown, Segmented, Tag } from 'antd';
import classNames from 'classnames';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import type { ReactNode } from 'react';
import React, { forwardRef, useImperativeHandle } from 'react';
import GlobalTokenEditor from './GlobalTokenEditor';
import useControlledTheme from './hooks/useControlledTheme';
import type { Theme } from './interface';
import type { Locale } from './locale';
import { LocaleContext, zhCN } from './locale';
import makeStyle from './utils/makeStyle';

const useStyle = makeStyle('ThemeEditor', (token) => ({
  [token.componentCls]: {
    backgroundColor: token.colorBgLayout,
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    [`${token.componentCls}-header`]: {
      height: token.headerHeight,
      display: 'flex',
      alignItems: 'center',
      padding: '0 16px',
      background: token.colorBgContainer,
      borderBottom: `1px solid ${token.colorSplit}`,
      flex: `0 0 ${token.headerHeight}px`,

      '&-title': {
        fontSize: token.fontSizeLG,
        fontWeight: token.fontWeightStrong,
      },

      '&-actions': {
        marginLeft: 'auto',
      },
    },
    [`${token.componentCls}-body`]: {
      flex: 1,
      height: 0,
    },
  },
}));

const defaultTheme: Theme = {
  name: '默认主题',
  key: 'default',
  config: {},
};

export type ThemeEditorRef = {
  updateRef: () => void;
};

export type ThemeEditorMode = 'global' | 'component';

export type ThemeEditorProps = {
  theme?: Theme;
  onThemeChange?: (theme: Theme) => void;
  className?: string;
  style?: React.CSSProperties;
  darkAlgorithm?: DerivativeFunc<any, any>;
  locale?: Locale;
  actions?: ReactNode;
  mode?: ThemeEditorMode;
  onModeChange?: (mode: ThemeEditorMode) => void;
  advanced?: boolean;
  onAdvancedChange?: (advanced: boolean) => void;
};

const ThemeEditor = forwardRef<ThemeEditorRef, ThemeEditorProps>(
  (
    {
      theme: customTheme,
      onThemeChange,
      className,
      style,
      darkAlgorithm,
      locale = zhCN,
      actions,
      mode: customMode,
      onModeChange,
      advanced: customAdvanced,
      onAdvancedChange,
    },
    ref,
  ) => {
    const prefixCls = 'antd-theme-editor';
    const [wrapSSR, hashId] = useStyle(prefixCls);

    const [mode, setMode] = useMergedState<ThemeEditorMode>('global', {
      value: customMode,
      onChange: onModeChange,
    });

    const handleAdvancedChange = (value: boolean) => {
      if (!value) {
        setMode('global');
      }
      onAdvancedChange?.(value);
    };

    const [advanced, setAdvanced] = useMergedState<boolean>(false, {
      value: customAdvanced,
      onChange: handleAdvancedChange,
    });

    const { theme, infoFollowPrimary, onInfoFollowPrimaryChange, updateRef } =
      useControlledTheme({
        theme: customTheme,
        defaultTheme,
        onChange: onThemeChange,
        darkAlgorithm,
      });

    useImperativeHandle(ref, () => ({
      updateRef,
    }));

    return wrapSSR(
      <LocaleContext.Provider value={locale}>
        <div className={classNames(hashId, prefixCls, className)} style={style}>
          <div className={`${prefixCls}-header`}>
            <div className={`${prefixCls}-header-title`}>{locale.title}</div>
            <Dropdown
              trigger={['click']}
              menu={{
                items: [
                  {
                    key: 'basic',
                    label: locale.basicMode,
                    onClick: () => setAdvanced(false),
                  },
                  {
                    key: 'advanced',
                    label: locale.advancedMode,
                    onClick: () => setAdvanced(true),
                  },
                ],
              }}
            >
              <Tag
                color={advanced ? 'blue' : 'green'}
                style={{ marginLeft: 24, cursor: 'pointer' }}
              >
                <span>{advanced ? locale.advancedMode : locale.basicMode}</span>
                <CaretDownOutlined style={{ fontSize: 10 }} />
              </Tag>
            </Dropdown>
            {advanced && (
              <Segmented
                options={[
                  { label: locale.globalToken, value: 'global' },
                  { label: locale.componentToken, value: 'component' },
                ]}
                onChange={(v) => setMode(v as ThemeEditorMode)}
                style={{ marginLeft: 24 }}
              />
            )}
            <div className={`${prefixCls}-header-actions`}>{actions}</div>
          </div>
          <div className={`${prefixCls}-body`}>
            {mode === 'global' && (
              <GlobalTokenEditor
                theme={theme}
                advanced={advanced}
                infoFollowPrimary={infoFollowPrimary}
                onInfoFollowPrimaryChange={onInfoFollowPrimaryChange}
              />
            )}
          </div>
        </div>
      </LocaleContext.Provider>,
    );
  },
);

export default ThemeEditor;
