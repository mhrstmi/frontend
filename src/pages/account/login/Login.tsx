import React from 'react';
import { Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import urls from '@routes/urls';
import { useAuth } from '@providers/AuthProvider';
import useAPI from '@hooks/useAPI';
import { Text } from '../../../components';
import Soleymani from '@assets/images/soleymani.jpg'



const Login: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate()
  const { setToken }: any = useAuth()

  const loginRequest = useAPI("/admin/login", "post", {})

  const onFinish = async (values) => {
    try {
      // const res = await loginRequest.mutateAsync({
      //   userName: form.getFieldValue("userName"),
      //   password: form.getFieldValue("password")
      // })

      // setToken(res.token)
      navigate(urls.adminDashboard)
    } catch(err) {
      console.log(err)
    }
  }

  return (
      <Form
        form={form}
        name="login"
        initialValues={{}}
        onFinish={onFinish}
      >
        <section className="bg-gray-200 min-h-screen flex items-center justify-center">
          <div className="bg-light-green flex rounded-2xl shadow-lg max-w-5xl p-5 items-center">
            <div className="md:w-1/2 px-8 md:px-16">
              <div className='flex flex-col gap-2'>
                <div className='flex items-center justify-between'>
                  <Text className="text-dark-green" fontSize='2xl' fontWeight='bold'>ورود</Text>
                  <Button onClick={() => navigate(urls.home)} type="primary" className="bg-mid-green text-white hover:scale-105 duration-300">
                    <Text fontSize='base' fontWeight='medium' color="white">بازگشت</Text>
                  </Button>
                </div>
                <Text className="mt-4 text-dark-green" fontSize='xs'>برای ورود به داشبورد ادمین نام کاربری و رمزعبور خود را وارد کنید</Text>
              </div>
              <div className="flex flex-col gap-4">
                <Form.Item
                  name="userName"
                  rules={[{ required: true, message: <Text fontSize='sm' fontWeight='normal'>لطفا نام کاربری خود را وارد کنید</Text> }]}
                >
                  <Input 
                    className="p-2 mt-8 rounded-lg border border-solid border-mid-green" 
                    type="text" 
                    placeholder="نام کاربری"
                    size='large'
                  />
                </Form.Item>
                <div className="relative">
                  <Form.Item
                    name="password"
                    rules={[{ required: true, message: <Text fontSize='sm' fontWeight='normal'>لطفا رمزعبور خود را وارد کنید</Text> }]}
                  >
                    <Input
                      className="p-2 rounded-lg w-full border border-solid border-mid-green" 
                      type="password" 
                      placeholder="رمزعبور"
                      size='large'
                    />
                  </Form.Item>
                </div>
                <Form.Item>
                   <Button 
                     type="primary" 
                     size='large'
                     htmlType="submit" 
                     className="w-full bg-mid-green rounded-xl text-white py-2 hover:scale-105 duration-300"
                   >
                     <Text fontSize='lg' fontWeight='medium'>
                        ورود
                     </Text>
                   </Button>
                 </Form.Item>
              </div>

              <div className="mt-6 grid grid-cols-3 items-center text-gray-400">
                <hr className="border-gray-400" />
                <Text className="text-center" fontSize='sm'>ورود به داشبورد ادمین</Text>
                <hr className="border-gray-400"/>
              </div>
            </div>

            <div className="md:block hidden w-1/2">
              <img className="rounded-2xl" src={Soleymani} />
            </div>
          </div>
        </section>
    </Form>
  );
};

export default Login;