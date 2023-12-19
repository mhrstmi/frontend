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




const UploadResearch = () => {
  const navigate = useNavigate()
  const postResearch = useAPI('/admin/research', 'post', {})
  const getResearch = useAPI('/research/list', 'get', {})
  const [files, setFiles] = useState<UploadFile<any>[]>([])

  const [form] = Form.useForm();

  const props: UploadProps = {
    name: 'file',
    multiple: true,
    beforeUpload: () => false,
    onChange(info) {
      setFiles(info.fileList)
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

  const onSubmit = async () => {
    try{
      await postResearch.mutateAsync({
        "files[]": files as any,
        body: form.getFieldValue('body'),
        title: form.getFieldValue('title'),
        abstract: form.getFieldValue('abstract')
      })
      message.success('با موفقیت اضافه شد')
      getResearch.refetch()
      navigate(urls.adminResearch)
    } catch(err){
      //@ts-ignore
      message.error(err)
    }
  }

  
  return (
    <div className="p-3 md:p-10 rounded-3xl h-full overflow-y-auto">
      <Header title="اضافه کردن پژوهشنامه" section={Sections.ADD} onClick={() => navigate(urls.adminResearch)} />
      <Form
        form={form}
        layout="vertical"
        initialValues={{ }}
        onFinish={onSubmit}
        className='flex flex-col gap-5'
      >
        <Form.Item name="title" rules={[{ required: true, message: 'لطفا عنوان پژوهشنامه را وارد کنید' }]}>
          <div className='flex flex-col gap-3'>
            <Text fontSize='lg' fontWeight='heavy' className='text-dark-green'>عنوان پژوهشنامه</Text>
            <Input 
              className="w-full md:w-2/3 lg:w-1/3 border-mid-green rounded-lg border-1"
              placeholder="عنوان پژوهشنامه" 
            />
          </div>
        </Form.Item>
        <Form.Item name="body" rules={[{ required: true, message: 'لطفا توضیحات پژوهشنامه را وارد کنید' }]}>
          <div className='flex flex-col gap-3'>
            <Text fontSize='lg' fontWeight='heavy' className='text-dark-green'>توضیحات پژوهشنامه</Text>
            <TextArea
              showCount
              maxLength={10000}
              rows={5}
              className='border-mid-green border-1 rounded-lg'
              placeholder="توضیحات پژوهشنامه"
            />
          </div>
        </Form.Item>
        <Form.Item name="abstract" rules={[{ required: true, message: 'لطفا خلاصه پژوهشنامه را وارد کنید' }]}>
          <div className='flex flex-col gap-3'>
            <Text fontSize='lg' fontWeight='heavy' className='text-dark-green'>خلاصه پژوهشنامه</Text>
            <TextArea
              showCount
              maxLength={10000}
              rows={5}
              className='border-mid-green border-1 rounded-lg'
              placeholder="خلاصه پژوهشنامه"
            />
          </div>
        </Form.Item>
        <Form.Item>
          <div className='flex flex-col gap-3'>
            <Text fontSize='lg' fontWeight='heavy' className='text-dark-green'>اضافه کردن فایل های پژوهشنامه</Text>
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
          <Button type="primary" htmlType='submit' loading={postResearch.isLoading} className='bg-dark-green flex items-center justify-center p-5'>
            <Text fontSize='lg' fontWeight='heavy'>
              اضافه کردن 
            </Text>
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default UploadResearch;
