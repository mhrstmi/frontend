import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { links } from './links';
import { useStateContext } from '@providers/ContextProvider';
import urls from '@routes/urls';
import { GrUserAdmin } from "react-icons/gr";
import Text from '../Text';


const Sidebar = () => {
  const { currentColor, activeMenu, setActiveMenu, screenSize }: any = useStateContext();

  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  const activeLink = 'flex items-center gap-5 pr-4 pt-3 pb-2.5 rounded-lg  text-white  text-md m-2';
  const normalLink = 'flex items-center gap-5 pr-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2';

  return (
    <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      {activeMenu && (
        <>
          <div className="flex justify-between items-center">
            <Link to={urls.adminDashboard} onClick={handleCloseSideBar} className="items-center gap-3 mr-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900">
              <GrUserAdmin className='text-2xl font-black mb-2' /> <Text fontSize='2xl' fontWeight='black'>داشبورد ادمین</Text>
            </Link>
          </div>
          <div className="mt-10 ">
            {links.map((item) => (
              <div key={item.title}>
                <Text className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase" fontSize='xl' fontWeight='heavy'>
                  {item.title}
                </Text>
                {item.links.map((link) => (
                  <NavLink
                    to={`${link.link}`}
                    key={link.link}
                    onClick={handleCloseSideBar}
                    style={({ isActive }) => ({
                      backgroundColor: isActive ? currentColor : '',
                    })}
                    className={({ isActive }) => (isActive ? activeLink : normalLink)}
                  >
                    {link.icon}
                    <Text className="capitalize " fontSize='lg' fontWeight='medium'>{link.name}</Text>
                  </NavLink>
                ))}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
