import React from 'react';
import { Anchor, theme } from '@madccc/antd';

const { Link } = Anchor;
export default () => {
  const { token } = theme.useToken();

  return (
    <div style={{ background: token.colorBorderSecondary, padding: 24 }}>
      <Anchor>
        <Link href="#components-anchor-demo-basic" title="Basic demo" />
        <Link href="#components-anchor-demo-static" title="Static demo" />
        <Link href="#API" title="API">
          <Link href="#Anchor-Props" title="Anchor Props" />
          <Link href="#Link-Props" title="Link Props" />
        </Link>
      </Anchor>
    </div>
  );
};
