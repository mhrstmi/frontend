import React from 'react'
import useAPI from '../../../hooks/useAPI'
import { Breadcrumb, Spin } from 'antd'
import { GroupCard, Text, Title } from '../../../components'
import { HomeOutlined } from '@ant-design/icons'
import urls from '../../../routes/urls'
import { useNavigate } from 'react-router-dom'

const ResearchGroups = () => {
  const navigate = useNavigate()
  const getResearchGroups = useAPI('/group/research', 'get', {})

  return (
    <div className='p-3 md:p-5 xl:p-10'>
      <Title title={'گروه بندی پژوهشنامه ها'}  desc="دسته بندی و گروه بندی پژوهشنامه های جمع آوری شده" />
        <Breadcrumb
          className='my-10'
          items={[
            {
              href: urls.home,
              title: <Text fontSize='lg' fontWeight='bold'><HomeOutlined className='text-lg font-bold'/> صفحه اصلی</Text>,
            },
            {
              title: <Text fontSize='lg' fontWeight='bold'> گروه بندی پژوهشنامه ها</Text>,
            },
          ]}
        />
      <Spin spinning={getResearchGroups.isLoading || getResearchGroups.isRefetching}>
        <div className={`md:p-10 p-3 ${getResearchGroups.data && getResearchGroups.data.length ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5' : null } bg-white w-full rounded-lg h-full`}>
            {getResearchGroups.data && getResearchGroups.data.length ? getResearchGroups.data?.map(item => (
                <GroupCard onClick={() => navigate(`/research/groups/${item.id}`)} name={item.name} src={item.path} />
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

export default ResearchGroups