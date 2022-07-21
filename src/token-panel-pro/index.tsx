import React from 'react';
import makeStyle from '../utils/makeStyle';
import { Tabs } from 'antd';
import classNames from 'classnames';
import ColorTokenContent from './ColorTokenContent';

const { TabPane } = Tabs;

const useStyle = makeStyle('TokenPanelPro', (token) => ({
  '.token-panel-pro': {
    height: '100%',
    backgroundColor: '#F7F8FA',
    backgroundImage:
      'linear-gradient(180deg, #FFFFFF 0%, rgba(246,247,249,0.00) 100%)',
    [`.token-panel-pro-tabs${token.rootCls}-tabs`]: {
      [`${token.rootCls}-tabs-content`]: {
        height: '100%',
      },
    },
  },
}));

const TokenPanelPro = () => {
  const [wrapSSR, hashId] = useStyle();

  return wrapSSR(
    <div className={classNames(hashId, 'token-panel-pro')}>
      <Tabs
        defaultActiveKey="color"
        tabBarGutter={32}
        tabBarStyle={{ padding: '0 16px', margin: 0 }}
        style={{ height: '100%' }}
        className="token-panel-pro-tabs"
      >
        <TabPane key="color" tab="颜色">
          <ColorTokenContent />
        </TabPane>
        <TabPane key="size" tab="尺寸大小" disabled>
          Size
        </TabPane>
        <TabPane key="others" tab="其他" disabled>
          Others
        </TabPane>
      </Tabs>
    </div>,
  );
};

export default TokenPanelPro;
