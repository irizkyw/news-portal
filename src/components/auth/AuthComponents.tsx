import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface AuthRouteProps {
  isLoggedIn: boolean;
  redirectPath?: string;
  children?: React.ReactNode;
}

// ProtectedRoute ensures only logged-in users can access certain routes
export function ProtectedRoute({ isLoggedIn, redirectPath = '/login', children }: AuthRouteProps) {
  if (!isLoggedIn) {
    return <Navigate to={redirectPath} replace />;
  }
  return children ? children : <Outlet />;
}

// AuthRedirect ensures logged-in users cannot access auth pages (login, register, forgot password)
export function AuthRedirect({ isLoggedIn, redirectPath = '/', children }: AuthRouteProps) {
  if (isLoggedIn) {
    return <Navigate to={redirectPath} replace />;
  }
  return children ? children : <Outlet />;
}
