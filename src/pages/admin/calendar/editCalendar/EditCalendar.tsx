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

import { ConfigProvider } from "antd";
import { DatePicker } from "antd-jalali";
import fa_IR from "antd/lib/locale/fa_IR";
import "moment/locale/fa";
import dayjs from 'dayjs'

const { Dragger } = Upload;

//@ts-ignore
dayjs.calendar('jalali');




const EditCalendar = () => {
  const { id } = useParams()
  const [defaultValues, setDefaultValues] = useState({})
  const [files, setFiles] = useState<any>([])

  const navigate = useNavigate()
  const [form] = Form.useForm();

  // const getOneCalendar = useAPI('/calendar/{id}', 'get', {
  //   param: {
  //     id: Number(id)
  //   }
  // })
  const putCalendar = useAPI('/admin/calendar/{id}', 'put', {
    headers: { 'Content-Type': 'multipart/form-data', Accept: 'application/json' },
    param: {
      id: Number(id)
    }
  })
  const getCalendar = useAPI('/calendar', 'get', {})


  // useEffect(() => {
  //   if (getOneCalendar.data) { 
  //     setDefaultValues({
  //       body: getOneCalendar.data?.body,
  //       title: getOneCalendar.data?.title,
  //       group: getOneCalendar.data?.group?.id,
  //     })
  //     setFiles(getOneCalendar.data?.knowledgeAttachment)
  //     form.setFieldValue("body", getOneCalendar.data?.body)
  //     form.setFieldValue("title", getOneCalendar.data?.title)
  //     form.setFieldValue("group", getOneCalendar.data?.group?.id)
  //   }
  // }, [getOneCalendar.data])

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
      await putCalendar.mutateAsync({
        "files[]": files,
        text: form.getFieldValue('text'),
        dateShow: form.getFieldValue('date'),
      })
      await getCalendar.refetch()
      message.success('با موفقیت ویرایش شد')
      navigate(urls.adminCalendar)
    } catch(err){
      //@ts-ignore
      message.error(err)
    }
  }

  
  return (
    <div className="p-3 md:p-10 rounded-3xl h-full overflow-y-auto">
      <Header title="ویرایش مناسبت" section={Sections.EDIT} onClick={() => navigate(-1)} />
      <Form
        form={form}
        layout="vertical"
        initialValues={defaultValues}
        onFinish={onSubmit}
        className='flex flex-col gap-5'
      >
        <div className='flex flex-col gap-3'>
          <Text fontSize='lg' fontWeight='heavy' className='text-dark-green'>تاریخ مناسبت</Text>
          <Form.Item name="date" rules={[{ required: true, message: 'لطفا تاریخ مناسبت را وارد کنید' }]}>
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
          </Form.Item>
        </div>
        <div className='flex flex-col gap-3'>
          <Text fontSize='lg' fontWeight='heavy' className='text-dark-green'>توضیحات مناسبت</Text>
          <Form.Item name="text" rules={[{ required: true, message: 'لطفا توضیحات مناسبت را وارد کنید' }]}>
              <TextArea
                showCount
                maxLength={10000}
                rows={5}
                className='border-mid-green border-1 rounded-lg'
                placeholder="توضیحات مناسبت"
              />
          </Form.Item>
        </div>
        <div className='flex flex-col gap-3'>
            <Text fontSize='lg' fontWeight='heavy' className='text-dark-green'>فایل های مناسبت</Text>
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
          <Button type="primary" htmlType='submit' loading={putCalendar.isLoading} className='bg-dark-green flex items-center justify-center p-5'>
            <Text fontSize='lg' fontWeight='heavy'>
            ویراش کردن
            </Text>
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default EditCalendar;
