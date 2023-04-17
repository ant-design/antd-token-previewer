import type { DerivativeFunc } from '@ant-design/cssinjs';
import { CaretDownOutlined } from '@ant-design/icons';
import { Dropdown, Button, message, Modal, Segmented, Tag } from 'antd';
import type { ThemeConfig } from 'antd/es/config-provider/context';
import classNames from 'classnames';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import type { ReactNode } from 'react';
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react';
import type { OnChange } from 'vanilla-jsoneditor';
import GlobalTokenEditor from './GlobalTokenEditor';
import useControlledTheme from './hooks/useControlledTheme';
import type { Theme } from './interface';
import JSONEditor from './JSONEditor';
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
    },
    ref,
  ) => {
    const prefixCls = 'antd-theme-editor';
    const [wrapSSR, hashId] = useStyle(prefixCls);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editNum, setEditNum] = useState(0);
    const [editThemeFormatRight, setEditThemeFormatRight] =
      useState<boolean>(true);
    const [mode, setMode] = useMergedState<ThemeEditorMode>('global', {
      value: customMode,
      onChange: onModeChange,
    });
    const [messageApi, contextHolder] = message.useMessage();

    const setEditNumChange = (config: ThemeConfig) => {
      const { token = {}, components = {} } = config;
      let mergedEditNum = Object.keys(token).length;
      if (components) {
        for (const key in components) {
          const mergedItem = components[key as keyof ThemeConfig['components']];
          if (mergedItem && isObject(mergedItem)) {
            mergedEditNum += Object.keys(mergedItem).length;
          }
        }
      }
      setEditNum(mergedEditNum);
    };

    const [themeConfigContent, setThemeConfigContent] = useState<{
      text: string;
      json?: undefined;
    }>({
      text: JSON.stringify(defaultTheme.config),
      json: undefined,
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
        onChange: (newTheme: Theme) => {
          onThemeChange?.(newTheme);
          setThemeConfigContent({
            text: JSON.stringify(newTheme.config),
          });
          setEditNumChange?.(newTheme.config);
        },
        darkAlgorithm,
      });

    useImperativeHandle(ref, () => ({
      updateRef,
    }));

    const editModelClose = () => {
      setIsModalOpen(false);
    };

    const handleEditConfigChange: OnChange = (
      newContent,
      preContent,
      status,
    ) => {
      setThemeConfigContent(newContent as { text: string });
      if (
        status?.contentErrors &&
        Object.keys(status.contentErrors).length > 0
      ) {
        setEditThemeFormatRight(false);
      } else {
        setEditThemeFormatRight(true);
      }
    };

    const editSave = useCallback(() => {
      if (!editThemeFormatRight) {
        messageApi.error('主题 JSON 格式错误');
        return;
      }

      const themeConfig = {
        ...theme,
        config: JSON.parse(themeConfigContent.text),
      };

      if (!isObject(themeConfig)) {
        messageApi.error('主题 JSON 格式错误');
        return;
      }
      onThemeChange?.(themeConfig);
      setEditNumChange(themeConfig.config);
      editModelClose();
      messageApi.success('编辑成功');
    }, [themeConfigContent]);

    return wrapSSR(
      <LocaleContext.Provider value={locale}>
        {contextHolder}
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
            <div className={`${prefixCls}-header-actions`}>
              <span>
                共 <span style={{ color: '#dd5b21' }}>{editNum}</span> 处修改
              </span>
              <Button
                style={{ marginRight: 8 }}
                onClick={() => setIsModalOpen(true)}
              >
                主题编辑
              </Button>
              {actions}
            </div>
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
          <Modal
            title="编辑配置"
            open={isModalOpen}
            onOk={editSave}
            onCancel={editModelClose}
          >
            <JSONEditor
              content={themeConfigContent}
              onChange={handleEditConfigChange}
              mainMenuBar={false}
            />
          </Modal>
        </div>
      </LocaleContext.Provider>,
    );
  },
);

export default ThemeEditor;
