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
import DropdownDemo from './dropdown';
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
import SliderDemo from './slider';
import SpinDemo from './spin';
import StatisticDemo from './statistic';
import SwitchDemo from './switch';
import Table from './table';
import Tabs from './tabs';
import Tag from './tag';
import TimePickerDemo from './time-picker';
import TimelineDemo from './timeline';
import TooltipDemo from './tooltip';
import Transfer from './transfer';
import TreeSelectDemo from './tree-select';
import TreeDemo from './tree';
import Typography from './typography';
import Upload from './upload';
import DividerDemo from './divider';
import SpaceDemo from './space';
import Menu from './menu';
import StepsDemo from './steps';
import SegmentedDemo from './segmented';
import DrawerDemo from './drawer';
import Message from './message';
import Progress from './progress';
import Result from './result';

import React from 'react';

import type { PreviewerDemo } from '../interface';

export type PreviewerDemos = Record<string, PreviewerDemo>;

const ComponentDemos: PreviewerDemos = {
  Alert,
  Anchor,
  AutoComplete: { default: <AutoCompleteDemo /> },
  Avatar,
  Badge,
  Breadcrumb: { default: <BreadcrumbDemo /> },
  Button,
  Calendar: { default: <CalendarDemo /> },
  Card: {
    default: <CardDemo />,
  },
  Carousel: { default: <CarouselDemo /> },
  Cascader,
  Checkbox,
  Collapse: { default: <CollapseDemo /> },
  DatePicker,
  Descriptions: { default: <DescriptionsDemo /> },
  Dropdown: { default: <DropdownDemo /> },
  Empty: { default: <EmptyDemo /> },
  Form,
  Grid: { default: <GridDemo /> },
  Icon: { default: <IconDemo /> },
  Image: { default: <ImageDemo /> },
  InputNumber,
  Input,
  List: { default: <ListDemo /> },
  Mentions,
  Modal: { default: <ModalDemo />, optional: [ModalWithButton] },
  Notification,
  Pagination,
  Popconfirm: { default: <PopconfirmDemo /> },
  Popover: { default: <PopoverDemo /> },
  Radio: { default: <RadioDemo /> },
  Rate: { default: <RateDemo /> },
  Select,
  Skeleton: { default: <SkeletonDemo /> },
  Slider: { default: <SliderDemo /> },
  Spin: { default: <SpinDemo /> },
  Statistic: { default: <StatisticDemo /> },
  Switch: { default: <SwitchDemo /> },
  Table,
  Tabs,
  Tag,
  TimePicker: { default: <TimePickerDemo /> },
  Timeline: { default: <TimelineDemo /> },
  Tooltip: { default: <TooltipDemo /> },
  Transfer,
  TreeSelect: { default: <TreeSelectDemo /> },
  Tree: { default: <TreeDemo /> },
  Typography,
  Upload,
  Divider: { default: <DividerDemo /> },
  Space: { default: <SpaceDemo /> },
  Menu,
  Steps: { default: <StepsDemo /> },
  Segmented: { default: <SegmentedDemo /> },
  Drawer: { default: <DrawerDemo /> },
  Message,
  Result,
  Progress,
};

export default ComponentDemos;
