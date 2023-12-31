import Header from '@components/Header';
import { Sections } from '@components/Header';
import useAPI from '@hooks/useAPI';
import Text from '@components/Text';
import urls from '@routes/urls';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, Select } from 'antd';
import { useState } from 'react';
import TextArea from 'antd/es/input/TextArea';
import { InboxOutlined } from '@ant-design/icons';
import type { UploadFile, UploadProps } from 'antd';
import { message, Upload } from 'antd';
import { GroupModal } from '../../../../components';

const { Dragger } = Upload;




const UploadKnowledge = () => {
  const navigate = useNavigate()
  const [groupModal, setGroupModal] = useState(false);
  const postKnowledge = useAPI('/admin/knowledge', 'post', {
    headers: { 'Content-Type': 'multipart/form-data', Accept: 'application/json' },
  })
  const getKnowledge = useAPI('/knowledge', 'get', {})
  const getGroups = useAPI('/group/knowledge', 'get', {})
  const [files, setFiles] = useState<UploadFile[]>([])

  const [form] = Form.useForm();

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
      await postKnowledge.mutateAsync({
        "files[]": files as any,
        body: form.getFieldValue('body'),
        title: form.getFieldValue('title'),
        groupId: form.getFieldValue('group'),
      })
      await getKnowledge.refetch()
      message.success('با موفقیت اضافه شد')
      navigate(urls.adminKnowledge)
    } catch(err){
      //@ts-ignore
      message.error(err)
    }
  }

  
  return (
    <div className="p-3 md:p-10 rounded-3xl h-full overflow-y-auto">
      <Header title="اضافه کردن دانشنامه" section={Sections.ADD} onClick={() => navigate(-1)} openModal={() => setGroupModal(true)} />
      <Form
        form={form}
        layout="vertical"
        initialValues={{ }}
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
        <Form.Item name="group" rules={[{ required: true, message: 'لطفا گروه دانشنامه را وارد کنید' }]}>
          <div className='flex flex-col gap-3 w-full md:w-2/3 lg:w-1/3'>
            <Text fontSize='lg' fontWeight='heavy' className='text-dark-green'>گروه دانشنامه</Text>
            <Select
              size='large'
              loading={getGroups.isLoading}
              value={form.getFieldValue('group')}
              onChange={(value) => form.setFieldValue('group', value)}
              className="border-mid-green rounded-lg border-1"
              placeholder="گروه دانشنامه"
              options={getGroups.data?.map(item => ({ value: item.id, label: item.name }))}
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
          <Button type="primary" htmlType='submit' loading={postKnowledge.isLoading} className='bg-dark-green flex items-center justify-center p-5'>
            <Text fontSize='lg' fontWeight='heavy'>
               اضافه کردن
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
export default UploadKnowledge;
