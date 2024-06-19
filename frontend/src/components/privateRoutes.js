import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import pages from '../pages/pages';

const PrivateRoute = ({ children, path }) => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn && path !== pages.routes.Signup) {
    return <Navigate to={pages.routes.Login} />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
