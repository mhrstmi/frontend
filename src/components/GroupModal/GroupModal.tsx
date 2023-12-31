import { Modal } from 'antd'
import React, { useState } from 'react'
import Text from '../Text';
import Groups from './components/Groups';
import AddGroup from './components/AddGroup';
import EditGroup from './components/EditGroup';
import useAPI from '../../hooks/useAPI';

type propsTypes = {
    section: "research" | "knowledge";
    title: string;
    onClose: () => void;
    isModalOpen: boolean;
}

export type groupType = {
    id: number;
    name: string;
    fileName: string;
    path: string;
    mimeType: string;
}

const GroupModal: React.FC<propsTypes> = ({ section, title, isModalOpen, onClose }) => {
    const [state, setState] = useState<"ADD" | "EDIT" | "VIEW">("VIEW")
    const [group, setGroup] = useState<groupType | undefined>()

    const getGroups = useAPI(section === 'research' ? '/group/research' : '/group/knowledge', 'get', {
        reactQueryOptions: { enabled: isModalOpen}
    })
    
  return (
    <Modal title={<Text fontSize='lg' fontWeight='bold' className='text-dark-green'>{title}</Text>} open={isModalOpen} onCancel={onClose} footer={null}>
        {state === 'VIEW' && <Groups section={section} onClose={onClose} isModalOpen={isModalOpen} setState={setState} setGroup={setGroup} groups={getGroups.data} isLoading={getGroups.isLoading || getGroups.isRefetching} refetch={getGroups.refetch} />}
        {state === 'ADD' && <AddGroup section={section} onClose={onClose} isModalOpen={isModalOpen} setState={setState} refetch={getGroups.refetch} />}
        {state === 'EDIT' && <EditGroup section={section} onClose={onClose} isModalOpen={isModalOpen} setState={setState} group={group} setGroup={setGroup} refetch={getGroups.refetch} />}
    </Modal>
  )
}

export default GroupModal