import Header from '@components/Header';
import { Sections } from '@components/Header';
import useAPI from '@hooks/useAPI';
import Text from '@components/Text';
import urls from '@routes/urls';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input } from 'antd';
import { useState } from 'react';
import TextArea from 'antd/es/input/TextArea';
import { InboxOutlined } from '@ant-design/icons';
import type { UploadFile, UploadProps } from 'antd';
import { message, Upload } from 'antd';

const { Dragger } = Upload;




const UploadLibrary = () => {
  const navigate = useNavigate()
  const postLibrary = useAPI('/library', 'post', {
    headers: { 'Content-Type': 'multipart/form-data', Accept: 'application/json' },
  })
  const [files, setFiles] = useState<UploadFile[]>([])

  const [form] = Form.useForm();
  const getLibrary = useAPI('/library', 'get', {})

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
      if (!file) {
        message.error('در انتخاب فایل مشکلی پیش آمد')
        return false;
      }
      setFiles((state) => [...state, file])
      return false
    },
    onRemove: (file: UploadFile) => {
      handleRemove(file);
    },
  };

  const onSubmit = async () => {
    try{
      await postLibrary.mutateAsync({
        "files[]": files as any,
        comment: form.getFieldValue('comment'),
        title: form.getFieldValue('title')
      })
      await getLibrary.refetch()
      message.success('با موفقیت اضافه شد')
      navigate(urls.adminLibrary)
    } catch(err){
      //@ts-ignore
      message.error(err)
    }
  }

  
  return (
    <div className="p-3 md:p-10 rounded-3xl h-full overflow-y-auto">
      <Header title="اضافه کردن به کتابخانه" section={Sections.ADD} onClick={() => navigate(-1)} />
      <Form
        form={form}
        layout="vertical"
        initialValues={{ }}
        onFinish={onSubmit}
        className='flex flex-col gap-5'
      >
        <Form.Item name="title" rules={[{ required: true, message: 'لطفا عنوان را وارد کنید' }]}>
          <div className='flex flex-col gap-3'>
            <Text fontSize='lg' fontWeight='heavy' className='text-dark-green'>عنوان</Text>
            <Input 
              className="w-full md:w-2/3 lg:w-1/3 border-mid-green rounded-lg border-1"
              placeholder="عنوان" 
            />
          </div>
        </Form.Item>
        <Form.Item name="comment" rules={[{ required: true, message: 'لطفا یاداشت را وارد کنید' }]}>
          <div className='flex flex-col gap-3'>
            <Text fontSize='lg' fontWeight='heavy' className='text-dark-green'>یاداشت</Text>
            <TextArea
              showCount
              maxLength={10000}
              rows={5}
              className='border-mid-green border-1 rounded-lg'
              placeholder="یاداشت"
            />
          </div>
        </Form.Item>
        <Form.Item>
          <div className='flex flex-col gap-3'>
            <Text fontSize='lg' fontWeight='heavy' className='text-dark-green'>اضافه کردن فایل ها</Text>
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
        <Form.Item>
          <Button type="primary" htmlType='submit' loading={postLibrary.isLoading} className='bg-dark-green flex items-center justify-center p-5'>
            <Text fontSize='lg' fontWeight='heavy'>
              اضافه کردن 
            </Text>
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default UploadLibrary;
