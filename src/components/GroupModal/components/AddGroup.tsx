import React, { useEffect, useState } from 'react'
import { Button, Form, Input, Upload, UploadFile, UploadProps, message } from 'antd';
import Text from '../../Text';
import useAPI from '../../../hooks/useAPI';
import { InboxOutlined } from '@ant-design/icons';
import Dragger from 'antd/es/upload/Dragger';

type propsTypes = {
    section: 'research' | 'knowledge';
    onClose : () => void;
    isModalOpen: boolean;
    setState: React.Dispatch<React.SetStateAction<"ADD" | "EDIT" | "VIEW">>;
    refetch: () => void;
}

const AddGroup: React.FC<propsTypes> = ({ section, onClose, isModalOpen, setState, refetch }) => {
    const [file, setFile] = useState<any>()
    const [form] = Form.useForm();

    const addGroup = useAPI(section === 'knowledge'  ? '/group/knowledge' : '/group/research', 'post', {
        headers: { 'Content-Type': 'multipart/form-data', Accept: 'application/json' },
    })

    const props: UploadProps = {
        multiple: false,
        beforeUpload: (file) => {
            setFile(file)
            return false;
        },
        onRemove: (file: UploadFile) => {
            setFile(undefined);
        },
    };

    const onSubmit = async (values: any) => {
        try{
            await addGroup.mutateAsync({
                file: file,
                name: form.getFieldValue("name")
            })
            refetch()
            setState('VIEW')
            message.success('با موفقیت اضافه شد')
        }catch(err){
            //@ts-ignore
            message.error(err)
        }
    }

  return (
    <div className='flex flex-col gap-5 bg-gray-500 bg-opacity-20 rounded-lg p-5'>
        <div className='w-full flex items-center justify-start'>
            <Button type="primary" className='bg-blue-500' onClick={() => {setState('VIEW')}}>
                <Text fontSize='base' fontWeight='bold' className='text-white'>بازگشت</Text>
            </Button>
        </div>
        <Form
            form={form}
            layout="vertical"
            initialValues={{}}
            onFinish={onSubmit}
            className='flex flex-col gap-5'
        >
            <div className='flex flex-col gap-3'>
                <Text fontSize='lg' fontWeight='heavy' className='text-dark-green'>اسم گروه</Text>
                <Form.Item name="name" rules={[{ required: true, message: 'لطفا اسم گروه را وارد کنید' }]}>
                    <Input 
                        className="w-full border-gray-400 rounded-lg border-1"
                        placeholder="اسم گروه" 
                    />
                </Form.Item>
            </div>
            <div className='flex flex-col gap-3'>
                <Text fontSize='lg' fontWeight='heavy' className='text-dark-green'>عکس گروه</Text>
                <Form.Item name="file">
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
                <Button type="primary" htmlType='submit' loading={addGroup.isLoading} className='bg-green-500 flex items-center justify-center p-5'>
                    <Text fontSize='lg' fontWeight='heavy'>
                    اضافه کردن
                    </Text>
                </Button>
            </Form.Item>
        </Form>
    </div>
  )
}

export default AddGroup