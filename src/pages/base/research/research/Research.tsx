import React, { useEffect } from 'react'
import Item from '../../../../components/Item'
import useAPI from '../../../../hooks/useAPI'
import { Breadcrumb, Spin } from 'antd'
import { Text, Title } from '../../../../components'
import { GroupOutlined, HomeOutlined } from '@ant-design/icons'
import urls from '../../../../routes/urls'
import { useParams } from 'react-router-dom'

const Research = () => {
  const params = useParams()
  const getResearch = useAPI('/research/{group}/list', 'get', {
    param: {
      group: Number(params.groupId)
    }
  })

  return (
    <div className='p-3 md:p-5 xl:p-10'>
      <Title title={'پژوهشنامه ها'}  desc="پژوهشنامه های جمع آوری شده" />
        <Breadcrumb
          className='my-10'
          items={[
            {
              href: urls.home,
              title: <Text fontSize='lg' fontWeight='bold'><HomeOutlined className='text-lg font-bold'/> صفحه اصلی</Text>,
            },
            {
              href: urls.knowledgeGroups,
              title: <Text fontSize='lg' fontWeight='bold'><GroupOutlined className='text-lg font-bold ml-1' />گروه بندی پژوهشنامه ها</Text>,
            },
            {
              title: <Text fontSize='lg' fontWeight='bold'>پژوهشنامه ها</Text>,
            },
          ]}
        />
      <Spin spinning={getResearch.isLoading || getResearch.isRefetching}>
        <div className={`md:p-10 p-3 ${getResearch.data && getResearch.data.length ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5' : null } bg-white w-full rounded-lg h-full`}>
            {getResearch.data && getResearch.data.length ? getResearch.data?.map(item => (
                <Item 
                  type={'پژوهشنامه'}
                  data={{
                    abstract: item.abstract,
                    title: item.title,
                    body: item.body,
                    id: item.id,
                  }} 
                />
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

export default Research