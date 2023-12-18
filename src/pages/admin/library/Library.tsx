import Header from '@components/Header';
import { Sections } from '@components/Header';
import CustomTable from '@components/CustomTable';
import { Button, Spin, message } from 'antd';
import urls from '@routes/urls';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import Text from '@components/Text';
import { useNavigate } from 'react-router-dom';
import useAPI from '@hooks/useAPI';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { Modal } from 'antd';

const { confirm, } = Modal;


const Library = () => {
  const getLibrary = useAPI('/list', 'get', {})

  const navigate = useNavigate()

  const showDeleteConfirm = (id) => {
    const deleteLibrary = useAPI('/library/{id}', 'delete', {
      param: {
        id: id
      }
    })

    confirm({
      title: 'آیا از حذف این مورد اطمینان دارید؟',
      icon: <ExclamationCircleFilled />,
      okText: 'بله',
      okType: 'danger',
      cancelText: 'خیر',
      okButtonProps: {
        loading: deleteLibrary.isLoading
      },
      async onOk() {
        try {
          await deleteLibrary.mutateAsync({})
          message.success('مورد یا موفقیت حذف شد')
        }catch(err){
          //@ts-ignore
          message.error(err)
        }
      },
    });
  };

  const columns = [
    {
      index: 'id',
      key: 'id',
      title: 'شناسه',
      render: (id) => <Text fontSize='base' fontWeight='medium' className='line-clamp-1 max-w-[200px] text-dark-green'>{id}</Text>
    },
    {
      index: 'title',
      key: 'title',
      title: 'عنوان',
      render: (title) => <Text fontSize='base' fontWeight='medium' className='line-clamp-1 max-w-[200px] text-dark-green'>{title}</Text>
    },
    {
      index: 'comment',
      key: 'comment',
      title:'یادداشت',
      render: (comment) => <Text fontSize='base' fontWeight='medium' className='line-clamp-1 max-w-[200px] text-dark-green'>{comment}</Text>
    },
    {
      index: '',
      key: '',
      title: '',
      render: (_, record) => (
        <div className='flex flex-col gap-3'>
          <Button onClick={() => navigate(`/admin/library/edit/${record.id}`)} className='p-3 w-fit h-fit flex items-center justify-center bg-green-600'>
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
    <div className="p-3 md:p-10 rounded-3xl h-full">
      <Header title="کتابخانه" section={Sections.VIEW} onClick={() => navigate(urls.adminUploadLibrary)} />
      <Spin spinning={getLibrary.isLoading || getLibrary.isRefetching}>
        <CustomTable 
          columns={columns} 
          data={getLibrary?.data && getLibrary?.data.map(item => ({
            id: item.id,
            title: item.title,
            comment: item.comment,
          }))}
        />
      </Spin>
    </div>
  );
};
export default Library;
