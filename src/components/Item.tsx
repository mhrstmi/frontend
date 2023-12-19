import React from 'react'
import BookLogo from "@assets/images/book-logo.png"

import Text from './Text'
import { Button } from 'antd'


const Item = ({ data }) => {
    const itemClassName = `
        flex h-[150px] w-full rounded-lg rounded-es-[30px] min-w-[500px]
        rounded-se-[30px] border border-solid border-mid-green bg-mid-green
        bg-opacity-20 hover:scale-105 transition-transform duration-700 cursor-pointer
    `

  return (
    <div className={itemClassName}>
        <div className="w-1/6 h-full flex items-center justify-center">
            <div className="w-full h-fit p-1 md:p-5 flex items-center justify-center">
                <img src={BookLogo} className='w-full h-full object-cover' />
            </div>
        </div>
        <div className="w-9/12 flex flex-col gap-4 p-5">
            <Text fontSize="base" fontWeight="bold" className="text-dark-green line-clamp-1">{data?.title && data?.title}</Text>
            <Text fontSize="xs" fontWeight="light" className={`text-dark-green ${data?.abstract ? 'line-clamp-1' : 'line-clamp-3'}`}>{data?.body && data?.body} {data?.comment && data?.comment}</Text>
            <Text fontSize="xs" fontWeight="light" className="text-gray-400 line-clamp-1">خلاصه: {data?.abstract && data?.abstract}</Text>
        </div>
        <div className="max-w-1/12 flex h-full border-r-1 border-solid border-mid-green items-center justify-center">
            <Button className='h-full border-none rounded-se-[30px] bg-transparent'>
                <Text fontSize='base' fontWeight='normal' className='text-mid-green'>مشاهده</Text>
            </Button>
        </div>
    </div>
  )
}

export default Item