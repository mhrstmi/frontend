import React from 'react'
import Text from './Text'
import { Divider } from 'antd'

const Title = ({title, desc}) => {
  return (
    <div className='rounded-lg bg-white bg-opacity-30 shadow-md w-full h-[200px] flex flex-col items-center justify-center gap-5'>
        <Text fontSize='2xl' fontWeight='bold' className='text-dark-green'>{title}</Text>
        <Text fontSize='lg' fontWeight='heavy' className='text-dark-green'>{desc}</Text>
    </div>
  )
}

export default Title