import React from 'react';
import 'antd/es/style/reset.css';
import ColorPanel from '../../src/ColorPanel';

const Demo = () => {
  const [color, setColor] = React.useState<string>('#1632ff');

  return (
    <React.StrictMode>
      <ColorPanel color={color} onChange={(v) => setColor(v)} />
    </React.StrictMode>
  );
};

export default Demo;
