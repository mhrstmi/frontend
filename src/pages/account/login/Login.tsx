import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import urls from '@routes/urls';
import { useAuth } from '@providers/AuthProvider';
import useAPI from '@hooks/useAPI';

const Login: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate()
  const { setToken }: any = useAuth()

  const loginRequest = useAPI("/admin/login", "post", {})

  const onFinish = async (values) => {
    try {
      const res = await loginRequest.mutateAsync({
        userName: form.getFieldValue("username"),
        password: form.getFieldValue("password")
      })

      setToken(res.token)
      navigate(urls.adminHome)
    } catch(err) {
      console.log(err)
    }
  }

  return (
    <Form
      form={form}
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: 'Please input your Username!' }]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
        </Form.Item>

      <Form.Item>
        <Button type="default" htmlType="submit" className="login-form-button">
          Log in
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Login;