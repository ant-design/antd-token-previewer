import { Flexbox } from '@arvinxu/layout-kit';
import { Card } from 'antd';
import React from 'react';

import Alert from '../components/alert/error';
import Badge from '../components/badge/badge';
import Button from '../components/button/dangerButton';
import Dropdown from '../components/dropdown/dropdownError';
import Menu from '../components/menu/menuDanger';
import Message from '../components/message/error';
import Notification from '../components/notification/error';
import Progress from '../components/progress/danger';
import Tag from '../components/tag/error';
import Timeline from '../components/timeline/danger';
import Upload from '../components/upload/danger';

export const Error = () => {
  return (
    <Card size={'small'}>
      <Flexbox horizontal align={'start'} gap={24}>
        <Flexbox gap={24}>
          <Flexbox
            horizontal
            align={'center'}
            gap={12}
            style={{ marginTop: 8 }}
          >
            {Button.demo}
            <div>{Tag.demo}</div>
            {Badge.demo}
          </Flexbox>
          {Alert.demo}
        </Flexbox>
        <Flexbox align={'center'} gap={28}>
          {Message.demo}
          {Progress.demo}
        </Flexbox>
      </Flexbox>
      <Flexbox horizontal gap={40} style={{ marginTop: 32 }}>
        <div>{Notification.demo}</div>
        <div>{Timeline.demo}</div>
      </Flexbox>
      <Flexbox horizontal gap={40}>
        {Menu.demo}
        <div style={{ width: 300 }}>{Upload.demo}</div>
        {Dropdown.demo}
      </Flexbox>
    </Card>
  );
};
