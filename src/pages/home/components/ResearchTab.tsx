import React, { useEffect } from 'react'
import Item from '../../../components/Item'
import useAPI from '../../../hooks/useAPI'
import { Spin } from 'antd'
import { Text } from '../../../components'

const ResearchTab = () => {
  const getResearch = useAPI('/research', 'get', {})
  useEffect(() => {console.log(getResearch)}, [getResearch])

  return (
    <Spin spinning={getResearch.isLoading || getResearch.isRefetching}>
      <div className='md:p-10 p-3 bg-white w-full flex flex-col gap-3 rounded-lg max-h-[500px] overflow-y-auto h-full'>
          {getResearch.data && getResearch.data.length ? getResearch.data?.map(item => (
            <Item 
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
  )
}

export default ResearchTab