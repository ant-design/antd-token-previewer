import 'antd/es/style/reset.css';
import React, { useState } from 'react';
import styled from 'styled-components';
import { genStyle } from './cssinjs';

const Title = styled.h1(genStyle(1000));

const Page = () => {
  const [times, setTimes] = useState(0);

  return (
    <>
      <Title>Render Times: {times}</Title>
      <button onClick={() => setTimes(times + 1)}>Rerender</button>
    </>
  );
};

const Demo = () => {
  return <Page />;
};

export default Demo;
