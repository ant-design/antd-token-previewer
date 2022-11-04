import 'antd/es/style/reset.css';
import React, { useState } from 'react';
import makeStyle from '../../src/utils/makeStyle';

export const genStyle = (times = 1000) => {
  return Array(times)
    .fill(1)
    .reduce((style) => {
      return {
        ...style,
        [`.${Math.random().toString(36).slice(2)}`]: {
          color: '#fff',
          position: 'absolute',
          zIndex: 0,
          display: 'block',
          visibility: 'visible',
          fontSize: 0,
          lineHeight: 0,
          width: 520,
        },
      };
    }, {});
};

const useStyle = makeStyle('page', () => {
  return genStyle(1000);
});

const Page = () => {
  useStyle();
  const [times, setTimes] = useState(0);

  return (
    <>
      <h1>Render Times: {times}</h1>
      <button onClick={() => setTimes(times + 1)}>Rerender</button>
    </>
  );
};

const Demo = () => {
  return <Page />;
};

export default Demo;
