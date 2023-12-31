import React, { useEffect, useState } from 'react';
import { Text } from '../../../components';
import { Button, Divider, Form, UploadFile, UploadProps, message, Image } from 'antd';
import { useNavigate } from 'react-router-dom';
import urls from '../../../routes/urls';
import useAPI from '../../../hooks/useAPI';
import Dragger from 'antd/es/upload/Dragger';
import { InboxOutlined } from '@ant-design/icons';


const Dashboard = () => {
  const navigate = useNavigate()
  const [files, setFiles] = useState<UploadFile[]>([])

  const [form] = Form.useForm();

  const getResearch = useAPI('/research', 'get', {})
  const getKnowledge = useAPI('/knowledge', 'get', {})
  const getLibrary = useAPI('/library', 'get', {})
  const getSlider = useAPI('/slider', 'get', {})
  const postSlider = useAPI('/slider', 'post', {
    headers: { 'Content-Type': 'multipart/form-data', Accept: 'application/json' },
  })

  const handleRemove = (file: UploadFile) => {
    if (files.some((item) => item.uid === file.uid)) {
      setFiles((fileList) => fileList.filter((item) => item.uid !== file.uid));
      return true;
    }
    return false;
  };
  

  const props: UploadProps = {
    multiple: true,
    beforeUpload: (file) => {
      if((getSlider.data && getSlider.data.length >= 5) || files.length >= 5){
        message.warning('امکان آپلود بیشتر از ۵ عکس برای بنر وجود ندارد')
        return false;
      }
      if (!file) {
        message.error('در انتخاب فایل مشکلی پیش آمد')
        return false;
      }
      setFiles((state) => [...state, file])
      return false
    },
    maxCount: 5,
    onRemove: (file: UploadFile) => {
      handleRemove(file);
    },
  };

  const onSubmit = async () => {
    try{
      await postSlider.mutateAsync({
        //@ts-ignore
        "files[]": files    
      })
      setFiles([])
      getSlider.refetch()
      message.success('با موفقیت آپلود شد')
    }catch(err){
      //@ts-ignore
      message.error(err)
    }
  }

  return (
    <div className="p-3 md:p-10 rounded-3xl h-full overflow-auto">
      <div className='flex flex-col gap-5'>
        <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
          <div className='rounded-lg bg-white w-full flex flex-col items-center justify-center gap-5 p-5'>
            <Text fontSize='4xl' fontWeight='black' className='text-dark-green'>{getResearch.data ? getResearch.data.length : 0}</Text>
            <Divider className="m-0" />
            <div className='w-full flex flex-col lg:flex-row gap-5'>
              <Button onClick={() => navigate(urls.adminResearch)} className="bg-mid-green w-full">
                <Text fontSize='base' fontWeight='heavy' className='text-white'>پژوهشنامه ها</Text>
              </Button>
              <Button onClick={() => navigate(urls.adminUploadResearch)} className='bg-dark-green w-full'>
                <Text fontSize='base' fontWeight='heavy' className='text-white'>ایجاد پژوهشنامه</Text>
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
        <div className='w-full border border-solid border-mid-green rounded-lg flex flex-col gap-5 p-5'>
          <Form
              form={form}
              layout="vertical"
              initialValues={{ }}
              onFinish={onSubmit}
              className='flex flex-col gap-3'
          >
            <Form.Item>
              <div className='flex flex-col gap-3'>
                <Text fontSize='lg' fontWeight='heavy' className='text-dark-green'>عکس های بنر</Text>
                <Dragger {...props} className='border-mid-green border-1 rounded-lg'>
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">
                    <Text fontSize='base' fontWeight='heavy' className='text-dark-green'>
                    برای اضافه کردن کلیک کنید یا فایل را به این قسمت بکشید و رها کنید
                    </Text>
                  </p>
                </Dragger>
              </div>
            </Form.Item>
            <Button loading={postSlider.isLoading} className='bg-dark-green w-fit h-fit' type="primary" htmlType="submit">
              <Text fontSize='base' fontWeight='bold' className='text-white'>آپلود</Text>
            </Button>
          </Form>
          <div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5'>
            {getSlider.data?.map((item, index) => (
              <Image 
                key={index} 
                src={import.meta.env['REACT_APP_SERVER_URL'] + item.path} 
                className='w-full object-cover rounded-lg transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl'
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
