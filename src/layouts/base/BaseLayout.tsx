import { Button, Layout, Menu } from 'antd'
import React, { useState } from 'react'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Footer, Text } from '../../components'
import Logo from '@assets/images/logo.png'
import urls from '../../routes/urls'
import { MenuOutlined } from '@ant-design/icons'
import { IoCalendarOutline } from 'react-icons/io5';
import { LuSchool } from "react-icons/lu";
import { IoHomeOutline } from "react-icons/io5";
import { PiBooksLight } from "react-icons/pi";
import { PiNotePencilFill } from "react-icons/pi";
import { LuSearch } from "react-icons/lu";
import { GiPrayerBeads } from "react-icons/gi";
import { TbMessageQuestion } from "react-icons/tb";
import { IoIosCloseCircleOutline } from "react-icons/io";



const { Header, Sider, Content } = Layout;

const BaseLayout = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const [collapsed, setCollapsed] = useState(true);
  const currentUrl = location.pathname
  
  return (
    <>
    <Layout dir="rtl" className='overflow-x-hidden bg-light-green min-h-screen'>
      <Header className="bg-transparent flex items-center justify-between px-5 py-2">
        <div onClick={() => navigate(urls.home)}>
            <img className="w-8 cursor-pointer" src={Logo} alt="..." />
        </div>
        <div className="items-center h-full gap-8 hidden lg:flex">
          <NavLink to={urls.home} title='صفحه اصلی'>
            <Text fontSize='base' fontWeight='bold' className={`${currentUrl === urls.home ? 'text-blue-500' : 'text-black'} `}>صفحه اصلی</Text>
          </NavLink>
          <NavLink to={urls.researchGroups}>
            <Text fontSize='base' fontWeight='bold' className={`${currentUrl === urls.research ? 'text-blue-500' : 'text-black'} `}>پژوهشنامه ها</Text>
          </NavLink>
          <NavLink to={urls.knowledgeGroups}>
            <Text fontSize='base' fontWeight='bold' className={`${currentUrl === urls.knowledge ? 'text-blue-500' : 'text-black'} `}>دانشنامه ها</Text>
          </NavLink>
          <NavLink to={urls.library}>
            <Text fontSize='base' fontWeight='bold' className={`${currentUrl === urls.library ? 'text-blue-500' : 'text-black'} `}>کتابخانه</Text>
          </NavLink>
          <NavLink to={urls.home}>
            <Text fontSize='base' fontWeight='bold' className={`${currentUrl === urls.adminCalendar ? 'text-blue-500' : 'text-black'} `}>زیارت مجازی</Text>
          </NavLink>
          <NavLink to={urls.home}>
            <Text fontSize='base' fontWeight='bold' className={`${currentUrl === urls.adminCalendar ? 'text-blue-500' : 'text-black'} `}>پرسمان و گفتگو</Text>
          </NavLink>
          <NavLink to={urls.home}>
            <Text fontSize='base' fontWeight='bold' className={`${currentUrl === urls.adminCalendar ? 'text-blue-500' : 'text-black'} `}>مدرسه مقاومت</Text>
          </NavLink>
        </div>
        <div className="flex items-center gap-6">
          <Button onClick={() => setCollapsed(!collapsed)} className='flex items-center justify-center p-0 m-0 border-none bg-transparent lg:hidden'>
            <MenuOutlined className="text-2xl text-blue-500 cursor-pointer"/>
          </Button>
          <Button onClick={() => navigate(urls.login)} className="bg-green-500 hover:bg-[#87acec]">
            <Text fontSize='base' fontWeight='normal' className='text-white h-fit'>ورود</Text>
          </Button>
        </div>
      </Header>
      <Layout className='relative'>
          <Content className="bg-light-green w-full rounded-lg">
              <Outlet />
          </Content>
        </Layout>
      {/* <Footer /> */}
    </Layout>

    <Sider className={`bg-light-green absolute lg:hidden right-0 top-0 h-full z-50 ${collapsed ? 'hidden' : 'block'}`} trigger={null} collapsible collapsed={false}>
      <div className="w-full flex justify-end items-center p-5">
          <IoIosCloseCircleOutline onClick={() => setCollapsed(!collapsed)} className="text-2xl text-red-500 cursor-pointer"/>
      </div>
      <Menu
          className="bg-light-green h-full"
          mode="inline"
          defaultSelectedKeys={['1']}
          selectedKeys={['/' + location.pathname.split('/').slice(1,3).join('/')]}
          items={[
              {
                  key: urls.home,
                  icon: <IoHomeOutline />,
                  label: <Text>صفحه اصلی</Text>,
                  onClick: () => navigate(urls.home),
              },
              {
                  key: urls.researchGroups,
                  icon: <LuSearch />,
                  label: <Text>پژوهشنامه</Text>,
                  onClick: () => navigate(urls.research)
              },
              {
                  key: urls.knowledgeGroups,
                  icon: <PiNotePencilFill />,
                  label: <Text>دانشنامه</Text>,
                  onClick: () => navigate(urls.knowledge)
              },
              {
                  key: urls.library,
                  icon: <PiBooksLight />,
                  label: <Text>کتابخانه</Text>,
                  onClick: () => navigate(urls.library)
              },
              {
                key: urls.adminCalendar,
                icon: <GiPrayerBeads />,
                label: <Text>زیارت مجازی</Text>,
                onClick: () => navigate(urls.adminLibrary)
              },
              {
                key: urls.adminCalendar,
                icon: <TbMessageQuestion />,
                label: <Text>پرسمان و گفتگو</Text>,
                onClick: () => navigate(urls.adminLibrary)
              },
              {
                  key: urls.adminSchool,
                  icon: <LuSchool />,
                  label: <Text>مدرسه مقاومت</Text>,
                  onClick: () => navigate(urls.adminLibrary)
              },
          ]}
      />
    </Sider>
</>
  )
}

export default BaseLayout