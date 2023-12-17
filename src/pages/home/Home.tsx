import urls from '../../routes/urls'
import { useNavigate } from 'react-router-dom'
import { Button, Radio, Tabs } from 'antd'
import Agha from '@assets/images/agha.png'
import React, { useState } from 'react';
import type { RadioChangeEvent, TabsProps } from 'antd';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import { Text } from '../../components';
import useMediaQuery from '../../hooks/useMediaQuery';

const tabs: TabsProps['items'] = [
  {
    label: <Text fontSize='base' fontWeight='heavy' className='text-dark-green'>پرسشنامه ها</Text>,
    key: '1',
    children: <div className='p-20 bg-white w-full rounded-lg flex items-center justify-center h-full'>تب اول</div>,
  },
  {
    label: <Text fontSize='base' fontWeight='heavy' className='text-dark-green'>دانشنامه ها</Text>,
    key: '2',
    children: <div className='p-20 bg-white w-full rounded-lg flex items-center justify-center h-full'>تب دوم</div>,
  },
  {
    label: <Text fontSize='base' fontWeight='heavy' className='text-dark-green'>کتابخانه</Text>,
    key: '3',
    children: <div className='p-20 bg-white w-full rounded-lg flex items-center justify-center h-full'>تب سوم</div>,
  },
  {
    label: <Text fontSize='base' fontWeight='heavy' className='text-dark-green'>تقویم مقاومت</Text>,
    key: '4',
    children: <div className='p-20 bg-white w-full rounded-lg flex items-center justify-center h-full'>تب چهارم</div>,
  },
  {
    label: <Text fontSize='base' fontWeight='heavy' className='text-dark-green'>تقویم مدرسه</Text>,
    key: '5',
    children: <div className='p-20 bg-white w-full rounded-lg flex items-center justify-center h-full'>تب پنجم</div>,
  },
]

const Home = () => {
  const navigate = useNavigate()
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <div className='w-full gap-5 flex items-center justify-center p-5'>
      <div className='w-full md:w-2/3 md:min-w-[768px]'>
        <div className='w-full flex items-center justify-center px-5 pb-5 md:px-5 md:pb-5'>
          <img className='w-full rounded-md  object-cover' src={Agha} />
        </div>
        <div className='w-full flex justify-center items-center p-5 md:p-0'>
          <div className='w-full'>
            <Tabs
              direction='rtl'
              tabPosition={'top'}
              defaultActiveKey="1"
              centered={!isMobile}
              type="card"
              size={isMobile ? 'small' : 'large'}
              items={tabs}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home