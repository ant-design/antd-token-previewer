import { Card } from 'antd';
import React from 'react';

import Alert from '../components/alert/warning';
import Badge from '../components/badge/warning';
import Input from '../components/input/warning';
import Message from '../components/message/warning';
import Modal from '../components/modal/warning';
import Notification from '../components/notification/warning';
import Popconfirm from '../components/popconfirm/popconfirm';
import Result from '../components/result/warning';
import Tag from '../components/tag/warning';
import Text from '../components/typography/warningText';
import Title from '../components/typography/warningTitle';

import { Flexbox } from '@arvinxu/layout-kit';

export const Warning = () => {
  return (
    <Card size={'small'}>
      <Flexbox horizontal align={'start'} gap={24}>
        <Flexbox gap={24}>
          <Flexbox horizontal gap={12}>
            <div style={{ width: 200 }}>{Title.demo}</div>
            <div style={{ width: '100%' }}>{Input.demo}</div>
          </Flexbox>
          {Alert.demo}
        </Flexbox>
        <Flexbox align={'center'} gap={28}>
          {Message.demo}
          {Popconfirm.demo}
          <Flexbox horizontal gap={16}>
            {Badge.demo}
            {Tag.demo}
            {Text.demo}
          </Flexbox>
        </Flexbox>
      </Flexbox>
      <Flexbox horizontal gap={24} style={{ marginTop: 32 }}>
        <div>{Notification.demo}</div>
        <div>{Modal.demo}</div>
      </Flexbox>
      {Result.demo}
    </Card>
  );
};
