import React, { useState } from 'react'
import useAPI from '../../../hooks/useAPI';
import { Button, Spin, message } from 'antd';
import Text from '../../Text';
import { groupType } from '../GroupModal';
import { FaEdit } from "react-icons/fa";

type propsTypes = {
    section: 'research' | 'knowledge';
    onClose : () => void;
    isModalOpen: boolean;
    setState: React.Dispatch<React.SetStateAction<"ADD" | "EDIT" | "VIEW">>;
    setGroup: React.Dispatch<React.SetStateAction<groupType | undefined>>;
    groups: groupType[] | undefined;
    isLoading: boolean;
    refetch: () => void;
}

const Groups: React.FC<propsTypes> = ({section, onClose, isModalOpen, setState, setGroup, refetch, groups, isLoading }) => {
    const [id, setId] = useState(0)

  return (
    <div className='w-full flex flex-col gap-5'>
        <div className='w-full flex items-center justify-start py-5'>
            <Button type="primary" className='bg-blue-500' onClick={() => setState('ADD')}>
                <Text fontSize='base' fontWeight='bold' className='text-white'>افزودن</Text>
            </Button>
        </div>
        <Spin spinning={isLoading}>
            <div className='max-h-[500px] overflow-auto flex flex-col gap-3'>
                {groups?.map(item => (
                    <div onClick={() => {setGroup(item); setState('EDIT')}} className='bg-gray-500 w-full p-3 rounded-lg bg-opacity-20 cursor-pointer grid grid-cols-3 gap-3'>
                        <div className='flex items-center gap-2'>
                            <Text fontSize='base' fontWeight="heavy">شناسه: </Text>
                            <Text fontSize='base' fontWeight="normal">{item.id}</Text>
                        </div>
                        <div className='flex items-center gap-2'>
                            <Text fontSize='base' fontWeight="heavy">اسم: </Text>
                            <Text fontSize='base' fontWeight="normal">{item.name}</Text>
                        </div>
                        <div className='flex gap-3 justify-end items-center w-full bg-transparent'>
                            <Button onClick={() => {setGroup(item); setState('EDIT')}} className='p-3 w-fit h-fit flex items-center justify-center bg-green-600'>
                                <FaEdit className='text-white' />
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </Spin>
    </div>
  )
}

export default Groups