import React from 'react';
import { Table } from 'antd';

const { Column } = Table;


const CustomTable: React.FC<any> = ({ columns, data }) => (
  <Table dataSource={data}>
    {columns.map( item => (
      <Column 
        title={item.title}
        dataIndex={item.index}
        key={item.key}
        render={item.render}
      />
    ))}
  </Table>
);

export default CustomTable;