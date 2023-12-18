import React from 'react';
import { Table } from 'antd';
import Text from './Text';

const { Column } = Table;


const CustomTable: React.FC<any> = ({ columns, data }) => (
    <Table dataSource={data} className='w-full' scroll={{ x: 1000 }} direction='rtl'>
    {columns.map( item => (
      <Column 
        title={<Text fontSize='base' fontWeight='heavy' className='text-dark-green'>{item.title}</Text>}
        dataIndex={item.index}
        key={item.key}
        render={item.render}
      />
    ))}
  </Table>
);

export default CustomTable;