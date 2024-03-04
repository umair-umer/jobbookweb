import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ isAuthenticated }) => {
  // Assuming you have a way to check if the user is authenticated
  // This could be a check against local storage, context, or redux store
  if (!isAuthenticated) {
    // User not authenticated, redirect to login page
    return <Navigate to="/login" replace />;
  }

  // User authenticated, render child routes
  return <Outlet />;
};

export default ProtectedRoute;