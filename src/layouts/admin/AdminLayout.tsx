import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, Image } from 'antd';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import urls from '@routes/urls';
import { RxDashboard } from 'react-icons/rx';
import Text from '@components/Text';
import { IoCalendarOutline } from 'react-icons/io5';
import { useAuth } from '../../providers/AuthProvider';
import { LuSchool } from "react-icons/lu";
import Logo from '@assets/images/logo.png'
import { PiBooksLight } from "react-icons/pi";
import { PiNotePencilFill } from "react-icons/pi";
import { LuSearch } from "react-icons/lu";



const { Header, Sider, Content } = Layout;

const AdminLayout: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const { setToken }: any = useAuth()
    const navigate = useNavigate()
    const location = useLocation();

    

  return (
    <Layout className={`relative h-screen w-screen overflow-hidden`}>
        <Header className='bg-light-green relative flex items-center justify-between px-2 md:px-9'>
            <div className='max-h-10'>
                <img className='object-fill max-h-12' src={Logo} />
            </div>
            <Button className='bg-red-500 flex items-center justify-center' onClick={() => { setToken(undefined); navigate(urls.login)}}>
                <Text fontSize='base' fontWeight='normal' className='text-white'>خروج</Text>
            </Button>
        </Header>
        <Layout>
            <Sider className="bg-light-green  relative" trigger={null} collapsible collapsed={collapsed}>
                <Menu
                    className="bg-light-green h-full"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    selectedKeys={['/' + location.pathname.split('/').slice(1,3).join('/')]}
                    items={[
                        {
                            key: urls.adminDashboard,
                            icon: <RxDashboard />,
                            label: <Text>داشبورد</Text>,
                            onClick: () => navigate(urls.adminDashboard),
                        },
                        {
                            key: urls.adminResearch,
                            icon: <LuSearch />,
                            label: <Text>پژوهشنامه</Text>,
                            onClick: () => navigate(urls.adminResearch)
                        },
                        {
                            key: urls.adminKnowledge,
                            icon: <PiNotePencilFill />,
                            label: <Text>دانشنامه</Text>,
                            onClick: () => navigate(urls.adminKnowledge)
                        },
                        {
                            key: urls.adminLibrary,
                            icon: <PiBooksLight />,
                            label: <Text>کتابخانه</Text>,
                            onClick: () => navigate(urls.adminLibrary)
                        },
                        {
                            key: urls.adminCalendar,
                            icon: <IoCalendarOutline />,
                            label: <Text>تقویم مقاومت</Text>,
                            onClick: () => navigate(urls.adminCalendar)
                        },
                        {
                            key: urls.adminSchool,
                            icon: <LuSchool />,
                            label: <Text>مدرسه مقاومت</Text>,
                            onClick: () => navigate(urls.adminLibrary)
                        },
                    ]}
                />
                <div
                    className='absolute -left-[45px] top-32 z-50 bg-white hover:bg-opacity-100 border border-r-0 border-solid border-gray-200 rounded-l-md flex items-center justify-center cursor-pointer'
                    onClick={() => setCollapsed(!collapsed)}
                    style={{
                        fontSize: 16,
                        width: 45,
                        height: 45,
                    }}
                >
                    {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                </div>
            </Sider>
            <Layout className='bg-white w-full h-full p-5'>
                <Content className="bg-light-green w-full rounded-lg">
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    </Layout>
  );
};

export default AdminLayout;


