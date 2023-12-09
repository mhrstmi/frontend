import Header from '@components/Header';
import { Sections } from '@components/Header';
import CustomTable from '@components/CustomTable';
import { Button } from 'antd';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import useAPI from '@hooks/useAPI';

const columns = [
  {
    index: 'id',
    key: 'id',
    title: 'شناسه',
  },
  {
    index: 'title',
    key: 'title',
    title: 'عنوان',
  },
  {
    index: 'body',
    key: 'body',
    title: 'محتوا',
  },
  {
    index: 'abstract',
    key: 'abstract',
    title: 'خلاصه',
  },
  {
    index: '',
    key: '',
    title: '',
    render: (id) => (
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
  const getResearch = useAPI('/research/list', 'get', {})

  return (
    <div className="p-3 md:p-10 bg-white rounded-3xl h-full">
      <Header section={Sections.VIEW} title="پرسشنامه ها" />
      <CustomTable 
        columns={columns} 
        data={[
          {
            id: 1,
            title: 'تست',
            body: 'متن برای تست',
            abstract: 'متن برای تست بخش خلاصه',
          }
        ]}
      />
    </div>
  );
};
export default Research;
