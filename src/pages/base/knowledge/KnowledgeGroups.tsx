import React from 'react'
import useAPI from '../../../hooks/useAPI'
import { Spin } from 'antd'
import { GroupCard, Text, Title } from '../../../components'

import { Breadcrumb } from 'antd';
import { HomeOutlined, UserOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import urls from '../../../routes/urls'

const KnowledgeGroups = () => {
  const navigate = useNavigate()
  const getKnowledgeGroups = useAPI('/group/knowledge', 'get', {})


  return (      
      <div className='p-3 md:p-5 xl:p-10'>
        <Title title={'گروه بندی دانشنامه ها'}  desc="دسته بندی و گروه بندی دانشنامه های جمع آوری شده" />
        <Breadcrumb
          className='my-10'
          items={[
            {
              href: urls.home,
              title: <Text fontSize='lg' fontWeight='bold'><HomeOutlined className='text-lg font-bold' /> صفحه اصلی</Text>,
            },
            {
              title: <Text fontSize='lg' fontWeight='bold'>گروه بندی دانشنامه ها</Text>,
            },
          ]}
        />
        <Spin spinning={getKnowledgeGroups.isLoading || getKnowledgeGroups.isRefetching}>
          <div className={`md:p-10 p-3 ${getKnowledgeGroups.data && getKnowledgeGroups.data.length ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5' : null } bg-white w-full rounded-lg h-full`}>
              {getKnowledgeGroups.data && getKnowledgeGroups.data.length ? getKnowledgeGroups.data?.map(item => (
                  <GroupCard onClick={() => navigate(`/knowledge/groups/${item.id}`)} name={item.name} src={item.path} />
              )): 
              <div className='flex items-center justify-center h-full w-full'>
                <Text fontSize='base' fontWeight='heavy' className='text-mid-green'>مطلبی برای نمایش وجود ندارد</Text> 
              </div>
              }
          </div>
        </Spin>
      </div>
  )
}

export default KnowledgeGroups