import type { DerivativeFunc } from '@ant-design/cssinjs';
import { CaretDownOutlined } from '@ant-design/icons';
import { Button, Dropdown, message, Segmented, Tag } from 'antd';
import classNames from 'classnames';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import type { ReactNode } from 'react';
import React, {
  forwardRef,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import ComponentTokenEditor from './component-token-editor';
import { AdvancedContext } from './context';
import type { EditorModalProps } from './editor-modal';
import EditorModal from './editor-modal';
import GlobalTokenEditor from './GlobalTokenEditor';
import useControlledTheme from './hooks/useControlledTheme';
import type { Theme } from './interface';
import type { Locale } from './locale';
import { LocaleContext, zhCN } from './locale';
import { HIGHLIGHT_COLOR } from './utils/constants';
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
        color: token.colorText,
      },

      '&-actions': {
        marginLeft: 'auto',

        '&-diff': {
          fontSize: token.fontSize,
          color: token.colorTextTertiary,
        },
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
  children?: ReactNode;
};

function isObject(target: any) {
  return Object.prototype.toString.call(target) === '[object Object]';
}

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
      children,
    },
    ref,
  ) => {
    const prefixCls = 'antd-theme-editor';
    const [wrapSSR, hashId] = useStyle(prefixCls);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [mode, setMode] = useMergedState<ThemeEditorMode>('global', {
      value: customMode,
      onChange: onModeChange,
    });
    const [messageApi, contextHolder] = message.useMessage();

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
        onChange: (newTheme: Theme) => {
          onThemeChange?.(newTheme);
        },
        darkAlgorithm,
      });

    const editTotal = useMemo(() => {
      const { token = {}, components = {} } = theme.config;
      let mergedEditTotal = Object.keys(token).length;
      if (components) {
        Object.values(components).forEach((componentTokens) => {
          if (isObject(componentTokens)) {
            console.log(componentTokens);
            mergedEditTotal += Object.keys(componentTokens).length;
          }
        });
      }
      return mergedEditTotal;
    }, [theme]);

    useImperativeHandle(ref, () => ({
      updateRef,
    }));

    const editModelClose = () => {
      setIsModalOpen(false);
    };

    const editSave: EditorModalProps['onOk'] = (config) => {
      const themeConfig = {
        ...theme,
        config,
      };

      if (!isObject(themeConfig)) {
        messageApi.error('主题 JSON 格式错误');
        return;
      }
      onThemeChange?.(themeConfig);
      editModelClose();
      messageApi.success('编辑成功');
    };

    return wrapSSR(
      <LocaleContext.Provider value={locale}>
        <AdvancedContext.Provider value={advanced}>
          {contextHolder}
          <div
            className={classNames(hashId, prefixCls, className)}
            style={style}
          >
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
                  style={{ marginLeft: 24, cursor: 'pointer', fontSize: 12 }}
                >
                  <span>
                    {advanced ? locale.advancedMode : locale.basicMode}
                  </span>
                  <CaretDownOutlined style={{ fontSize: 10 }} />
                </Tag>
              </Dropdown>
              {advanced && (
                <Segmented
                  value={mode}
                  options={[
                    { label: locale.globalToken, value: 'global' },
                    { label: locale.componentToken, value: 'component' },
                  ]}
                  onChange={(v) => setMode(v as ThemeEditorMode)}
                  style={{ marginLeft: 24 }}
                />
              )}
              <div className={`${prefixCls}-header-actions`}>
                <span
                  className={`${prefixCls}-header-actions-diff`}
                  style={{ marginRight: 8, fontSize: 14 }}
                >
                  {locale.total}{' '}
                  <span style={{ color: HIGHLIGHT_COLOR }}>{editTotal}</span>{' '}
                  {locale.changes}
                </span>
                <Button
                  style={{ marginRight: 8 }}
                  onClick={() => setIsModalOpen(true)}
                >
                  {locale.themeConfig}
                </Button>
                {actions}
              </div>
            </div>
            <div className={`${prefixCls}-body`}>
              {mode === 'global' && (
                <GlobalTokenEditor
                  theme={theme}
                  infoFollowPrimary={infoFollowPrimary}
                  onInfoFollowPrimaryChange={onInfoFollowPrimaryChange}
                >
                  {children}
                </GlobalTokenEditor>
              )}
              {mode === 'component' && <ComponentTokenEditor theme={theme} />}
            </div>
            <EditorModal
              open={isModalOpen}
              onOk={editSave}
              theme={theme}
              onCancel={editModelClose}
            />
          </div>
        </AdvancedContext.Provider>
      </LocaleContext.Provider>,
    );
  },
);

export default ThemeEditor;
