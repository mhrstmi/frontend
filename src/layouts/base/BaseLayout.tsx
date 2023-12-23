import { Button, Layout } from 'antd'
import { Footer, Header } from 'antd/es/layout/layout'
import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { Text } from '../../components'
import Inog from '@assets/images/in-the-name-of-god.png'
import Logo from '@assets/images/logo.png'
import urls from '../../routes/urls'

const BaseLayout = () => {
  const navigate = useNavigate()
  
  return (
    <Layout dir="rtl" className='overflow-x-hidden bg-light-green min-h-screen'>
      <Header className='bg-transparent flex items-center justify-center px-5 py-2 md:px-5 md:py-2 h-fit'>
        <div className='w-full md:w-2/3 md:min-w-[768px] grid grid-cols-3'>
          <div className='flex items-center justify-start'>
            <Button className='bg-mid-green w-fit' onClick={() => navigate(urls.login)}>
              <Text fontSize='base' fontWeight='normal' className='text-white'>ورود</Text>
            </Button>
          </div>
          <div className='flex justify-center items-center rounded-lg'>
            <div className='w-fit max-h-[70px] rounded-r-md rounded-se-[100px] rounded-es-[100px] bg-black flex justify-center items-center bg-opacity-30'>
              <img className='w-2/3 object-fill' src={Inog} /> 
            </div>  
          </div>
          <div className='flex items-center justify-end' >
            <img className='max-h-[60px] object-fill' src={Logo} /> 
          </div>
        </div>
      </Header>
      <Layout dir="rtl" className='bg-light-green'>
        <Outlet />
      </Layout>
      {/* <Footer className='bg-transparent h-fit px-5 py-2 md:px-5 md:py-2 flex items-center justify-center'>
      </Footer> */}
    </Layout>
  )
}

export default BaseLayout