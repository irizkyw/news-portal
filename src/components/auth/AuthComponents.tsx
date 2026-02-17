import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Import useAuth

interface AuthRouteProps {
  redirectPath?: string;
  unauthorizedRedirectPath?: string; // New: for role-based redirection
  allowedRoles?: string[]; // New: for role-based access control
  children?: React.ReactNode;
}

// ProtectedRoute ensures only logged-in users can access certain routes
export function ProtectedRoute({ redirectPath = '/login', unauthorizedRedirectPath = '/', allowedRoles, children }: AuthRouteProps) {
  const { isLoggedIn, user, isLoading } = useAuth(); // Get isLoading, isLoggedIn and user from context

  if (isLoading) {
    // You can return a loading spinner or a blank page here
    return <div>Loading...</div>; 
  }

  if (!isLoggedIn) {
    return <Navigate to={redirectPath} replace />;
  }

  // If roles are specified, check if the user's role is allowed
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to={unauthorizedRedirectPath} replace />;
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
