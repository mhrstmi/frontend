import Header from '@components/Header';
import { Sections } from '@components/Header';
import CustomTable from '@components/CustomTable';
import useAPI from '@hooks/useAPI';
import { Button, Spin } from 'antd';
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import Text from '@components/Text';
import urls from '../../../../routes/urls';
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

const UploadKnowledge = () => {
  const navigate = useNavigate()
  const postKnowledge = useAPI('/admin/knowledge', 'post', {})
  
  return (
    <div className="p-3 md:p-10 rounded-3xl h-full">
      <Header title="دانشنامه ها" section={Sections.ADD} onClick={() => {}} />
    </div>
  );
};
export default UploadKnowledge;
