import React from 'react';
import { Anchor } from '@madccc/antd';

const { Link } = Anchor;
export default () => {
  return (
    <div style={{ padding: 12 }}>
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
