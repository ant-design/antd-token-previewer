import React, { FC, useContext } from 'react';
import { TokenContext } from '@/TokenProvider';
import ButtonDemo from '@/demos/button';

const ComponentPanel: FC = () => {
  const { selectedTokens } = useContext(TokenContext);

  return (
    <>
      <div>Selected Tokens: {selectedTokens.join(', ')}</div>
      <ButtonDemo />
    </>
  );
};

export default ComponentPanel;
