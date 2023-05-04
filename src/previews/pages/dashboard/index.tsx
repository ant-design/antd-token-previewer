import {
  BookFilled,
  BookOutlined,
  BulbOutlined,
  DownCircleFilled,
  DownOutlined,
  EllipsisOutlined,
  ExperimentFilled,
  FolderFilled,
  PlayCircleOutlined,
} from '@ant-design/icons';
import {
  Avatar,
  Button,
  Card,
  Col,
  List,
  Progress,
  Row,
  Space,
  Tag,
  theme,
  Typography,
} from 'antd';
import classNames from 'classnames';
import type { CSSProperties, FC } from 'react';
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

const favList = [
  {
    title: 'Ant Design',
    logo: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
  },
  {
    title: 'Pro Components',
    logo: 'https://gw.alipayobjects.com/zos/antfincdn/upvrAjAPQX/Logo_Tech%252520UI.svg',
  },
  { title: 'Egg', logo: 'https://www.eggjs.org/logo.svg' },
  {
    title: 'AntV',
    logo: 'data:image/png;base64,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',
  },
  {
    title: '语雀',
    logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAV1BMVEVHcEzV9d7k+e3p+/Hn+/Dr+/PU9trp+/Hf+erl++/f+eux6sLE8NPZ9+Y9xWpEym9Iy3FL0HVW1H6Z46/Q9N582Jhez2py23Zn1XN94XVy3HJx2nZi0W3ktykcAAAAHXRSTlMATJXJ6P8Tooz///v//////////f///////Y6gys7C0GMAAAFKSURBVHgBddMFlqBADATQAO2Oy+79zzlpG3Tq8bQ+CQqXNG1HKCVd28BHGKeXcPbsBX1E3E8n9BXCLj39DPurl1TeRZmvdIwxFolMiNyvzzgf+t73fhhlEeK6QMoR+5zBSoUmL+EVWONKjYdMoRxBPV/aqQ99JaOZ0gyAhuZkEM4tk1JIGmjrAKUmh32ovbURtNCdYEaAiSTgCgRKdkB+e+O8r8Brk0cQOAcEjwkpCCYEUUDt5eBCJQjGAlRdQedl3bZlCXUIgigIdLkft3VDgEFxGdFBGwHV61pBFn7OoM0PyqwXENKSIYMmPepp3W8giQzSy7L7XkHKBXAETGH/mODLCsUAc+yvCfUiBaQ8gIsTnMaeQMkb+MEgYBWwKwgROI3g+mNcQOpHM5FLjzkqcJgwGiPgEfYPQe5nbQSDjzTH/22eRy0aOPMDBCgrid9tSjUAAAAASUVORK5CYII=',
  },
  {
    title: 'Kitchen',
    logo: 'https://gw.alipayobjects.com/zos/bmw-prod/0c1ffb68-21c0-4227-9633-7a969826599e.svg',
  },
  { title: '蚂蚁体验科技' },
  { title: '查看全部', logo: <EllipsisOutlined /> },
];

const todoList = [
  {
    title: 'AntV 数据可视化',
    subtitle: '申请发布',
    author: '青士',
    time: '2020-07-01 14:00',
    status: '待审核',
  },
  {
    title: 'AntV 数据可视化',
    subtitle: '申请发布',
    author: '青士',
    time: '2020-07-01 14:00',
    status: '待审核',
  },
  {
    title: 'AntV 数据可视化',
    subtitle: '申请发布',
    author: '青士',
    time: '2020-07-01 14:00',
    status: '待审核',
  },
  {
    title: 'AntV 数据可视化',
    subtitle: '申请发布',
    author: '青士',
    time: '2020-07-01 14:00',
    status: '待审核',
  },
];

const recentList = [
  {
    title: 'Ant Design Pro',
    icon: <ExperimentFilled style={{ color: '#1AC3C3', fontSize: 24 }} />,
    author: '笙笙',
    status: '测试阶段',
  },
  {
    title: 'Ant Design Pro',
    icon: <ExperimentFilled style={{ color: '#1AC3C3', fontSize: 24 }} />,
    author: '笙笙',
    status: '测试阶段',
  },
  {
    title: 'Ant Design Pro',
    icon: <ExperimentFilled style={{ color: '#1AC3C3', fontSize: 24 }} />,
    author: '笙笙',
    status: '测试阶段',
  },
  {
    title: 'Ant Design Pro',
    icon: <ExperimentFilled style={{ color: '#1AC3C3', fontSize: 24 }} />,
    author: '笙笙',
    status: '测试阶段',
  },
  {
    title: 'Ant Design Pro',
    icon: <ExperimentFilled style={{ color: '#1AC3C3', fontSize: 24 }} />,
    author: '笙笙',
    status: '测试阶段',
  },
];

