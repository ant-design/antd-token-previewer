import React from 'react';
import useTokenLayer from './hooks/useTokenLayer';
import TokenPanelPro from './token-panel-pro';

const ThemeEditor = () => {
  const tokens = useTokenLayer();
  console.log(tokens);

  return (
    <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.04)', height: '100vh' }}>
      <div style={{ width: 860, backgroundColor: '#fff', height: '100%' }}>
        <TokenPanelPro />
      </div>
    </div>
  );
};

export default ThemeEditor;
