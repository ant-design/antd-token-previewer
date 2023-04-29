import { Card, Space } from 'antd';
import React from 'react';

import Button from '../components/button/button-icon';
import Checkbox from '../components/checkbox/checkbox';
import Menu from '../components/menu/menu';
import Pagination from '../components/pagination/outline';
import Popconfirm from '../components/popconfirm/popconfirm';
import RadioButton from '../components/radio/button';
import Radio from '../components/radio/radio';
import SelectTag from '../components/select/selectTag';
import Steps from '../components/steps/steps';
import Switch from '../components/switch/switch';
import Table from '../components/table/table';
import Tabs from '../components/tabs/tabs';
import Timeline from '../components/timeline/timeline';

export const Primary = () => {
  return (
    <Card size={'small'}>
      <Space direction={'vertical'}>
        <Space align={'start'} size={'large'}>
          {Menu.demo}
          <Space direction={'vertical'} size={'large'}>
            <Space size={'large'} align={'start'}>
              <Space direction={'vertical'} size={'large'}>
                <div>{Button.demo}</div>
                <div>
                  <span>{Radio.demo}</span>
                  {Checkbox.demo}
                  {Switch.demo}
                </div>
                <div>{RadioButton.demo}</div>
                {Tabs.demo}
              </Space>
              {SelectTag.demo}
            </Space>
            {Pagination.demo}
            <div style={{ padding: 12 }}>{Steps.demo}</div>
            <Space size={'large'} align={'start'}>
              {Popconfirm.demo}
              {Timeline.demo}
            </Space>
          </Space>
        </Space>
        {Table.demo}
      </Space>
    </Card>
  );
};
