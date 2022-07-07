import Alert from './alert';
import Anchor from './anchor';
import AutoCompleteDemo from './auto-complete';
import Avatar from './avatar';
import Badge from './badge';
import BreadcrumbDemo from './breadcrumb';
import Button from './button';
import CalendarDemo from './calendar';
import CardDemo from './card/card';
import CarouselDemo from './carousel';
import Cascader from './cascader';
import Checkbox from './checkbox';
import CollapseDemo from './collapse';
import DatePicker from './datePicker';
import DescriptionsDemo from './descriptions';
import Dropdown from './dropdown';
import EmptyDemo from './empty';
import Form from './form';
import GridDemo from './grid';
import IconDemo from './icon';
import ImageDemo from './image';
import InputNumber from './inputNumber';
import Input from './input';
import ListDemo from './list';
import Mentions from './mentions';
import ModalDemo from './modal/modal';
import ModalWithButton from './modal/modalWithButton';
import Notification from './notification';
import Pagination from './pagination';
import PopconfirmDemo from './popconfirm';
import PopoverDemo from './popover';
import RadioDemo from './radio';
import RateDemo from './rate';
import Select from './select';
import SkeletonDemo from './skeleton';
import Slider from './slider';
import SpinDemo from './spin';
import StatisticDemo from './statistic';
import SwitchDemo from './switch';
import Table from './table';
import Tabs from './tabs';
import Tag from './tag';
import TimePickerDemo from './time-picker';
import Timeline from './timeline';
import TooltipDemo from './tooltip';
import Transfer from './transfer';
import TreeSelect from './treeSelect';
import TreeDemo from './tree';
import Typography from './typography';
import Upload from './upload';
import DividerDemo from './divider';
import SpaceDemo from './space';
import Menu from './menu';
import Steps from './steps';
import SegmentedDemo from './segmented';
import DrawerDemo from './drawer';
import Message from './message';
import Progress from './progress';
import Result from './result';

import React from 'react';

import type { ComponentDemo } from '../interface';

export type PreviewerDemos = Record<string, ComponentDemo[]>;

const ComponentDemos: PreviewerDemos = {
  Alert,
  Anchor,
  AutoComplete: [{ demo: <AutoCompleteDemo /> }],
  Avatar,
  Badge,
  Breadcrumb: [{ demo: <BreadcrumbDemo /> }],
  Button,
  Calendar: [{ demo: <CalendarDemo /> }],
  Card: [
    {
      demo: <CardDemo />,
    },
  ],
  Carousel: [{ demo: <CarouselDemo /> }],
  Cascader,
  Checkbox: [{ demo: <Checkbox /> }],
  Collapse: [{ demo: <CollapseDemo /> }],
  DatePicker,
  Descriptions: [{ demo: <DescriptionsDemo /> }],
  Dropdown,
  Empty: [{ demo: <EmptyDemo /> }],
  Form,
  Grid: [{ demo: <GridDemo /> }],
  Icon: [{ demo: <IconDemo /> }],
  Image: [{ demo: <ImageDemo /> }],
  InputNumber,
  Input,
  List: [{ demo: <ListDemo /> }],
  Mentions,
  Modal: [{ demo: <ModalDemo /> }, ModalWithButton],
  Notification,
  Pagination,
  Popconfirm: [{ demo: <PopconfirmDemo /> }],
  Popover: [{ demo: <PopoverDemo /> }],
  Radio: [{ demo: <RadioDemo /> }],
  Rate: [{ demo: <RateDemo /> }],
  Select,
  Skeleton: [{ demo: <SkeletonDemo /> }],
  Slider: [{ demo: <Slider /> }],
  Spin: [{ demo: <SpinDemo /> }],
  Statistic: [{ demo: <StatisticDemo /> }],
  Switch: [{ demo: <SwitchDemo /> }],
  Table,
  Tabs,
  Tag,
  TimePicker: [{ demo: <TimePickerDemo /> }],
  Timeline,
  Tooltip: [{ demo: <TooltipDemo /> }],
  Transfer,
  TreeSelect,
  Tree: [{ demo: <TreeDemo /> }],
  Typography,
  Upload,
  Divider: [{ demo: <DividerDemo /> }],
  Space: [{ demo: <SpaceDemo /> }],
  Menu,
  Steps,
  Segmented: [{ demo: <SegmentedDemo /> }],
  Drawer: [{ demo: <DrawerDemo /> }],
  Message,
  Result,
  Progress,
};

export default ComponentDemos;
