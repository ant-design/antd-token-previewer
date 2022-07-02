import React from 'react';
import { Alert, Space } from '@madccc/antd';

const App = () => (
  <Space direction={'vertical'}>
    <Alert message="Success Tips" type="success" showIcon />
    <Alert message="Informational Notes" type="info" showIcon />
    <Alert message="Warning" type="warning" showIcon closable />
    <Alert message="Error" type="error" showIcon />
  </Space>
);

export default App;
