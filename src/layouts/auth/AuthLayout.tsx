import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider";


export default function AuthLayout() {
  const { token }: any = useAuth();

  return (
    <>
      {token ? (
        <Navigate to="/" />
      ) : (
        <>
          <section className="flex flex-1 justify-center items-center flex-col py-10">
            <Outlet />
          </section>
        </>
      )}
    </>
  );
}