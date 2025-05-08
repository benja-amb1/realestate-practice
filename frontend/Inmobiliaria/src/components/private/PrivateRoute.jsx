import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';

const PrivateRoute = ({ Component }) => {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? <Component /> : <Navigate to="/" />;
};

export default PrivateRoute;

