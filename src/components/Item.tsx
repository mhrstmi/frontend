import React from 'react'



import Text from './Text'
import { Button } from 'antd'



const Item = ({ data, type }) => {

  return (
    <div className="p-3 w-full flex gap-5 flex-col bg-white border border-solid border-gray-300 rounded-xl transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl">
        <div className='px-3 py-1 rounded-lg shadow-sm bg-mid-green w-fit h-fit'>
            <Text fontSize='sm' fontWeight='bold' className='text-white'>{type}</Text>
        </div>
        <div className="flex flex-col gap-3 min-h-[150px]">
            <Text fontWeight='bold' fontSize='xl' className='text-dark-green line-clamp-1'>{data?.title && data?.title}</Text>
            <Text className="text-dark-green line-clamp-4" fontSize='sm' fontWeight='medium'>{data?.body && data?.body} {data?.comment && data?.comment}</Text>
        </div>
        <div className="flex h-full w-full items-end justify-end">
              <Button className="text-white bg-blue-400 px-3 py-1 rounded-md hover:bg-blue-400"> 
                <Text fontWeight='bold' fontSize='base' className='text-white'>ادامه مطلب</Text>
              </Button>
        </div>
    </div>
  )
}

export default Item