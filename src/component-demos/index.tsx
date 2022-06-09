import AlertDemo from './alert';
import AnchorDemo from './anchor';
import AutoCompleteDemo from './auto-complete';
import AvatarDemo from './avatar';
import BadgeDemo from './badge';
import BreadcrumbDemo from './breadcrumb';
import ButtonDemo from './button/button';
import CalendarDemo from './calendar';
import CardDemo from './card';
import CarouselDemo from './carousel';
import CascaderDemo from './cascader';
import CheckboxDemo from './checkbox';
import CollapseDemo from './collapse';
import DatePickerDemo from './date-picker';
import DescriptionsDemo from './descriptions';
import DropdownDemo from './dropdown';
import EmptyDemo from './empty';
import FormDemo from './form';
import GridDemo from './grid';
import IconDemo from './icon';
import ImageDemo from './image';
import InputNumberDemo from './input-number';
import InputDemo from './input';
import ListDemo from './list';
import MentionsDemo from './mentions';
import ModalDemo from './modal';
import NotificationDemo from './notification';
import PaginationDemo from './pagination';
import PopconfirmDemo from './popconfirm';
import PopoverDemo from './popover';
import RadioDemo from './radio';
import RateDemo from './rate';
import SelectDemo from './select';
import SkeletonDemo from './skeleton';
import SliderDemo from './slider';
import SpinDemo from './spin';
import StatisticDemo from './statistic';
import SwitchDemo from './switch';
import TableDemo from './table';
import TabsDemo from './tabs';
import TagDemo from './tag';
import TimePickerDemo from './time-picker';
import TimelineDemo from './timeline';
import TooltipDemo from './tooltip';
import TransferDemo from './transfer';
import TreeSelectDemo from './tree-select';
import TreeDemo from './tree';
import TypographyDemo from './typography';
import UploadDemo from './upload';
import DividerDemo from './divider';
import SpaceDemo from './space';
import MenuDemo from './menu';
import StepsDemo from './steps';
import SegmentedDemo from './segmented';
import DrawerDemo from './drawer';
import MessageDemo from './message';
import ProgressDemo from './progress';
import ResultDemo from './result';
import ButtonIconDemo from './button/button-icon';
import type { ReactElement } from 'react';
import React from 'react';

export type PreviewerDemos = Record<
  string,
  Record<string, { tokens?: string[]; demo: ReactElement }>
>;

const ComponentDemos: PreviewerDemos = {
  Alert: { default: { demo: <AlertDemo /> } },
  Anchor: { default: { demo: <AnchorDemo /> } },
  AutoComplete: { default: { demo: <AutoCompleteDemo /> } },
  Avatar: { default: { demo: <AvatarDemo /> } },
  Badge: { default: { demo: <BadgeDemo /> } },
  Breadcrumb: { default: { demo: <BreadcrumbDemo /> } },
  Button: {
    default: { demo: <ButtonDemo /> },
    icon: { tokens: ['colorPrimary'], demo: <ButtonIconDemo /> },
  },
  Calendar: { default: { demo: <CalendarDemo /> } },
  Card: { default: { demo: <CardDemo /> } },
  Carousel: { default: { demo: <CarouselDemo /> } },
  Cascader: { default: { demo: <CascaderDemo /> } },
  Checkbox: { default: { demo: <CheckboxDemo /> } },
  Collapse: { default: { demo: <CollapseDemo /> } },
  DatePicker: { default: { demo: <DatePickerDemo /> } },
  Descriptions: { default: { demo: <DescriptionsDemo /> } },
  Dropdown: { default: { demo: <DropdownDemo /> } },
  Empty: { default: { demo: <EmptyDemo /> } },
  Form: { default: { demo: <FormDemo /> } },
  Grid: { default: { demo: <GridDemo /> } },
  Icon: { default: { demo: <IconDemo /> } },
  Image: { default: { demo: <ImageDemo /> } },
  InputNumber: { default: { demo: <InputNumberDemo /> } },
  Input: { default: { demo: <InputDemo /> } },
  List: { default: { demo: <ListDemo /> } },
  Mentions: { default: { demo: <MentionsDemo /> } },
  Modal: { default: { demo: <ModalDemo /> } },
  Notification: { default: { demo: <NotificationDemo /> } },
  Pagination: { default: { demo: <PaginationDemo /> } },
  Popconfirm: { default: { demo: <PopconfirmDemo /> } },
  Popover: { default: { demo: <PopoverDemo /> } },
  Radio: { default: { demo: <RadioDemo /> } },
  Rate: { default: { demo: <RateDemo /> } },
  Select: { default: { demo: <SelectDemo /> } },
  Skeleton: { default: { demo: <SkeletonDemo /> } },
  Slider: { default: { demo: <SliderDemo /> } },
  Spin: { default: { demo: <SpinDemo /> } },
  Statistic: { default: { demo: <StatisticDemo /> } },
  Switch: { default: { demo: <SwitchDemo /> } },
  Table: { default: { demo: <TableDemo /> } },
  Tabs: { default: { demo: <TabsDemo /> } },
  Tag: { default: { demo: <TagDemo /> } },
  TimePicker: { default: { demo: <TimePickerDemo /> } },
  Timeline: { default: { demo: <TimelineDemo /> } },
  Tooltip: { default: { demo: <TooltipDemo /> } },
  Transfer: { default: { demo: <TransferDemo /> } },
  TreeSelect: { default: { demo: <TreeSelectDemo /> } },
  Tree: { default: { demo: <TreeDemo /> } },
  Typography: { default: { demo: <TypographyDemo /> } },
  Upload: { default: { demo: <UploadDemo /> } },
  Divider: { default: { demo: <DividerDemo /> } },
  Space: { default: { demo: <SpaceDemo /> } },
  Menu: { default: { demo: <MenuDemo /> } },
  Steps: { default: { demo: <StepsDemo /> } },
  Segmented: { default: { demo: <SegmentedDemo /> } },
  Drawer: { default: { demo: <DrawerDemo /> } },
  Message: { default: { demo: <MessageDemo /> } },
  Result: { default: { demo: <ResultDemo /> } },
  Progress: { default: { demo: <ProgressDemo /> } },
};

export default ComponentDemos;
