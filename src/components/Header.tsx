import React from 'react';
import Text from './Text';
import { Button } from 'antd';
import { MdOutlineAddCircle } from "react-icons/md";


export enum Sections {
  VIEW = "مشاهده",
  EDIT = "ویراش",
  ADD = "افزودن",
}


const Header: React.FC<any> = ({ section, title, onClick }) => {
  
  return (
    <div className="mb-10">
      <div className='flex flex-col gap-1'>
        <Text className="text-gray-400" fontSize='lg' fontWeight='medium'>{section}</Text>
        <div className='flex md:justify-between md:items-center md:flex-row flex-col gap-3'>
          <Text fontSize='2xl' fontWeight='black' className="tracking-tight text-slate-900">
            {title}
          </Text>
          <Button onClick={onClick} className='flex items-center gap-3 md:w-fit w-full py-5 bg-mid-green'>
            <MdOutlineAddCircle className='text-white text-lg' />
            <Text fontSize='lg' fontWeight='medium' className='text-white flex'>
              {section === Sections.ADD && 'آپلود کردن'}
              {section === Sections.VIEW && 'افزودن'}
              {section === Sections.EDIT && 'اعمال ویرایش'}
            </Text>
          </Button>
        </div>
      </div>
    </div>
)};

export default Header;
