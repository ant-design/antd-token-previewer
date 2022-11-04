import { css } from '@emotion/react';
import 'antd/es/style/reset.css';
import React, { useState } from 'react';
import { genStyle } from './cssinjs';

const useStyle = () => {
  return css(genStyle(1000));
};

const Page = () => {
  const style = useStyle();
  const [times, setTimes] = useState(0);

  return (
    <>
      <h1 css={style}>Render Times: {times}</h1>
      <button onClick={() => setTimes(times + 1)}>Rerender</button>
    </>
  );
};

const Demo = () => {
  return <Page />;
};

export default Demo;
