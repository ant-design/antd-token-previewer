import { Button } from 'antd';
import React from 'react';
import useToken from '../../hooks/useToken';
import { classifyToken } from '../../utils/classifyToken';

export default () => {
  const [visible, setVisible] = React.useState(false);
  const token = useToken();

  classifyToken(token);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <div className="site-drawer-render-in-current-wrapper">
      Render in this
      <div style={{ marginTop: 16 }}>
        <Button type="primary" onClick={showDrawer}>
          Open
        </Button>
      </div>
    </div>
  );
};
