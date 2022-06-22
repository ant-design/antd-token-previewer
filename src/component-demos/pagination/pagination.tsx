import React from 'react';
import { Pagination, Space } from '@madccc/antd';

const App: React.FC = () => (
  <Space direction={'vertical'}>
    <Pagination showQuickJumper defaultCurrent={2} total={500} />

    <Pagination simple />
  </Space>
);

export default App;
