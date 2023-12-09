import React from 'react';
import Text from './Text';
import { Button } from 'antd';
import { useStateContext } from '../providers/ContextProvider';
import { MdOutlineAddCircle } from "react-icons/md";


export enum Sections {
  VIEW = "مشاهده",
  EDIT = "ویراش",
  ADD = "افزودن",
}


const Header: React.FC<any> = ({ section, title, navigateToAdd }) => {
  const { currentColor }: any = useStateContext();
  
  return (
    <div className="mb-10">
      <div className='flex flex-col gap-1'>
        <Text className="text-gray-400" fontSize='lg' fontWeight='medium'>{section}</Text>
        <div className='flex justify-between items-center'>
          <Text fontSize='3xl' fontWeight='black' className="tracking-tight text-slate-900">
            {title}
          </Text>
          <Button onClick={navigateToAdd} className='flex items-center gap-3 py-5' style={{ backgroundColor: currentColor}}>
            <MdOutlineAddCircle className='text-white text-lg' />
            <Text fontSize='lg' fontWeight='medium' className='text-white flex'>
              {'افزودن '}
            </Text>
          </Button>
        </div>
      </div>
    </div>
)};

export default Header;
