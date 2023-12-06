import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';
import urls from './urls';


type propsTypes = {
  isPublic?: boolean | undefined;
}

const ProtectedRoute: React.FC<propsTypes> = ({ isPublic }) => {
  const { token }: any = useAuth();
  return (isPublic || true) ? <Outlet /> : <Navigate to={urls.login} />
}

export default ProtectedRoute;