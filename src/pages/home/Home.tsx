import urls from '../../routes/urls'
import { useNavigate } from 'react-router-dom'
import { Tabs } from 'antd'
import Agha from '@assets/images/agha.png'
import React, { useState } from 'react';
import type { TabsProps } from 'antd';
import { Text } from '../../components';
import useMediaQuery from '../../hooks/useMediaQuery';
import ResearchTab from './components/ResearchTab';
import KnowledgeTab from './components/KnowledgeTab';
import LibraryTab from './components/LibraryTab';

export enum HomeTabs {
  RESEARCH = "Research",
  LIBRARY = "Library",
  KNOWLEDGE = "Knowledge",
}

const Home = () => {
  const navigate = useNavigate()
  const isMobile = useMediaQuery('(max-width: 768px)');


  const tabs: TabsProps['items'] = [
    {
      label: <Text fontSize='base' fontWeight='heavy' className='text-dark-green'>پژوهشنامه ها</Text>,
      key: '1',
      children: <ResearchTab />,
    },
    {
      label: <Text fontSize='base' fontWeight='heavy' className='text-dark-green'>دانشنامه ها</Text>,
      key: '2',
      children: <KnowledgeTab />,
    },
    {
      label: <Text fontSize='base' fontWeight='heavy' className='text-dark-green'>کتابخانه</Text>,
      key: '3',
      children: <LibraryTab />,
    },
    {
      label: <Text fontSize='base' fontWeight='heavy' className='text-dark-green'>تقویم مقاومت</Text>,
      key: '4',
      children: <></>,
    },
    {
      label: <Text fontSize='base' fontWeight='heavy' className='text-dark-green'>مدرسه مقاومت</Text>,
      key: '5',
      children: <></>,
    },
  ]

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