import Header from '@components/Header';
import { Sections } from '@components/Header';
import CustomTable from '@components/CustomTable';
import useAPI from '@hooks/useAPI';
import { Button, Spin, message } from 'antd';
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { GroupModal, Text } from '../../../components';
import urls from '../../../routes/urls';
import { useNavigate } from 'react-router-dom';
import { render } from 'react-dom';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { Modal } from 'antd';
import { useState } from 'react';

const { confirm, } = Modal;


const AdminKnowledge = () => {
  const [itemId, setItemId] = useState(0);
  const [groupModal, setGroupModal] = useState(false);
  const navigate = useNavigate()
  const getKnowledge = useAPI('/knowledge', 'get', {})
  const deleteKnowledge = useAPI('/admin/knowledge/{id}', 'delete', {
    param: {
      id: itemId
    }
  })


  const showDeleteConfirm = (id) => {
    setItemId(id)
    confirm({
      title: 'میخواهید این مورد را حذف کنید؟',
      icon: <ExclamationCircleFilled />,
      okText: 'بله',
      okType: 'danger',
      cancelText: 'خیر',
      okButtonProps: {
        loading: deleteKnowledge.isLoading
      },

      onCancel() {
        setItemId(0)
      },
      async onOk() {
        try {
          await deleteKnowledge.mutateAsync({})
          getKnowledge.refetch()
          message.success('مورد با موفقیت حذف شد')
        }catch(err){
          //@ts-ignore
          message.error(err)
        }
        setItemId(0)
      },
    });
  };

  const columns = [
    {
      index: 'id',
      key: 'id',
      title:'شناسه',
      render: (id) => <Text fontSize='base' fontWeight='medium' className='line-clamp-1 max-w-[200px] text-dark-green'>{id}</Text>
    },
    {
      index: 'title',
      key: 'title',
      title: 'عنوان',
      render: (title) => <Text fontSize='base' fontWeight='medium' className='line-clamp-1 max-w-[200px] text-dark-green'>{title}</Text>
    },
    {
      index: 'body',
      key: 'body',
      title: 'محتوا',
      render: (body) => <Text fontSize='base' fontWeight='medium' className='line-clamp-3 max-w-[400px] text-dark-green'>{body}</Text>
    },
    {
      index: 'group',
      key: 'group',
      title: 'گروه',
      render: (group) => <Text fontSize='base' fontWeight='medium' className='line-clamp-3 max-w-[200px] text-dark-green'>{group}</Text>
    },
    {
      index: 'actions',
      key: 'actions',
      title: '',
      render: (_, record) => (
        <div className='flex flex-col gap-3 justify-end items-center w-full bg-transparent'>
          <Button onClick={() => navigate(`/admin/knowledge/edit/${record.id}`)} className='p-3 w-fit h-fit flex items-center justify-center bg-green-600'>
            <FaEdit className='text-white' />
          </Button>
          <Button onClick={() => showDeleteConfirm(record.id)} className='p-3 w-fit h-fit flex items-center justify-center bg-red-500 rounded-lg'>
            <MdDelete className='text-white' />
          </Button>
        </div>
      ),
    }
  ]
  
  return (
    <div className="h-full p-3 md:p-10 rounded-3xl w-full overflow-auto">
      <Header title="دانشنامه ها" section={Sections.VIEW} onClick={() => navigate(urls.adminUploadKnowledge)} openModal={() => setGroupModal(true)} />
      <Spin spinning={getKnowledge.isLoading || getKnowledge.isRefetching}>
        <CustomTable 
          columns={columns} 
          data={getKnowledge?.data && getKnowledge?.data.map(item => ({
            id: item.id,
            title: item.title,
            body: item.body,
            group: item.group?.name
          }))}
        />
      </Spin>
      <GroupModal 
        section='knowledge'
        title="گروه های دانشنامه"
        onClose={() => setGroupModal(false)}
        isModalOpen={groupModal}
      />
    </div>
  );
};
export default AdminKnowledge;
