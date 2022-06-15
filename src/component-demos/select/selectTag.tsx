import { Select } from '@madccc/antd';
import type { ReactNode } from 'react';
import React from 'react';
const { Option } = Select;

const children: ReactNode[] = [];

for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

const handleChange = (value: any) => {
  console.log(`selected ${value}`);
};

const App = () => (
  <>
    <Select
      mode="multiple"
      allowClear
      style={{
        width: '100%',
      }}
      placeholder="Please select"
      defaultValue={['a10', 'c12']}
      onChange={handleChange}
    >
      {children}
    </Select>
    <br />
    <Select
      mode="multiple"
      disabled
      style={{
        width: '100%',
      }}
      placeholder="Please select"
      defaultValue={['a10', 'c12']}
      onChange={handleChange}
    >
      {children}
    </Select>
  </>
);

export default App;
