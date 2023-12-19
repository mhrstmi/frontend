import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, Image } from 'antd';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import urls from '@routes/urls';
import { RxDashboard } from 'react-icons/rx';
import { GiArchiveResearch, GiBookshelf, GiNotebook } from 'react-icons/gi';
import Text from '@components/Text';
import { IoCalendarOutline } from 'react-icons/io5';
import { MdKeyboardArrowDown } from 'react-icons/md';
import SoldierCloth from '@assets/images/soldier-cloth.png'
import { useAuth } from '../../providers/AuthProvider';




const { Header, Sider, Content } = Layout;

const AdminLayout: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const { setToken }: any = useAuth()
    const navigate = useNavigate()
    const location = useLocation();

    

  return (
    <Layout className={`relative h-screen w-screen overflow-hidden`}>
        <Header className='bg-light-green relative flex items-center justify-between px-2 md:px-9'>
            <Image
                width={70}
                height={35}
                preview={false}
                className='rounded-lg w-full h-full'
                src={SoldierCloth}
            />
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
                            icon: <GiArchiveResearch />,
                            label: <Text>پژوهشنامه</Text>,
                            onClick: () => navigate(urls.adminResearch)
                        },
                        {
                            key: urls.adminKnowledge,
                            icon: <GiNotebook />,
                            label: <Text>دانشنامه</Text>,
                            onClick: () => navigate(urls.adminKnowledge)
                        },
                        {
                            key: urls.adminLibrary,
                            icon: <GiBookshelf />,
                            label: <Text>کتابخانه</Text>,
                            onClick: () => navigate(urls.adminLibrary)
                        },
                        {
                            key: urls.adminLibrary,
                            icon: <IoCalendarOutline />,
                            label: <Text>تقویم مقاومت</Text>,
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


