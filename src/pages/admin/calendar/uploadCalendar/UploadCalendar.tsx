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

import { ConfigProvider } from "antd";
import { DatePicker } from "antd-jalali";
import fa_IR from "antd/lib/locale/fa_IR";
import "moment/locale/fa";
import dayjs from 'dayjs'

const { Dragger } = Upload;

//@ts-ignore
dayjs.calendar('jalali');


const UploadCalendar = () => {
  const navigate = useNavigate()
  const postCalendar = useAPI('/admin/calendar', 'post', {
    headers: { 'Content-Type': 'multipart/form-data', Accept: 'application/json' },
  })
  const getCalendar = useAPI('/calendar', 'get', {})
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
      await postCalendar.mutateAsync({
        "files[]": files as any,
        text: form.getFieldValue('text'),
        dateShow: form.getFieldValue('date'),
      })
      await getCalendar.refetch()
      message.success('با موفقیت اضافه شد')
      navigate(urls.adminCalendar)
    } catch(err){
      //@ts-ignore
      message.error(err)
    }
  }

  
  return (
    <div className="p-3 md:p-10 rounded-3xl h-full overflow-y-auto">
      <Header title="اضافه کردن مناسبت" section={Sections.ADD} onClick={() => navigate(-1)} />
      <Form
        form={form}
        layout="vertical"
        initialValues={{ }}
        onFinish={onSubmit}
        className='flex flex-col gap-5'
      >
        <Form.Item name="date" rules={[{ required: true, message: 'لطفا تاریخ مناسبت را وارد کنید' }]}>
          <div className='flex flex-col gap-3'>
            <Text fontSize='lg' fontWeight='heavy' className='text-dark-green'>تاریخ مناسبت</Text>
            <ConfigProvider locale={fa_IR}  direction="rtl">
              <DatePicker 
                size='large' 
                className="w-full md:w-2/3 lg:w-1/3 border-mid-green rounded-lg border-1" 
                onChange={(date, dateString) => {
                  form.setFieldsValue({
                    date: dateString
                  })
                }}
              />
            </ConfigProvider>
          </div>
        </Form.Item>
        <Form.Item name="text" rules={[{ required: true, message: 'لطفا توضیحات مناسبت را وارد کنید' }]}>
          <div className='flex flex-col gap-3'>
            <Text fontSize='lg' fontWeight='heavy' className='text-dark-green'>توضیحات مناسبت</Text>
            <TextArea
              showCount
              maxLength={10000}
              rows={5}
              className='border-mid-green border-1 rounded-lg'
              placeholder="توضیحات مناسبت"
            />
          </div>
        </Form.Item>
        <Form.Item>
          <div className='flex flex-col gap-3'>
            <Text fontSize='lg' fontWeight='heavy' className='text-dark-green'>فایل های مناسبت</Text>
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
          <Button type="primary" htmlType='submit' loading={postCalendar.isLoading} className='bg-dark-green flex items-center justify-center p-5'>
            <Text fontSize='lg' fontWeight='heavy'>
               اضافه کردن
            </Text>
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default UploadCalendar;
