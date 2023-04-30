import { Card } from 'antd';
import React from 'react';

import Alert from '../components/alert/success';
import Input from '../components/input/success';
import Message from '../components/message/success';
import Notification from '../components/notification/success';
import Progress from '../components/progress/success';
import Result from '../components/result/success';
import Tag from '../components/tag/success';
import Timeline from '../components/timeline/success';

import { Flexbox } from '@arvinxu/layout-kit';

export const Success = ({ id }: { id?: string }) => {
  return (
    <Card size={'small'} id={id}>
      <Flexbox horizontal align={'start'} gap={24}>
        <Flexbox gap={40}>
          <Flexbox horizontal align={'center'} gap={12}>
            <div>{Tag.demo}</div>
            {Input.demo}
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
      {Result.demo}
    </Card>
  );
};
