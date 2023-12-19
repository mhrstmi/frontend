import React from 'react'
import Item from '../../../components/Item'
import useAPI from '../../../hooks/useAPI'
import { Spin } from 'antd'
import { Text } from '../../../components'

const KnowledgeTab = () => {
  const getKnowledge = useAPI('/knowledge', 'get', {})


  return (
    <Spin spinning={getKnowledge.isLoading || getKnowledge.isRefetching}>
      <div className='md:p-10 p-3 bg-white w-full flex flex-col gap-3 rounded-lg max-h-[500px] overflow-y-auto h-full'>
          {getKnowledge.data && getKnowledge.data.length ? getKnowledge.data?.map(item => (
            <Item 
              data={{
                body: item.body,
                title: item.title,
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

export default KnowledgeTab