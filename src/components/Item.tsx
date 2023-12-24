import React from 'react'
import KnowledgeLogo from "@assets/images/knowledge.jpg"
import LibraryLogo from "@assets/images/library.jpg"
import ResearchLogo from "@assets/images/research.jpg"


import Text from './Text'
import { Button } from 'antd'



const Item = ({ data, tab }) => {
    const itemClassName = `
        flex  w-full rounded-lg rounded-es-[30px] 
        rounded-se-[30px] border border-solid border-mid-green bg-mid-green
        bg-opacity-20 hover:scale-105 transition-transform duration-700 cursor-pointer
    `

  return (
    <div className="w-full flex justify-between flex-col bg-white rounded-xl transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl">
        <div className='max-h-30 p-3 flex items-center justify-center'>
            <img className="w-full object-fill rounded-xl" src={''} alt="" />
        </div>
        <div className="p-2 flex flex-col gap-3">
            <Text fontWeight='bold' fontSize='xl' className='text-dark-green line-clamp-1'>{data?.title && data?.title}</Text>
            <Text className="text-dark-green line-clamp-4" fontSize='sm' fontWeight='medium'>{data?.body && data?.body} {data?.comment && data?.comment}</Text>
        </div>
        <div className="m-2 flex items-center justify-end">
              <Button className="text-white bg-blue-400 px-3 py-1 rounded-md hover:bg-blue-400"> 
                <Text fontWeight='bold' fontSize='base' className='text-white'>ادامه مطلب</Text>
              </Button>
        </div>
    </div>
  )
}

export default Item