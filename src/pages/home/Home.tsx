import React from 'react'
import urls from '../../routes/urls'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from 'antd'

const Home = () => {
  const navigate = useNavigate()
  return (
    <div className='h-screen w-screen flex justify-center items-center gap-5'>
      <Button className='bg-blue-500 text-white' onClick={() => navigate(urls.login)}>صفحه ورود به داشبورد</Button>
      <Button className='bg-red-500 text-white' onClick={() => navigate(urls.adminDashboard)}>صفحه داشبورد ادمین</Button>
    </div>
  )
}

export default Home