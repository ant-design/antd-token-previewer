import AlertDemo from './alert';
import AnchorDemo from './anchor';
import AutoCompleteDemo from './auto-complete';
import AvatarDemo from './avatar';
import BadgeDemo from './badge';
import BreadcrumbDemo from './breadcrumb';
import ButtonDemo from './button/button';
import CalendarDemo from './calendar';
import CardDemo from './card/card';
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
import SelectDemo from './select/select';
import SelectTag from './select/selectTag';
import SkeletonDemo from './skeleton';
import SliderDemo from './slider';
import SpinDemo from './spin';
import StatisticDemo from './statistic';
import SwitchDemo from './switch';
import TableDemo from './table/table';
import FilterTableDemo from './table/filterTable';
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
import ProgressDemo from './progress/progress';
import ResultDemo from './result';
import ButtonIconDemo from './button/button-icon';
import type { ReactElement } from 'react';
import React from 'react';
import type { TokenName } from '../interface';

export type PreviewerDemos = Record<
  string,
  {
    default: ReactElement;
    optional?: { tokens?: TokenName[]; demo: ReactElement }[];
  }
>;

const ComponentDemos: PreviewerDemos = {
  Alert: { default: <AlertDemo /> },
  Anchor: { default: <AnchorDemo /> },
  AutoComplete: { default: <AutoCompleteDemo /> },
  Avatar: { default: <AvatarDemo /> },
  Badge: { default: <BadgeDemo /> },
  Breadcrumb: { default: <BreadcrumbDemo /> },
  Button: {
    default: <ButtonDemo />,
    optional: [{ tokens: ['colorPrimary'], demo: <ButtonIconDemo /> }],
  },
  Calendar: { default: <CalendarDemo /> },
  Card: {
    default: <CardDemo />,
  },
  Carousel: { default: <CarouselDemo /> },
  Cascader: { default: <CascaderDemo /> },
  Checkbox: { default: <CheckboxDemo /> },
  Collapse: { default: <CollapseDemo /> },
  DatePicker: { default: <DatePickerDemo /> },
  Descriptions: { default: <DescriptionsDemo /> },
  Dropdown: { default: <DropdownDemo /> },
  Empty: { default: <EmptyDemo /> },
  Form: { default: <FormDemo /> },
  Grid: { default: <GridDemo /> },
  Icon: { default: <IconDemo /> },
  Image: { default: <ImageDemo /> },
  InputNumber: { default: <InputNumberDemo /> },
  Input: { default: <InputDemo /> },
  List: { default: <ListDemo /> },
  Mentions: { default: <MentionsDemo /> },
  Modal: { default: <ModalDemo /> },
  Notification: { default: <NotificationDemo /> },
  Pagination: { default: <PaginationDemo /> },
  Popconfirm: { default: <PopconfirmDemo /> },
  Popover: { default: <PopoverDemo /> },
  Radio: { default: <RadioDemo /> },
  Rate: { default: <RateDemo /> },
  Select: {
    default: <SelectDemo />,
    optional: [
      {
        demo: <SelectTag />,
        tokens: [],
      },
    ],
  },
  Skeleton: { default: <SkeletonDemo /> },
  Slider: { default: <SliderDemo /> },
  Spin: { default: <SpinDemo /> },
  Statistic: { default: <StatisticDemo /> },
  Switch: { default: <SwitchDemo /> },
  Table: {
    // default: <TableDemo />,
    default: <FilterTableDemo />,
    // optional: [
    //   {
    //     demo: <FilterTableDemo />,
    //     tokens: [],
    //   },
    // ],
  },
  Tabs: { default: <TabsDemo /> },
  Tag: { default: <TagDemo /> },
  TimePicker: { default: <TimePickerDemo /> },
  Timeline: { default: <TimelineDemo /> },
  Tooltip: { default: <TooltipDemo /> },
  Transfer: { default: <TransferDemo /> },
  TreeSelect: { default: <TreeSelectDemo /> },
  Tree: { default: <TreeDemo /> },
  Typography: { default: <TypographyDemo /> },
  Upload: { default: <UploadDemo /> },
  Divider: { default: <DividerDemo /> },
  Space: { default: <SpaceDemo /> },
  Menu: { default: <MenuDemo /> },
  Steps: { default: <StepsDemo /> },
  Segmented: { default: <SegmentedDemo /> },
  Drawer: { default: <DrawerDemo /> },
  Message: { default: <MessageDemo /> },
  Result: { default: <ResultDemo /> },
  Progress: {
    default: <ProgressDemo />,
  },
};

export default ComponentDemos;
