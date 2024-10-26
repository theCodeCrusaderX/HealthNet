import React from 'react';
// import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
  // Dynamically check if the user is authenticated
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated) || !!localStorage.getItem('accessToken')


  if (!isAuthenticated) {
    // Redirect to login page if not authenticated
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
