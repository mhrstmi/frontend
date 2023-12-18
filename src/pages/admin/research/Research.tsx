import Header from '@components/Header';
import { Sections } from '@components/Header';
import CustomTable from '@components/CustomTable';
import { Button, Spin, message } from 'antd';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import useAPI from '@hooks/useAPI';
import { Text } from '../../../components';
import urls from '../../../routes/urls';
import { useNavigate } from 'react-router-dom';

import { ExclamationCircleFilled } from '@ant-design/icons';
import { Modal } from 'antd';

const { confirm, } = Modal;


const Research = () => {
  const navigate = useNavigate()
  const getResearch = useAPI('/research/list', 'get', {})

  const showDeleteConfirm = (id) => {
    const deleteResearch = useAPI('/admin/research/{id}', 'delete', {
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
        loading: deleteResearch.isLoading
      },
      async onOk() {
        try {
          await deleteResearch.mutateAsync({})
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
      index: 'body',
      key: 'body',
      title: 'محتوا',
      render: (body) => <Text fontSize='base' fontWeight='medium' className='line-clamp-1 max-w-[200px] text-dark-green'>{body}</Text>
    },
    {
      index: 'abstract',
      key: 'abstract',
      title: 'خلاصه',
      render: (abstract) => <Text fontSize='base' fontWeight='medium' className='line-clamp-1 max-w-[200px] text-dark-green'>{abstract}</Text>
    },
    {
      index: '',
      key: '',
      title: '',
      render: (_, record) => (
        <div className='flex flex-col gap-3'>
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
      <Header section={Sections.VIEW} title="پژوهشنامه ها" onClick={() => navigate(urls.adminUploadResearch)} />
      <Spin spinning={getResearch.isLoading || getResearch.isRefetching}>
        <CustomTable 
          columns={columns} 
          data={getResearch?.data && getResearch?.data.map(item => ({
            id: item.id,
            title: item.title,
            body: item.body,
            abstract: item.abstract
          }))}
        />
      </Spin>
    </div>
  );
};
export default Research;
