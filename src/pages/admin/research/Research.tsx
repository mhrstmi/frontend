import Header from '@components/Header';
import { Sections } from '@components/Header';
import CustomTable from '@components/CustomTable';
import { Button, Spin } from 'antd';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import useAPI from '@hooks/useAPI';
import { Text } from '../../../components';
import urls from '../../../routes/urls';
import { useNavigate } from 'react-router-dom';

const columns = [
  {
    index: 'id',
    key: 'id',
    title: <Text fontSize='lg' fontWeight='normal' className='line-clamp-1'>شناسه</Text>,
  },
  {
    index: 'title',
    key: 'title',
    title: <Text fontSize='lg' fontWeight='normal' className='line-clamp-1'>عنوان</Text>,
  },
  {
    index: 'body',
    key: 'body',
    title: <Text fontSize='lg' fontWeight='normal' className='line-clamp-1'>محتوا</Text>,
  },
  {
    index: 'abstract',
    key: 'abstract',
    title: <Text fontSize='lg' fontWeight='normal' className='line-clamp-1'>خلاصه</Text>,
  },
  {
    index: '',
    key: '',
    title: '',
    render: (_, record) => (
      <div className='flex flex-col gap-3'>
        <Button className='p-3 w-fit h-fit flex items-center justify-center bg-green-600'>
          <FaEdit className='text-white' />
        </Button>
        <Button className='p-3 w-fit h-fit flex items-center justify-center bg-red-500 rounded-lg'>
          <MdDelete className='text-white' />
        </Button>
      </div>
    ),
  }
]

const Research = () => {
  const navigate = useNavigate()
  const getResearch = useAPI('/research/list', 'get', {})

  return (
    <div className="p-3 md:p-10 rounded-3xl h-full w-full">
      <Header section={Sections.VIEW} title="پرسشنامه ها" onClick={() => navigate(urls.adminUploadResearch)} />
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
