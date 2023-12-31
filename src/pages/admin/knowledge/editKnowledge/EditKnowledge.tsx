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




const EditKnowledge = () => {
  const { id } = useParams()
  const [groupModal, setGroupModal] = useState(false);
  const [defaultValues, setDefaultValues] = useState({})
  const [files, setFiles] = useState<any>([])

  const navigate = useNavigate()
  const [form] = Form.useForm();

  const getOneKnowledge = useAPI('/knowledge/{id}', 'get', {
    param: {
      id: Number(id)
    }
  })
  const putKnowledge = useAPI('/admin/knowledge/{id}', 'put', {
    headers: { 'Content-Type': 'multipart/form-data', Accept: 'application/json' },
    param: {
      id: Number(id)
    }
  })
  const getKnowledge = useAPI('/knowledge', 'get', {})
  const getGroups = useAPI('/group/knowledge', 'get', {})


  useEffect(() => {
    if (getOneKnowledge.data) { 
      setDefaultValues({
        body: getOneKnowledge.data?.body,
        title: getOneKnowledge.data?.title,
        group: getOneKnowledge.data?.group?.id,
      })
      setFiles(getOneKnowledge.data?.knowledgeAttachment)
      form.setFieldValue("body", getOneKnowledge.data?.body)
      form.setFieldValue("title", getOneKnowledge.data?.title)
      form.setFieldValue("group", getOneKnowledge.data?.group?.id)
    }
  }, [getOneKnowledge.data])

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
      await putKnowledge.mutateAsync({
        "files[]": files,
        body: form.getFieldValue('body'),
        title: form.getFieldValue('title'),
        groupId: form.getFieldValue('group'),
      })
      await getKnowledge.refetch()
      message.success('با موفقیت ویرایش شد')
      navigate(urls.adminKnowledge)
    } catch(err){
      //@ts-ignore
      message.error(err)
    }
  }

  
  return (
    <div className="p-3 md:p-10 rounded-3xl h-full overflow-y-auto">
      <Header title="ویرایش دانشنامه" section={Sections.EDIT} onClick={() => navigate(-1)} openModal={() => setGroupModal(true)} />
      <Form
        form={form}
        layout="vertical"
        initialValues={defaultValues}
        onFinish={onSubmit}
        className='flex flex-col gap-5'
      >
        <div className='flex flex-col gap-3'>
          <Text fontSize='lg' fontWeight='heavy' className='text-dark-green'>عنوان دانشنامه</Text>
          <Form.Item name="title" rules={[{ required: true, message: 'لطفا عنوان دانشنامه را وارد کنید' }]}>
            <Input 
              className="w-full md:w-2/3 lg:w-1/3 border-mid-green rounded-lg border-1"
              placeholder="عنوان دانشنامه" 
            />
          </Form.Item>
        </div>
        <div className='flex flex-col gap-3 w-full md:w-2/3 lg:w-1/3'>
          <Text fontSize='lg' fontWeight='heavy' className='text-dark-green'>گروه دانشنامه</Text>
          <Form.Item name="group" rules={[{ required: true, message: 'لطفا گروه دانشنامه را وارد کنید' }]}>
              <Select
                size='large'
                value={form.getFieldValue('group')}
                onChange={(value) => form.setFieldValue('group', value)}
                className="border-mid-green rounded-lg border-1"
                placeholder="گروه دانشنامه"
                loading={getGroups.isLoading}
                options={getGroups.data?.map(item => ({ value: item.id, label: item.name }))}
              />
          </Form.Item>
        </div>
        <div className='flex flex-col gap-3'>
          <Text fontSize='lg' fontWeight='heavy' className='text-dark-green'>توضیحات دانشنامه</Text>
          <Form.Item name="body" rules={[{ required: true, message: 'لطفا توضیحات دانشنامه را وارد کنید' }]}>
              <TextArea
                showCount
                maxLength={10000}
                rows={5}
                className='border-mid-green border-1 rounded-lg'
                placeholder="توضیحات دانشنامه"
              />
          </Form.Item>
        </div>
        <div className='flex flex-col gap-3'>
            <Text fontSize='lg' fontWeight='heavy' className='text-dark-green'>فایل های دانشنامه</Text>
            <Form.Item name="files">
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
          <Button type="primary" htmlType='submit' loading={putKnowledge.isLoading} className='bg-dark-green flex items-center justify-center p-5'>
            <Text fontSize='lg' fontWeight='heavy'>
            ویراش کردن
            </Text>
          </Button>
        </Form.Item>
      </Form>
      <GroupModal 
        section='knowledge'
        title="گروه های دانشنامه"
        onClose={() => setGroupModal(false)}
        isModalOpen={groupModal}
      />
    </div>
  );
};
export default EditKnowledge;
