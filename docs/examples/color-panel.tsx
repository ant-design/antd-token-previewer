import { ColorPanel } from 'antd-token-previewer';
import 'antd/es/style/reset.css';
import React from 'react';

const Demo = () => {
  const [color, setColor] = React.useState<string>('#1632ff');

  return (
    <React.StrictMode>
      <ColorPanel alpha color={color} onChange={(v) => setColor(v)} />
    </React.StrictMode>
  );
};

export default Demo;
