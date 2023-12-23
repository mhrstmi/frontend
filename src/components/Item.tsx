import React from 'react'
import KnowledgeLogo from "@assets/images/knowledge.jpg"
import LibraryLogo from "@assets/images/library.jpg"
import ResearchLogo from "@assets/images/research.jpg"


import Text from './Text'
import { Button } from 'antd'
import { HomeTabs } from '../pages/home/Home'



const Item = ({ data, tab }) => {
    const itemClassName = `
        flex  w-full rounded-lg rounded-es-[30px] 
        rounded-se-[30px] border border-solid border-mid-green bg-mid-green
        bg-opacity-20 hover:scale-105 transition-transform duration-700 cursor-pointer
    `

    const itemLogo = () => {
        if (tab === HomeTabs.KNOWLEDGE) {
            return KnowledgeLogo
        }
        if (tab === HomeTabs.LIBRARY) {
            return LibraryLogo
        }
        if (tab === HomeTabs.RESEARCH) {
            return ResearchLogo
        }

        return ''
    }

  return (
    <div className="w-full flex justify-between flex-col bg-white rounded-xl transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl">
        <div className='max-h-30 p-3 flex items-center justify-center'>
            <img className="w-full object-fill rounded-xl" src={itemLogo()} alt="" />
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
    // <div className={itemClassName}>
    //     <div className="w-1/6 h-full flex items-center justify-center">
    //         <div className="w-full h-fit p-1 md:p-5 flex items-center justify-center">
    //             <img src={BookLogo} className='w-full h-full object-cover' />
    //         </div>
    //     </div>
    //     <div className="w-9/12 flex flex-col gap-4 p-5">
    //         <Text fontSize="base" fontWeight="bold" className="text-dark-green line-clamp-1">{data?.title && data?.title}</Text>
    //         <Text fontSize="xs" fontWeight="light" className={`text-dark-green ${data?.abstract ? 'line-clamp-1' : 'line-clamp-3'}`}>{data?.body && data?.body} {data?.comment && data?.comment}</Text>
    //         <Text fontSize="xs" fontWeight="light" className="text-gray-400 line-clamp-1">{data?.abstract && 'خلاصه: ' + data?.abstract}</Text>
    //     </div>
    //     <div className="max-w-1/12 flex h-full border-r-1 border-solid border-mid-green items-center justify-center">
    //         <Button className='h-full border-none rounded-se-[30px] bg-transparent'>
    //             <Text fontSize='base' fontWeight='normal' className='text-mid-green'>مشاهده</Text>
    //         </Button>
    //     </div>
    // </div>
  )
}

export default Item