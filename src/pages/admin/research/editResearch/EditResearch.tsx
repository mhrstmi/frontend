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




const EditResearch = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [defaultValues, setDefaultValues] = useState({})
  const getOneResearch = useAPI('/research/{id}', 'get', {
    param: {
      id: Number(id)
    }
  })
  const putResearch = useAPI('/admin/research/{id}', 'put', {
    param: {
      id: Number(id)
    }
  })
  const [files, setFiles] = useState<any>([])
  const [defFiles, setDefFiles] = useState<any>([])

  const [form] = Form.useForm();

  useEffect(() => {
    if (getOneResearch.data) { 
      setDefaultValues({
        body: getOneResearch.data?.body,
        title: getOneResearch.data?.title,
        abstract: getOneResearch.data?.abstract,
      })
      setDefFiles(getOneResearch.data?.researchAttachment)
      form.setFieldValue("body", getOneResearch.data?.body)
      form.setFieldValue("title", getOneResearch.data?.title)
      form.setFieldValue("abstract", getOneResearch.data?.abstract)
    }
  }, [getOneResearch.data])

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
      await putResearch.mutateAsync({
        "files[]": files as any,
        body: form.getFieldValue('body'),
        title: form.getFieldValue('title'),
        abstract: form.getFieldValue('abstract')
      })
      message.success('با موفقیت ویرایش شد')
      navigate(urls.adminResearch)
    } catch(err){
      //@ts-ignore
      message.error(err)
    }
  }

  
  return (
    <div className="p-3 md:p-10 rounded-3xl h-full overflow-y-auto">
      <Header title="ویراش پژوهشنامه" section={Sections.EDIT} onClick={() => navigate(urls.adminResearch)} />
      <Form
        form={form}
        layout="vertical"
        initialValues={defaultValues}
        onFinish={onSubmit}
        className='flex flex-col gap-5'
      >
        <Form.Item name="title" rules={[{ required: true, message: 'لطفا عنوان پژوهشنامه را وارد کنید' }]}>
          <div className='flex flex-col gap-3'>
            <Text fontSize='lg' fontWeight='heavy' className='text-dark-green'>عنوان پژوهشنامه</Text>
            <Input 
              className="w-full md:w-2/3 lg:w-1/3 border-mid-green rounded-lg border-1"
              value={form.getFieldValue("title")}
              placeholder="عنوان پژوهشنامه" 
            />
          </div>
        </Form.Item>
        <Form.Item name="body" rules={[{ required: true, message: 'لطفا توضیحات پژوهشنامه را وارد کنید' }]}>
          <div className='flex flex-col gap-3'>
            <Text fontSize='lg' fontWeight='heavy' className='text-dark-green'>توضیحات پژوهشنامه</Text>
            <TextArea
              showCount
              value={form.getFieldValue("body")}
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
              value={form.getFieldValue("abstract")}
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
          <Button type="primary" htmlType='submit' loading={putResearch.isLoading} className='bg-dark-green flex items-center justify-center p-5'>
            <Text fontSize='lg' fontWeight='heavy'>
            ویراش کردن
            </Text>
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default EditResearch;
