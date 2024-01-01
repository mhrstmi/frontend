import React from 'react'
import Text from './Text'

const GroupCard = ({ onClick, name, src }) => {
  return (
    <div onClick={onClick} className='cursor-pointer relative rounded-lg border-none h-[200px] bg-mid-green bg-opacity-10 w-full transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl'>
        <img src={import.meta.env['REACT_APP_SERVER_URL'] + src} className='h-full w-full rounded-lg border-none object-cover' />
        <div className='p-3 bg-black bg-opacity-80 w-full absolute top-20 z-50 flex items-center justify-center'>
            <Text fontSize='lg' fontWeight='bold' className='text-white line-clamp-1'>{name}</Text>
        </div>
        <div className='h-full w-full absolute bg-white rounded-lg bg-opacity-30 top-0'></div>
    </div>
  )
}

export default GroupCard