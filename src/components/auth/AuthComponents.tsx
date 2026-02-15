import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Import useAuth

interface AuthRouteProps {
  redirectPath?: string;
  children?: React.ReactNode;
}

// ProtectedRoute ensures only logged-in users can access certain routes
export function ProtectedRoute({ redirectPath = '/login', children }: AuthRouteProps) {
  const { isLoggedIn } = useAuth(); // Get isLoggedIn from context
  if (!isLoggedIn) {
    return <Navigate to={redirectPath} replace />;
  }
  return children ? children : <Outlet />;
}

// AuthRedirect ensures logged-in users cannot access auth pages (login, register, forgot password)
export function AuthRedirect({ redirectPath = '/', children }: AuthRouteProps) {
  const { isLoggedIn } = useAuth(); // Get isLoggedIn from context
  if (isLoggedIn) {
    return <Navigate to={redirectPath} replace />;
  }
  return children ? children : <Outlet />;
}
