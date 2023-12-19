import React from 'react';
import { Text } from '../../../components';
import { Button, Divider } from 'antd';
import { useNavigate } from 'react-router-dom';
import urls from '../../../routes/urls';
import useAPI from '../../../hooks/useAPI';


const Dashboard = () => {
  const navigate = useNavigate()

  const getResearch = useAPI('/research/list', 'get', {})
  const getKnowledge = useAPI('/knowledge/list', 'get', {})
  const getLibrary = useAPI('/list', 'get', {})

  return (
    <div className="p-3 md:p-10 rounded-3xl h-full overflow-auto">
      <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
        <div className='rounded-lg bg-white w-full flex flex-col items-center justify-center gap-5 p-5'>
          <Text fontSize='4xl' fontWeight='black' className='text-dark-green'>{getResearch.data ? getResearch.data.length : 0}</Text>
          <Divider className="m-0" />
          <div className='w-full flex flex-col lg:flex-row gap-5'>
            <Button onClick={() => navigate(urls.adminResearch)} className="bg-mid-green w-full">
              <Text fontSize='base' fontWeight='heavy' className='text-white'>پژوهشنامه ها</Text>
            </Button>
            <Button onClick={() => navigate(urls.adminUploadResearch)} className='bg-dark-green w-full'>
              <Text fontSize='base' fontWeight='heavy' className='text-white'>ایجاد پرسشنامه</Text>
            </Button>
          </div>
        </div>
        <div className='rounded-lg bg-white w-full flex flex-col items-center justify-center gap-5 p-5'>
          <Text fontSize='4xl' fontWeight='black' className='text-dark-green'>{getKnowledge.data ? getKnowledge.data.length : 0}</Text>
          <Divider className="m-0" />
          <div className='w-full flex flex-col lg:flex-row gap-5'>
            <Button onClick={() => navigate(urls.adminKnowledge)} className="bg-mid-green w-full">
              <Text fontSize='base' fontWeight='heavy' className='text-white'>دانشنامه ها</Text>
            </Button>
            <Button onClick={() => navigate(urls.adminUploadKnowledge)} className='bg-dark-green w-full'>
              <Text fontSize='base' fontWeight='heavy' className='text-white'>ایجاد دانشنامه</Text>
            </Button>
          </div>
        </div>
        <div className='rounded-lg bg-white w-full flex flex-col items-center justify-center gap-5 p-5'>
          <Text fontSize='4xl' fontWeight='black' className='text-dark-green'>{getLibrary.data ? getLibrary.data.length : 0}</Text>
          <Divider className="m-0" />
          <div className='w-full flex flex-col lg:flex-row gap-5'>
            <Button onClick={() => navigate(urls.adminLibrary)} className="bg-mid-green w-full">
              <Text fontSize='base' fontWeight='heavy' className='text-white'>کتابخانه</Text>
            </Button>
            <Button onClick={() => navigate(urls.adminUploadLibrary)} className='bg-dark-green w-full'>
              <Text fontSize='base' fontWeight='heavy' className='text-white'>اضافه به کتابخانه</Text>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
