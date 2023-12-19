import Header from '@components/Header';
import { Sections } from '@components/Header';
import useAPI from '@hooks/useAPI';
import Text from '@components/Text';
import urls from '@routes/urls';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Form, Input } from 'antd';
import { useEffect, useState } from 'react';
import TextArea from 'antd/es/input/TextArea';
import { InboxOutlined } from '@ant-design/icons';
import type { UploadFile, UploadProps } from 'antd';
import { message, Upload } from 'antd';

const { Dragger } = Upload;




const EditLibrary = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [defaultValues, setDefaultValues] = useState({})
  const getOneLibarary = useAPI('/{id}', 'get', {
    param: {
      id: Number(id)
    }
  })
  const putLibarary = useAPI('/library/{id}', 'put', {
    param: {
      id: Number(id)
    }
  })
  const [files, setFiles] = useState<any>([])
  const [defFiles, setDefFiles] = useState<any>([])

  const [form] = Form.useForm();

  useEffect(() => {
    if (getOneLibarary.data) { 
      setDefaultValues({
        comment: getOneLibarary.data?.comment,
        title: getOneLibarary.data?.title,
      })
      setDefFiles(getOneLibarary.data?.libraryAttachment)
      form.setFieldValue("comment", getOneLibarary.data?.comment)
      form.setFieldValue("title", getOneLibarary.data?.title)
    }
  }, [getOneLibarary.data])

  const props: UploadProps = {
    name: 'file',
    multiple: true,
    defaultFileList: defFiles,
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
      await putLibarary.mutateAsync({
        "files[]": files as any,
        comment: form.getFieldValue('comment'),
        title: form.getFieldValue('title'),
      })
      message.success('با موفقیت ویرایش شد')
      navigate(urls.adminLibrary)
    } catch(err){
      //@ts-ignore
      message.error(err)
    }
  }

  
  return (
    <div className="p-3 md:p-10 rounded-3xl h-full overflow-y-auto">
      <Header title="ویراش" section={Sections.EDIT} onClick={() => navigate(urls.adminLibrary)} />
      <Form
        form={form}
        layout="vertical"
        initialValues={defaultValues}
        onFinish={onSubmit}
        className='flex flex-col gap-5'
      >
        <Form.Item name="title" rules={[{ required: true, message: 'لطفا عنوان را وارد کنید' }]}>
          <div className='flex flex-col gap-3'>
            <Text fontSize='lg' fontWeight='heavy' className='text-dark-green'>عنوان</Text>
            <Input 
              className="w-full md:w-2/3 lg:w-1/3 border-mid-green rounded-lg border-1"
              value={form.getFieldValue("title")}
              placeholder="عنوان" 
            />
          </div>
        </Form.Item>
        <Form.Item name="comment" rules={[{ required: true, message: 'لطفا یادداشت را وارد کنید' }]}>
          <div className='flex flex-col gap-3'>
            <Text fontSize='lg' fontWeight='heavy' className='text-dark-green'>یادداشت</Text>
            <TextArea
              showCount
              value={form.getFieldValue("comment")}
              maxLength={10000}
              rows={5}
              className='border-mid-green border-1 rounded-lg'
              placeholder="یادداشت"
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
          <Button type="primary" htmlType='submit' loading={putLibarary.isLoading} className='bg-dark-green flex items-center justify-center p-5'>
            <Text fontSize='lg' fontWeight='heavy'>
            ویراش کردن
            </Text>
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default EditLibrary;
