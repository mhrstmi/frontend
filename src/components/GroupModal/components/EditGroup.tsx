import React, { useEffect, useState } from 'react'
import { groupType } from '../GroupModal';
import { Button, Form, Input, UploadFile, UploadProps, message } from 'antd';
import Text from '../../Text';
import useAPI from '../../../hooks/useAPI';
import { InboxOutlined } from '@ant-design/icons';
import Dragger from 'antd/es/upload/Dragger';
import { MdDelete } from "react-icons/md";


type propsTypes = {
    section: 'research' | 'knowledge';
    onClose : () => void;
    isModalOpen: boolean;
    setState: React.Dispatch<React.SetStateAction<"ADD" | "EDIT" | "VIEW">>;
    group: groupType | undefined;
    setGroup: React.Dispatch<React.SetStateAction<groupType | undefined>>;
    refetch: () => void;
}

const EditGroup: React.FC<propsTypes> = ({ section, onClose, isModalOpen, setState, group, refetch, setGroup }) => {
    const [defaultValues, setDefaultValues] = useState({})
    const [file, setFile] = useState<any>()
    const [form] = Form.useForm();

    const editGroup = useAPI(section === 'knowledge'  ? '/group/knowledge/{id}' : '/group/research/{id}', 'patch', {
        headers: { 'Content-Type': 'multipart/form-data', Accept: 'application/json' },
        param: {
            id: group?.id ? group.id : 0
        }
    })

    const getKnowledge = useAPI(section === 'knowledge'  ? '/knowledge' : '/research', 'get', {})

    useEffect(() => {
        if (group) { 
          setDefaultValues({
            name: group?.name,
          })

          setFile({
            name: group.fileName,
            fileName: group.fileName,
            url: group.path,
          } as UploadFile)
          form.setFieldValue("name", group?.name)
        }
    }, [group])

    const props: UploadProps = {
        multiple: false,
        fileList: file ? [file as UploadFile] : undefined,
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
            await editGroup.mutateAsync({
                //@ts-ignore
                "file[]": [file],
                name: form.getFieldValue("name")
            })
            refetch()
            getKnowledge.refetch()
            setGroup(undefined)
            setState('VIEW')
            message.success('با موفقیت ویرایش شد')
        }catch(err){
            //@ts-ignore
            message.error(err)
        }
    }

    const deleteGroup = useAPI(section === 'knowledge'  ? '/group/knowledge/{id}' : '/group/research/{id}', 'delete', {
        param: {
            id: group?.id ? group.id : 0
        }
    })
     
    const handleDelete = async () => {
        try{
            await deleteGroup.mutateAsync({})
            refetch()
            getKnowledge.refetch()
            setGroup(undefined)
            setState('VIEW')
            message.success('با موفقیت حذف شد')
        }catch(err){
            //@ts-ignore
            message.error(err)
        }
    }

  return (
    <div className='flex flex-col gap-5 bg-gray-500 bg-opacity-20 rounded-lg p-5'>
        <div className='w-full flex items-center justify-start'>
            <Button type="primary" className='bg-blue-500' onClick={() => {setGroup(undefined); setState('VIEW')}}>
                <Text fontSize='base' fontWeight='bold' className='text-white'>بازگشت</Text>
            </Button>
        </div>
        <Form
            form={form}
            layout="vertical"
            initialValues={defaultValues}
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
                <div className='flex flex-col md:flex-row gap-3'>
                    <Button type="primary" htmlType='submit' loading={editGroup.isLoading} className='bg-green-500 w-full md:w-fit flex items-center justify-center p-5'>
                        <Text fontSize='lg' fontWeight='heavy'>
                        ویرایش کردن
                        </Text>
                    </Button>
                    <Button type="primary" onClick={handleDelete} loading={deleteGroup.isLoading} className='bg-red-500 text-white w-full md:w-fit flex items-center gap-2 p-5'>
                        <div className='flex items-center justify-center gap-2 w-full h-full'>
                            <MdDelete className='text-white' />
                            <Text fontSize='lg' fontWeight='heavy' className='text-white'>
                                حذف کردن
                            </Text>
                        </div>
                    </Button>
                </div>
            </Form.Item>
        </Form>
    </div>
  )
}

export default EditGroup