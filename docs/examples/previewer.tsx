import { ConfigProvider } from 'antd';
import { Previewer } from 'antd-token-previewer';
import React from 'react';

const Demo = () => {
  return (
    <React.StrictMode>
      <ConfigProvider theme={{ hashed: true }} prefixCls="hitu">
        <Previewer showTheme onSave={(obj) => console.log(obj)} />
      </ConfigProvider>
    </React.StrictMode>
  );
};

export default Demo;
