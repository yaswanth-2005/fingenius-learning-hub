
import React, { useEffect } from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { toast } from 'sonner';

const ProtectedRoute = () => {
  const location = useLocation();
  
  // Check if user is authenticated
  const isAuthenticated = () => {
    const userData = localStorage.getItem('user');
    if (!userData) return false;
    
    try {
      const user = JSON.parse(userData);
      return user && user.isAuthenticated;
    } catch (error) {
      return false;
    }
  };
  
  useEffect(() => {
    if (!isAuthenticated()) {
      toast.error('Please log in to continue');
    }
  }, []);

  if (!isAuthenticated()) {
    // Redirect to login page and save the location they were trying to access
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If authenticated, render the child routes
  return <Outlet />;
};

export default ProtectedRoute;
