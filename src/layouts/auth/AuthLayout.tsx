import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "@providers/AuthProvider";
import urls from "@routes/urls";
import Navbar from "@components/Navbar";
import { useStateContext } from "@providers/ContextProvider";
import { useEffect } from "react";


export default function AuthLayout() {
  const { token }: any = useAuth();
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
    <>
      {token ? (
        <Navigate to={urls.adminDashboard} />
      ) : (
        <>
          <section className="w-screen h-screen overflow-hidden">
            <Outlet />
          </section>
        </>
      )}
    </>
  );
}