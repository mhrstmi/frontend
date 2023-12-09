// import React, { useEffect } from 'react'
// import '@assets/styles/style.css';
// import { FiSettings } from 'react-icons/fi';
// import { useStateContext } from '../../providers/ContextProvider';
// import { Footer, Navbar, Sidebar, ThemeSettings } from '../../components';
// import { Outlet } from 'react-router-dom';

// const AdminLayout: React.FC<any> = () => {
//     const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings }: any = useStateContext();

    // useEffect(() => {
    //     const currentThemeColor = localStorage.getItem('colorMode');
    //     const currentThemeMode = localStorage.getItem('themeMode');
    //     if (currentThemeColor && currentThemeMode) {
    //     setCurrentColor(currentThemeColor);
    //     setCurrentMode(currentThemeMode);
    //     }
    // }, []);
//   return (
//     <div className={currentMode === 'Dark' ? 'dark' : ''}>
//         <div className="flex relative dark:bg-main-dark-bg">
            // <div className="fixed left-4 bottom-4" style={{ zIndex: '1000' }}>
            //     <button
            //         type="button"
            //         onClick={() => setThemeSettings(true)}
            //         style={{ background: currentColor, borderRadius: '50%' }}
            //         className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
            //     >
            //         <FiSettings />
            //     </button>
            // </div>
//             {activeMenu ? (
//                 <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
//                     <Sidebar />
//                 </div>
//             ) : (
//                 <div className="w-0 dark:bg-secondary-dark-bg">
//                     <Sidebar />
//                 </div>
//             )}
//             <div
//                 className={
//                     activeMenu
//                     ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:mr-72 w-full  '
//                     : 'bg-main-bg dark:bg-main-dark-bg w-full min-h-screen flex-2 '
//                 }
//             >
//                 <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
//                     <Navbar />
//                 </div>
//                 <div>
//                     {themeSettings && (<ThemeSettings />)}
//                     <Outlet />
//                 </div>
//                 {/* <Footer /> */}
//             </div>
//         </div>
//     </div>
//   )
// }

// export default AdminLayout;

import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import urls from '@routes/urls';
import { RxDashboard } from 'react-icons/rx';
import { GiArchiveResearch, GiBookshelf, GiNotebook } from 'react-icons/gi';
import Text from '@components/Text';
import { IoCalendarOutline } from 'react-icons/io5';
import { useStateContext } from '@providers/ContextProvider';
import { MdKeyboardArrowDown } from 'react-icons/md';
import UserProfile from '@components/UserProfile';
import AdminPng from '@assets/images/admin-profile.png'



const { Header, Sider, Content } = Layout;

const AdminLayout: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const navigate = useNavigate()

    const { 
        handleClick,
        isClicked
    }: any = useStateContext();
    

  return (
    <Layout className={`relative h-screen w-screen overflow-hidden`}>
        <Header style={{ background: colorBgContainer }} className='bg-white relative flex items-center justify-end px-9'>
            <div className="flex gap-10">
                <div
                    className="flex items-center gap-2 cursor-pointer rounded-lg"
                    onClick={() => handleClick('userProfile')}
                >
                <img
                    className="rounded-full w-8 h-8"
                    src={AdminPng}
                    alt="user-profile"
                />
                <p>
                    <span className="text-gray-400 font-bold ml-1 text-14">
                    پروفایل ادمین
                    </span>
                </p>
                <MdKeyboardArrowDown className="text-gray-400 text-14" />
                </div>

                {isClicked.userProfile && (<UserProfile />)}
            </div>
        </Header>
        <Layout>
            <Sider className="bg-white relative" trigger={null} collapsible collapsed={collapsed}>
                <Menu
                    className="bg-white h-full"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={[
                        {
                            key: '1',
                            icon: <RxDashboard />,
                            label: <Text>داشبورد</Text>,
                            onClick: () => navigate(urls.adminDashboard)
                        },
                        {
                            key: '2',
                            icon: <GiNotebook />,
                            label: <Text>دانشنامه</Text>,
                            onClick: () => navigate(urls.adminKnowledge)
                        },
                        {
                            key: '3',
                            icon: <GiArchiveResearch />,
                            label: <Text>پژوهشنامه</Text>,
                            onClick: () => navigate(urls.adminResearch)
                        },
                        {
                            key: '4',
                            icon: <GiBookshelf />,
                            label: <Text>کتابخانه</Text>,
                            onClick: () => navigate(urls.adminLibrary)
                        },
                        {
                            key: '5',
                            icon: <IoCalendarOutline />,
                            label: <Text>تقویم مقاومت</Text>,
                            onClick: () => navigate(urls.adminLibrary)
                        },
                    ]}
                />
                <div
                    className='absolute -left-[45px] top-20 bg-white hover:bg-opacity-100 border border-r-0 border-solid border-gray-200 rounded-l-md flex items-center justify-center cursor-pointer'
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
            <Layout className='bg-gray-200'>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        borderRadius: 20,
                        background: colorBgContainer,
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    </Layout>
  );
};

export default AdminLayout;


