import Header from '@components/Header';
import { Sections } from '@components/Header';
import useAPI from '@hooks/useAPI';
import Text from '@components/Text';
import urls from '@routes/urls';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Form, Input } from 'antd';
import { useState } from 'react';
import TextArea from 'antd/es/input/TextArea';
import { InboxOutlined } from '@ant-design/icons';
import type { UploadFile, UploadProps } from 'antd';
import { message, Upload } from 'antd';

const { Dragger } = Upload;




const EditKnowledge = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const getOneKnowledge = useAPI('/knowledge/{id}', 'get', {
    param: {
      id: Number(id)
    }
  })
  const putKnowledge = useAPI('/admin/knowledge/{id}', 'put', {
    param: {
      id: Number(id)
    }
  })
  const [files, setFiles] = useState<UploadFile<any>[]>([])

  const [form] = Form.useForm();

  const props: UploadProps = {
    name: 'file',
    multiple: true,
    defaultFileList: getOneKnowledge.data?.knowledgeAttachment as any,
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
      await putKnowledge.mutateAsync({
        "files[]": files as any,
        body: form.getFieldValue('body'),
        title: form.getFieldValue('title'),
      })
      message.success('با موفقیت ویرایش شد')
      navigate(urls.adminKnowledge)
    } catch(err){
      //@ts-ignore
      message.error(err)
    }
  }

  
  return (
    <div className="p-3 md:p-10 rounded-3xl h-full overflow-y-auto">
      <Header title="ویراش دانشنامه" section={Sections.EDIT} onClick={() => navigate(urls.adminKnowledge)} />
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          body: getOneKnowledge.data?.body,
          title: getOneKnowledge.data?.title,
        }}
        onFinish={onSubmit}
        className='flex flex-col gap-5'
      >
        <Form.Item name="title" rules={[{ required: true, message: 'لطفا عنوان دانشنامه را وارد کنید' }]}>
          <div className='flex flex-col gap-3'>
            <Text fontSize='lg' fontWeight='heavy' className='text-dark-green'>عنوان دانشنامه</Text>
            <Input 
              className="w-full md:w-2/3 lg:w-1/3 border-mid-green rounded-lg border-1"
              placeholder="عنوان دانشنامه" 
            />
          </div>
        </Form.Item>
        <Form.Item name="body" rules={[{ required: true, message: 'لطفا توضیحات دانشنامه را وارد کنید' }]}>
          <div className='flex flex-col gap-3'>
            <Text fontSize='lg' fontWeight='heavy' className='text-dark-green'>توضیحات دانشنامه</Text>
            <TextArea
              showCount
              maxLength={10000}
              rows={5}
              className='border-mid-green border-1 rounded-lg'
              placeholder="توضیحات دانشنامه"
            />
          </div>
        </Form.Item>
        <Form.Item>
          <div className='flex flex-col gap-3'>
            <Text fontSize='lg' fontWeight='heavy' className='text-dark-green'>فایل های دانشنامه</Text>
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
          <Button type="primary" htmlType='submit' loading={putKnowledge.isLoading} className='bg-dark-green flex items-center justify-center p-5'>
            <Text fontSize='lg' fontWeight='heavy'>
            ویراش کردن
            </Text>
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default EditKnowledge;
