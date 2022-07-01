import React from 'react';
import { Modal } from '@madccc/antd';

const App = () => {
  return (
    <Modal._InternalPanelDoNotUseOrYouWillBeFired title="Basic Modal">
      <p>Some contents...</p> <p>Some contents...</p> <p>Some contents...</p>
    </Modal._InternalPanelDoNotUseOrYouWillBeFired>
  );
};
export default () => <App />;
