import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "@providers/AuthProvider";
import urls from "@routes/urls";
import { useEffect } from "react";


export default function AuthLayout() {
  const { token }: any = useAuth();

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