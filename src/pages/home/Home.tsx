import urls from '../../routes/urls'
import { useNavigate } from 'react-router-dom'
import { Button, Radio, Tabs } from 'antd'
import Agha from '@assets/images/agha.png'
import React, { useState } from 'react';
import type { RadioChangeEvent, TabsProps } from 'antd';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import { Text } from '../../components';

const tabs: TabsProps['items'] = [
  {
    label: <Text fontSize='base' fontWeight='heavy' className='text-dark-green'>پرسشنامه ها</Text>,
    key: '1',
    children: <div className='m-5 p-5 bg-white rounded-lg flex items-center justify-center h-full'>تب اول</div>,
  },
  {
    label: <Text fontSize='base' fontWeight='heavy' className='text-dark-green'>دانشنامه ها</Text>,
    key: '2',
    children: <div className='m-5 p-5 bg-white rounded-lg flex items-center justify-center h-full'>تب دوم</div>,
  },
  {
    label: <Text fontSize='base' fontWeight='heavy' className='text-dark-green'>کتابخانه</Text>,
    key: '3',
    children: <div className='m-5 p-5 bg-white rounded-lg flex items-center justify-center h-full'>تب سوم</div>,
  },
  {
    label: <Text fontSize='base' fontWeight='heavy' className='text-dark-green'>تقویم مقاومت</Text>,
    key: '4',
    children: <div className='m-5 p-5 bg-white rounded-lg flex items-center justify-center h-full'>تب چهارم</div>,
  },
  {
    label: <Text fontSize='base' fontWeight='heavy' className='text-dark-green'>تقویم مدرسه</Text>,
    key: '5',
    children: <div className='m-5 p-5 bg-white rounded-lg flex items-center justify-center h-full'>تب پنجم</div>,
  },
]

const Home = () => {
  const navigate = useNavigate()

  return (
    <div className='h-screen w-screen gap-5 bg-light-green'>
      <div className='flex items-center justify-center p-5'>
        <img className='w-2/3 rounded-md  object-cover' src={Agha} />
      </div>
      <div className='w-full flex justify-center items-center'>
        <div className='w-2/3'>
          <Tabs
            defaultActiveKey="1"
            centered
            type="card"
            size={'large'}
            items={tabs}
          />
        </div>
      </div>
    </div>
  )
}

export default Home