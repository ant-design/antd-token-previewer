import {
  BookFilled,
  BookOutlined,
  BulbOutlined,
  DownCircleFilled,
  PlayCircleOutlined,
} from '@ant-design/icons';
import {
  Button,
  Card,
  Col,
  List,
  Row,
  Space,
  Tag,
  theme,
  Typography,
} from 'antd';
import classNames from 'classnames';
import type { FC } from 'react';
import React from 'react';
import makeStyle from '../../../utils/makeStyle';

const useStyle = makeStyle('AppDemoDashboard', (token) => ({
  [token.componentCls]: {
    [`&-banner${token.rootCls}-card`]: {
      background: '#247FFF',
      color: token.colorTextLightSolid,
      [`${token.componentCls}-banner-title`]: {
        fontSize: token.fontSizeHeading3,
        lineHeight: token.lineHeightHeading3,
        marginBottom: token.marginXS,
      },
      [`${token.componentCls}-banner-guide`]: {
        marginLeft: token.marginSM,
        '> *:not(:last-child)': {
          marginRight: token.marginXXS,
        },
      },
      [`${token.componentCls}-banner-arrow`]: {
        marginLeft: 'auto',
        fontSize: token.fontSizeHeading3,
      },
    },
  },
}));

const tabList = [
  {
    key: 'usual',
    tab: '最常使用',
  },
  {
    key: 'recent',
    tab: '最近使用',
  },
];

const helpList = [
  '语雀是什么',
  'Ant Design 设计原则',
  '语雀数据安全',
  '如何使用 Ant Design Pro 模版',
  '数据可视化常见疑问点',
  '深入浅出解释 Ant Design Landing',
  'Dumi 使用帮助',
  '如何参与体验一起造',
];

const announcementList = [
  { tag: '最新', title: '产品力评估模型发布会', time: '1天前' },
  {
    tag: '更新',
    title:
      '蚂蚁金服设计平台用最小的作量，工作台常被作为应用的主页，是一个为用户提供便利的交通枢纽。工作台提供常用信息入口，以中心辐射的方式导航至应用的各功能模块；呈现用户当前需要关注的信息，缩短获取关键信息的路径；同时允许用户在工作台直接操作一些高频任务。',
    time: '1周前',
  },
  { tag: '平台', title: 'Ant Design 5.0 正式发布', time: '2周前' },
];

const Dashboard: FC = () => {
  const prefixCls = 'app-demo-dashboard';
  const [, hashId] = useStyle(prefixCls);
  const { token } = theme.useToken();

  return (
    <div className={classNames(hashId, prefixCls)}>
      <Space
        direction="vertical"
        style={{ width: '100%' }}
        size={token.marginLG}
      >
        <Card className={`${prefixCls}-banner`}>
          <div style={{ display: 'flex', alignItems: 'flex-start' }}>
            <div className={`${prefixCls}-banner-title`}>
              Hi，欢迎使用应用 Paas 平台！
            </div>
            <DownCircleFilled className={`${prefixCls}-banner-arrow`} />
          </div>
          <div>
            <span>
              轻松创建、部署和管理你的应用，提升研发效率，降低业务成本
            </span>
            <span className={`${prefixCls}-banner-guide`}>
              <BookFilled />
              <span style={{ textDecoration: 'underline' }}>开启引导</span>
            </span>
          </div>
        </Card>
        <Row gutter={token.marginLG}>
          <Col flex={1}>
            <Space
              direction="vertical"
              style={{ width: '100%' }}
              size={token.margin}
            >
              <Card
                title={
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span>代办事项</span>
                    <Tag
                      bordered={false}
                      style={{ marginLeft: 8, borderRadius: 6, height: 20 }}
                    >
                      12
                    </Tag>
                  </div>
                }
              >
                代办
              </Card>
              <Card
                tabList={tabList}
                tabBarExtraContent={<Button>新建</Button>}
              >
                代办
              </Card>
              <Card title="动态">代办</Card>
            </Space>
          </Col>
          <Col flex="0 0 253px">
            <Space
              direction="vertical"
              style={{ width: '100%' }}
              size={token.margin}
            >
              <Card title="我的收藏" extra={<Button>新建</Button>}>
                我的
              </Card>
              <Card
                title="使用帮助"
                extra={<Typography.Link disabled>更多</Typography.Link>}
                actions={[
                  <Button type="link" icon={<BulbOutlined />}>
                    新手引导
                  </Button>,
                  <Button type="link" icon={<PlayCircleOutlined />}>
                    视频演示
                  </Button>,
                  <Button type="link" icon={<BookOutlined />}>
                    产品文档
                  </Button>,
                ]}
                bodyStyle={{
                  paddingBlock: token.padding,
                }}
              >
                <List
                  bordered={false}
                  dataSource={helpList}
                  renderItem={(item, index) => (
                    <Typography.Paragraph
                      style={{ marginBottom: index < 7 ? token.marginSM : 0 }}
                    >
                      {item}
                    </Typography.Paragraph>
                  )}
                />
              </Card>
              <Card
                title="公告"
                extra={<Typography.Link disabled>更多</Typography.Link>}
                bodyStyle={{
                  paddingBlock: token.paddingMD,
                }}
              >
                <List<(typeof announcementList)[number]>
                  bordered={false}
                  dataSource={announcementList}
                  renderItem={(item, index) => (
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: index < 2 ? token.marginXS : '',
                      }}
                    >
                      <Tag
                        bordered={false}
                        style={{ color: token.colorTextSecondary }}
                      >
                        {item.tag}
                      </Tag>
                      <span
                        style={{
                          flex: 1,
                          textOverflow: 'ellipsis',
                          width: '0',
                          marginRight: 8,
                          overflow: 'hidden',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {item.title}
                      </span>
                      <span
                        style={{
                          marginLeft: 'auto',
                          flex: 'none',
                          color: token.colorTextQuaternary,
                        }}
                      >
                        {item.time}
                      </span>
                    </div>
                  )}
                />
              </Card>
            </Space>
          </Col>
        </Row>
      </Space>
    </div>
  );
};

export default Dashboard;
