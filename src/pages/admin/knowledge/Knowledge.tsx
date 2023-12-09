import Header from '@components/Header';
import { Sections } from '@components/Header';
import CustomTable from '@components/CustomTable';
import useAPI from '@hooks/useAPI';
import { Button } from 'antd';
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";


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

const Knowledge = () => {
  const getKnowledge = useAPI('/knowledge/list', 'get', {})
  
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header title="دانشنامه ها" section={Sections.VIEW} />
      <CustomTable 
        columns={columns} 
        data={getKnowledge?.data && getKnowledge?.data.map(item => ({
          id: item.id,
          title: item.title,
          body: item.body,
        }))}
      />
    </div>
  );
};
export default Knowledge;
