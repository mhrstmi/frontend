import React, { useEffect } from 'react'
import '@assets/styles/style.css';
import { useStateContext } from '../contexts/ContextProvider';
import { Footer, Navbar, Sidebar, ThemeSettings } from '../components';

const BaseLayout: React.FC<any> = ({children}) => {
    const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings }: any = useStateContext();

    useEffect(() => {
        const currentThemeColor = localStorage.getItem('colorMode');
        const currentThemeMode = localStorage.getItem('themeMode');
        if (currentThemeColor && currentThemeMode) {
        setCurrentColor(currentThemeColor);
        setCurrentMode(currentThemeMode);
        }
    }, []);
  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
        <div className="flex relative dark:bg-main-dark-bg">
            {activeMenu ? (
                <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
                    <Sidebar />
                </div>
            ) : (
                <div className="w-0 dark:bg-secondary-dark-bg">
                    <Sidebar />
                </div>
            )}
            <div
                className={
                    activeMenu
                    ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:mr-72 w-full  '
                    : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 '
                }
            >
                <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
                    <Navbar />
                </div>
                <div>
                    {themeSettings && (<ThemeSettings />)}
                    {children}
                </div>
                <Footer />
            </div>
        </div>
    </div>
  )
}

export default BaseLayout;