const activityList = [
  {
    creator: '汤尧',
    project: '语雀升级版本 3.4',
    time: '12 分钟前',
    logs: ['[WIP] ANT02240964', 'Status: opened', 'Repository: xbricks'],
  },
  { creator: '汤尧', project: '蚂蚁企业级产品', time: '24 分钟前' },
  {
    creator: '汤尧',
    project: '语雀升级版本 3.3',
    time: '48 分钟前',
    logs: ['[WIP] ANT02240964', 'Status: opened', 'Repository: xbricks'],
  },
];

const AntDesignDir = ({ style }: { style?: CSSProperties }) => {
  const { token } = theme.useToken();

  return (
    <div
      style={{ color: token.colorTextTertiary, whiteSpace: 'nowrap', ...style }}
    >
      <FolderFilled
        style={{
          color: token.colorTextQuaternary,
          marginRight: token.marginXXS,
        }}
      />
      Ant Design
    </div>
  );
};

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
                bodyStyle={{
                  paddingTop: token.padding,
                  paddingBottom: token.paddingSM,
                }}
              >
                <List<(typeof todoList)[number]>
                  dataSource={todoList}
                  bordered={false}
                  loadMore={
                    <Typography.Link
                      disabled
                      style={{ textAlign: 'center', display: 'block' }}
                    >
                      查看全部
                    </Typography.Link>
                  }
                  renderItem={(item) => (
                    <Card
                      bodyStyle={{
                        padding: `${token.paddingXS}px ${token.padding}px`,
                        display: 'flex',
                        alignItems: 'center',
                      }}
                      style={{ marginBottom: token.marginSM }}
                    >
                      <div style={{ width: '100%' }}>
                        <div style={{ fontSize: token.fontSize }}>
                          <span
                            style={{
                              fontWeight: token.fontWeightStrong,
                              marginRight: token.marginXXS,
                            }}
                          >
                            {item.title}
                          </span>
                          <span>{item.subtitle}</span>
                        </div>
                        <div
                          style={{
                            fontSize: token.fontSizeSM,
                            color: token.colorTextTertiary,
                          }}
                        >
                          <span>{item.author}</span>
                          <span style={{ marginInline: token.marginXXS }}>
                            ·
                          </span>
                          <span>{item.time}</span>
                        </div>
                      </div>
                      <AntDesignDir />
                      <Button
                        style={{
                          padding: `0 ${token.paddingXS}px`,
                          height: (token.controlHeightLG * 7) / 10,
                          marginLeft: token.marginLG,
                        }}
                      >
                        <span style={{ color: token.colorInfo }}>
                          {item.status}
                        </span>
                        <DownOutlined
                          style={{
                            fontSize: token.fontSizeIcon,
                            color: token.colorIcon,
                          }}
                        />
                      </Button>
                    </Card>
                  )}
                />
              </Card>
              <Card
                tabList={tabList}
                tabBarExtraContent={<Button>新建</Button>}
                bodyStyle={{
                  paddingTop: token.padding,
                  paddingBottom: token.paddingSM,
                }}
              >
                <List<(typeof recentList)[number]>
                  dataSource={recentList}
                  bordered={false}
                  loadMore={
                    <Typography.Link
                      disabled
                      style={{ textAlign: 'center', display: 'block' }}
                    >
                      查看全部
                    </Typography.Link>
                  }
                  renderItem={(item, index) => (
                    <Card
                      bodyStyle={{
                        padding: `${token.paddingXS}px ${token.padding}px`,
                        display: 'flex',
                        alignItems: 'center',
                      }}
                      style={{ marginBottom: token.marginSM }}
                    >
                      {item.icon}
                      <div
                        style={{
                          fontSize: token.fontSize,
                          marginLeft: token.margin,
                        }}
                      >
                        <span
                          style={{
                            fontWeight: token.fontWeightStrong,
                            marginRight: token.marginXXS,
                          }}
                        >
                          {item.title}
                        </span>
                      </div>
                      <div
                        style={{
                          marginLeft: 'auto',
                          marginRight: token.marginXL,
                        }}
                      >
                        <Avatar
                          src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`}
                          style={{
                            width: 16,
                            height: 16,
                            verticalAlign: 'text-bottom',
                            marginRight: token.marginXXS,
                          }}
                        />
                        <span
                          style={{
                            color: token.colorTextTertiary,
                            fontSize: token.fontSize,
                          }}
                        >
                          {item.author}
                        </span>
                      </div>
                      <AntDesignDir style={{ marginRight: token.marginXL }} />
                      <div>
                        <Progress
                          percent={80}
                          steps={5}
                          size="small"
                          showInfo={false}
                          style={{ marginRight: token.marginXS }}
                        />
                        <span style={{ color: token.colorTextTertiary }}>
                          {item.status}
                        </span>
                      </div>
                    </Card>
                  )}
                />
              </Card>
              <Card
                title="动态"
                bodyStyle={{ paddingBottom: 0, paddingTop: token.margin }}
              >
                <List<(typeof activityList)[number]>
                  dataSource={activityList}
                  bordered={false}
                  loadMore={
                    <Typography.Link
                      disabled
                      style={{
                        textAlign: 'center',
                        display: 'block',
                        marginBlock: token.marginSM,
                      }}
                    >
                      查看全部
                    </Typography.Link>
                  }
                  renderItem={(item, index) => (
                    <List.Item
                      style={{
                        justifyContent: 'start',
                        alignItems: 'flex-start',
                      }}
                    >
                      <Avatar
                        src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`}
                        style={{ marginRight: token.margin }}
                      />
                      <div style={{ flex: 1, width: 0 }}>
                        <div style={{ color: token.colorTextTertiary }}>
                          {item.time}
                        </div>
                        <div>
                          <span>{item.creator}</span>
                          <span
                            style={{
                              color: token.colorTextSecondary,
                              marginInline: token.marginXXS,
                            }}
                          >
                            申请迭代
                          </span>
                          <span>{item.project}</span>
                          <span
                            style={{
                              color: token.colorTextSecondary,
                              marginInline: token.marginXXS,
                            }}
                          >
                            发布
                          </span>
                        </div>
                        {item.logs && (
                          <Card
                            style={{
                              background: token.colorFillQuaternary,
                              marginTop: token.margin,
                              width: '100%',
                            }}
                            bordered={false}
                            bodyStyle={{
                              padding: `${token.paddingSM}px ${token.padding}px`,
                            }}
                          >
                            {item.logs.map((log) => (
                              <div
                                key={log}
                                style={{ color: token.colorTextSecondary }}
                              >
                                {log}
                              </div>
                            ))}
                          </Card>
                        )}
                      </div>
                    </List.Item>
                  )}
                />
              </Card>
            </Space>
          </Col>
          <Col flex="0 0 253px">
            <Space
              direction="vertical"
              style={{ width: '100%' }}
              size={token.margin}
            >
              <Card
                title="我的收藏"
                bodyStyle={{ paddingBottom: token.paddingLG - token.marginSM }}
              >
                <List
                  bordered={false}
                  grid={{ column: 4, gutter: 16 }}
                  dataSource={favList}
                  renderItem={(item) => (
                    <div
                      style={{
                        textAlign: 'center',
                        marginBottom: token.marginSM,
                      }}
                    >
                      <div>
                        {typeof item.logo === 'string' ? (
                          <Avatar src={item.logo} />
                        ) : (
                          <Avatar>{item.logo ?? item.title.slice(0, 1)}</Avatar>
                        )}
                      </div>
                      <div
                        style={{
                          fontSize: token.fontSizeSM,
                          marginTop: token.marginXS,
                          color: token.colorTextSecondary,
                        }}
                      >
                        {item.title}
                      </div>
                    </div>
                  )}
                />
              </Card>
              <Card
                title="使用帮助"
                extra={<Typography.Link disabled>更多</Typography.Link>}
                actions={[
                  <Button key="prompt" type="link" icon={<BulbOutlined />}>
                    新手引导
                  </Button>,
                  <Button key="demo" type="link" icon={<PlayCircleOutlined />}>
                    视频演示
                  </Button>,
                  <Button key="docs" type="link" icon={<BookOutlined />}>
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
