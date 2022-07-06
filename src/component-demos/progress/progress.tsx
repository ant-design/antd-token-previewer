import { Progress } from 'antd';
import React from 'react';

const App: React.FC = () => (
  <>
    <Progress percent={30} />
    <Progress percent={50} status="active" />
    <Progress percent={70} status="exception" />
    <Progress percent={100} />
    <Progress percent={50} showInfo={false} />
    <Progress steps={8} />
  </>
);

export default App;
