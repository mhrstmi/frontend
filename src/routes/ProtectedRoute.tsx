import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

type propsTypes = {
  isPublic?: boolean | undefined;
  isAuthorized: boolean;
}

const ProtectedRoute: React.FC<propsTypes> = ({ isPublic, isAuthorized }) => {
  return (isPublic || isAuthorized) ? <Outlet /> : <Navigate to='/login' />
}

export default ProtectedRoute;