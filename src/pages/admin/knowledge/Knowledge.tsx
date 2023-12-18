import Header from '@components/Header';
import { Sections } from '@components/Header';
import CustomTable from '@components/CustomTable';
import useAPI from '@hooks/useAPI';
import { Button, Spin, message } from 'antd';
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Text } from '../../../components';
import urls from '../../../routes/urls';
import { useNavigate } from 'react-router-dom';
import { render } from 'react-dom';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { Modal } from 'antd';

const { confirm, } = Modal;


const Knowledge = () => {
  const navigate = useNavigate()
  const getKnowledge = useAPI('/knowledge/list', 'get', {})


  const showDeleteConfirm = (id) => {
    const deleteKnowledge = useAPI('/admin/knowledge/{id}', 'delete', {
      param: {
        id: id
      }
    })

    confirm({
      title: 'میخواهید این مورد را حذف کنید؟',
      icon: <ExclamationCircleFilled />,
      okText: 'بله',
      okType: 'danger',
      cancelText: 'خیر',
      okButtonProps: {
        loading: deleteKnowledge.isLoading
      },
      async onOk() {
        try {
          await deleteKnowledge.mutateAsync({})
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
      render: (body) => <Text fontSize='base' fontWeight='medium' className='line-clamp-1 max-w-[200px] text-dark-green'>{body}</Text>
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
    <div className="p-3 md:p-10 rounded-3xl h-full w-full">
      <Header title="دانشنامه ها" section={Sections.VIEW} onClick={() => navigate(urls.adminUploadKnowledge)} />
      <Spin spinning={getKnowledge.isLoading || getKnowledge.isRefetching}>
        <CustomTable 
          columns={columns} 
          data={getKnowledge?.data && getKnowledge?.data.map(item => ({
            id: item.id,
            title: item.title,
            body: item.body,
          }))}
        />
      </Spin>
    </div>
  );
};
export default Knowledge;
