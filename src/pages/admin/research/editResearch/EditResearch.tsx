import Header from '@components/Header';
import { Sections } from '@components/Header';
import useAPI from '@hooks/useAPI';
import Text from '@components/Text';
import urls from '@routes/urls';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Form, Input, Select } from 'antd';
import { useEffect, useState } from 'react';
import TextArea from 'antd/es/input/TextArea';
import { InboxOutlined } from '@ant-design/icons';
import type { UploadFile, UploadProps } from 'antd';
import { message, Upload } from 'antd';
import { GroupModal } from '../../../../components';

const { Dragger } = Upload;




const EditResearch = () => {
  const { id } = useParams()
  const [groupModal, setGroupModal] = useState(false);
  const navigate = useNavigate()
  const [defaultValues, setDefaultValues] = useState({})
  const [files, setFiles] = useState<any>([])

  const [form] = Form.useForm();

  const getResearch = useAPI('/research', 'get', {})
  const getOneResearch = useAPI('/research/{id}', 'get', {
    param: {
      id: Number(id)
    }
  })
  const putResearch = useAPI('/admin/research/{id}', 'put', {
    headers: { 'Content-Type': 'multipart/form-data', Accept: 'application/json' },
    param: {
      id: Number(id)
    }
  })
  const getGroups = useAPI('/group/research', 'get', {})

  useEffect(() => {
    if (getOneResearch.data) { 
      setDefaultValues({
        body: getOneResearch.data?.body,
        title: getOneResearch.data?.title,
        abstract: getOneResearch.data?.abstract,
        group: getOneResearch.data?.group?.id,
      })
      setFiles(getOneResearch.data?.researchAttachment)
      form.setFieldValue("body", getOneResearch.data?.body)
      form.setFieldValue("title", getOneResearch.data?.title)
      form.setFieldValue("abstract", getOneResearch.data?.abstract)
      form.setFieldValue("group", getOneResearch.data?.group?.id)
    }
  }, [getOneResearch.data])

  const handleRemove = (file: UploadFile) => {
    if (files.some((item) => item.uid === file.uid)) {
      setFiles((fileList) => fileList.filter((item) => item.uid !== file.uid));
      return true;
    }
    return false;
  };
  

  const props: UploadProps = {
    multiple: true,
    fileList: files,
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
      await putResearch.mutateAsync({
        "files[]": files as any,
        body: form.getFieldValue('body'),
        title: form.getFieldValue('title'),
        abstract: form.getFieldValue('abstract'),
        groupId: form.getFieldValue('group'),
      })
      await getResearch.refetch()
      message.success('با موفقیت ویرایش شد')
      navigate(urls.adminResearch)
    } catch(err){
      //@ts-ignore
      message.error(err)
    }
  }

  
  return (
    <div className="p-3 md:p-10 rounded-3xl h-full overflow-y-auto">
      <Header title="ویرایش پژوهشنامه" section={Sections.EDIT} onClick={() => navigate(-1)} openModal={() => setGroupModal(true)} />
      <Form
        form={form}
        layout="vertical"
        initialValues={defaultValues}
        onFinish={onSubmit}
        className='flex flex-col gap-5'
      >
        <div className='flex flex-col gap-3'>
            <Text fontSize='lg' fontWeight='heavy' className='text-dark-green'>عنوان پژوهشنامه</Text>
          <Form.Item name="title" rules={[{ required: true, message: 'لطفا عنوان پژوهشنامه را وارد کنید' }]}>
              <Input 
                className="w-full md:w-2/3 lg:w-1/3 border-mid-green rounded-lg border-1"
                value={form.getFieldValue("title")}
                placeholder="عنوان پژوهشنامه" 
              />
          </Form.Item>
        </div>
        <div className='flex flex-col gap-3 w-full md:w-2/3 lg:w-1/3'>
          <Text fontSize='lg' fontWeight='heavy' className='text-dark-green'>گروه پژوهشنامه</Text>
          <Form.Item name="group" rules={[{ required: true, message: 'لطفا گروه پژوهشنامه را وارد کنید' }]}>
              <Select
                size='large'
                value={form.getFieldValue('group')}
                onChange={(value) => form.setFieldValue('group', value)}
                className="border-mid-green rounded-lg border-1"
                placeholder="گروه پژوهشنامه"
                loading={getGroups.isLoading}
                options={getGroups.data?.map(item => ({ value: item.id, label: item.name }))}
              />
          </Form.Item>
        </div>
        <div className='flex flex-col gap-3'>
            <Text fontSize='lg' fontWeight='heavy' className='text-dark-green'>توضیحات پژوهشنامه</Text>
            <Form.Item name="body" rules={[{ required: true, message: 'لطفا توضیحات پژوهشنامه را وارد کنید' }]}>
                <TextArea
                  showCount
                  value={form.getFieldValue("body")}
                  maxLength={10000}
                  rows={5}
                  className='border-mid-green border-1 rounded-lg'
                  placeholder="توضیحات پژوهشنامه"
                />
            </Form.Item>
        </div>
        <div className='flex flex-col gap-3'>
            <Text fontSize='lg' fontWeight='heavy' className='text-dark-green'>خلاصه پژوهشنامه</Text>
            <Form.Item name="abstract" rules={[{ required: true, message: 'لطفا خلاصه پژوهشنامه را وارد کنید' }]}>
                <TextArea
                  showCount
                  maxLength={10000}
                  value={form.getFieldValue("abstract")}
                  rows={5}
                  className='border-mid-green border-1 rounded-lg'
                  placeholder="خلاصه پژوهشنامه"
                />
            </Form.Item>
        </div>
        <div className='flex flex-col gap-3'>
            <Text fontSize='lg' fontWeight='heavy' className='text-dark-green'>اضافه کردن فایل های پژوهشنامه</Text>
            <Form.Item>
                <Dragger {...props}>
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">
                    <Text fontSize='base' fontWeight='heavy' className='text-dark-green'>
                    برای اضافه کردن کلیک کنید یا فایل را به این قسمت بکشید و رها کنید
                    </Text>
                  </p>
                </Dragger>
            </Form.Item>
        </div>
        <Form.Item>
          <Button type="primary" htmlType='submit' loading={putResearch.isLoading} className='bg-dark-green flex items-center justify-center p-5'>
            <Text fontSize='lg' fontWeight='heavy'>
            ویراش کردن
            </Text>
          </Button>
        </Form.Item>
      </Form>
      <GroupModal 
        section='research'
        title="گروه های پژوهشنامه"
        onClose={() => setGroupModal(false)}
        isModalOpen={groupModal}
      />
    </div>
  );
};
export default EditResearch;
