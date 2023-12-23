import React from 'react'
import Item from '../../../components/Item'
import useAPI from '../../../hooks/useAPI'
import { Spin } from 'antd'
import { Text } from '../../../components'
import { HomeTabs } from '../Home'

const KnowledgeTab = () => {
  const getKnowledge = useAPI('/knowledge', 'get', {})


  return (
    <Spin spinning={getKnowledge.isLoading || getKnowledge.isRefetching}>
      <div className={`md:p-10 p-3 ${getKnowledge.data && getKnowledge.data.length ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5' : null } bg-white w-full rounded-lg h-full`}>
          {getKnowledge.data && getKnowledge.data.length ? getKnowledge.data?.map(item => (
              <Item 
                tab={HomeTabs.KNOWLEDGE}
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