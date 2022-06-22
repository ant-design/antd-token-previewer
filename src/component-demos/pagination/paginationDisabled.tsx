import React from 'react';
import { Pagination } from '@madccc/antd';

const App: React.FC = () => (
  <Pagination showQuickJumper defaultCurrent={2} total={10} disabled />
);

export default App;
