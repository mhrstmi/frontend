import React, { useState } from 'react'
import "moment/locale/fa";
import { CustomTable, Header, Text } from '../../../components';
import { useNavigate } from 'react-router-dom';
import { Sections } from '../../../components/Header';
import urls from '../../../routes/urls';
import useAPI from '../../../hooks/useAPI';
import { Button, Modal, Spin, message } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const { confirm, } = Modal;


const AdminCalendar = () => {
  const [itemId, setItemId] = useState(0);
  const navigate = useNavigate()
  const getCalendar = useAPI('/calendar', 'get', {})
  const deleteCalendar = useAPI('/admin/calendar/{id}', 'delete', {
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
        loading: deleteCalendar.isLoading
      },

      onCancel() {
        setItemId(0)
      },
      async onOk() {
        try {
          await deleteCalendar.mutateAsync({})
          getCalendar.refetch()
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
      index: 'date',
      key: 'date',
      title: 'تاریخ',
      render: (date) => <Text fontSize='base' fontWeight='medium' className='line-clamp-1 max-w-[200px] text-dark-green'>{date}</Text>
    },
    {
      index: 'text',
      key: 'text',
      title: 'متن',
      render: (text) => <Text fontSize='base' fontWeight='medium' className='line-clamp-3 max-w-[400px] text-dark-green'>{text}</Text>
    },
    {
      index: 'actions',
      key: 'actions',
      title: '',
      render: (_, record) => (
        <div className='flex flex-col gap-3 justify-end items-center w-full bg-transparent'>
          <Button onClick={() => navigate(`/admin/calendar/edit/${record.id}`)} className='p-3 w-fit h-fit flex items-center justify-center bg-green-600'>
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
    <div className="p-3 md:p-10 rounded-3xl h-full overflow-auto">
      <Header title="تقویم مقاومت" section={Sections.VIEW} onClick={() => navigate(urls.adminUploadCalendar)} />
      <Spin spinning={getCalendar.isLoading || getCalendar.isRefetching}>
        <CustomTable 
          columns={columns} 
          data={getCalendar?.data && getCalendar?.data.map(item => ({
            id: item.id,
            date: item.dateShow,
            text: item.text,
          }))}
        />
      </Spin>
    </div>
  )
}

export default AdminCalendar