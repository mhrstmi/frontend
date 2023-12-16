import { Button, Layout } from 'antd'
import { Footer, Header } from 'antd/es/layout/layout'
import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { Text } from '../../components'
import Inog from '@assets/images/in-the-name-of-god.png'
import { PhoneOutlined } from '@ant-design/icons'
import urls from '../../routes/urls'

const BaseLayout = () => {
  const navigate = useNavigate()
  
  return (
    <Layout className='overflow-x-hidden'>
      <Header className=' bg-light-green flex items-center justify-center p-3 h-20'>
        <div className='w-2/3 grid grid-cols-3'>
          <div className='flex items-center justify-start'>
            <Button className='bg-mid-green w-fit' onClick={() => navigate(urls.login)}>
              <Text fontSize='base' fontWeight='normal' className='text-white'>ورود</Text>
            </Button>
          </div>
          <div className='flex justify-center items-center rounded-lg'>
            <div className='w-fit max-h-[70px] rounded-r-md rounded-se-[100px] bg-black flex justify-center items-center bg-opacity-30'>
              <img className='w-2/3 object-fill' src={Inog} /> 
            </div>  
          </div>
          <div dir="ltr" className='flex items-center gap-3' >
            <PhoneOutlined className='mb-2 text-lg text-blue-500' />
            <Text fontSize='sm' fontWeight='heavy' className='text-dark-green flex items-center'>+98 903-786-543</Text>
          </div>
        </div>
      </Header>
      <Layout>
        <Outlet />
      </Layout>
      {/* <Footer>
        hi
      </Footer> */}
    </Layout>
  )
}

export default BaseLayout