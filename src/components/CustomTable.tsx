import React from 'react';
import { Table } from 'antd';
import Text from './Text';

const { Column } = Table;


const CustomTable: React.FC<any> = ({ columns, data }) => (
  <section className='w-full'>
    <Table dataSource={data} pagination={false} scroll={{ x: 1000 }}>
      {columns.map( item => (
        <Column 
          title={<Text fontSize='base' fontWeight='heavy' className='text-dark-green'>{item.title}</Text>}
          dataIndex={item.index}
          key={item.key}
          render={item.render}
        />
      ))}
    </Table>
  </section>
);

export default CustomTable;