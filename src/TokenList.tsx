import type { FC } from 'react';
import React, { useContext, useState } from 'react';
import { TokenContext } from './TokenProvider';
import { Input, InputNumber } from '@madccc/antd';

const TokenList: FC = () => {
  const [value, setValue] = useState('');
  const [value2, setValue2] = useState<number>(2);

  const { setToken, toggleSelectedToken } = useContext(TokenContext);

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <a
          style={{ marginRight: 4 }}
          onClick={() => toggleSelectedToken('colorPrimary')}
        >
          colorPrimary
        </a>
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onPressEnter={() => {
            setToken('colorPrimary', value);
          }}
        />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', marginTop: 8 }}>
        <a
          style={{ marginRight: 4 }}
          onClick={() => toggleSelectedToken('radiusBase')}
        >
          radiusBase
        </a>
        <InputNumber
          value={value2}
          onChange={(val) => setValue2(val)}
          onPressEnter={() => {
            setToken('radiusBase', value2);
          }}
        />
      </div>
    </div>
  );
};

export default TokenList;
