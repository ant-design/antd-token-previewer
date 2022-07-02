import { Button, message } from '@madccc/antd';
import React from 'react';

const Context = React.createContext({ name: 'Default' });

const App: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const info = () => {
    messageApi.open({
      type: 'info',
      content: (
        <Context.Consumer>{({ name }) => `Hello, ${name}!`}</Context.Consumer>
      ),
      duration: 1,
    });
  };

  return (
    <Context.Provider value={{ name: 'Ant Design' }}>
      {contextHolder}
      <Button onClick={info}>Display normal message</Button>
    </Context.Provider>
  );
};

export default App;
