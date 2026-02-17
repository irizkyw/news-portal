import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { User as AuthUser } from '../../types';
import { getUser } from '../../services/api'; // Import getUser API

// Define the shape of the authentication context
interface AuthContextType {
  isLoggedIn: boolean;
  user: AuthUser | null;
  isLoading: boolean; // Add isLoading to the context type
  login: (token: string, user: AuthUser) => void;
  logout: () => void;
  refreshUser: () => Promise<void>; // Make refreshUser asynchronous
}

// Create the context with default (empty) values
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider component to wrap the application and provide the context
export function AuthContextProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Add isLoading state

  // Function to refresh user data from API and localStorage
  const refreshUser = async () => {
    if (!user?.id) { // Cannot refresh if user id is not available
      console.warn("Attempted to refresh user without a valid user ID.");
      return;
    }
    try {
      const fetchedUser = await getUser(user.id);
      console.log("Fetched user data in refreshUser:", fetchedUser); // Diagnostic log
      localStorage.setItem('authUser', JSON.stringify(fetchedUser));
      setUser(fetchedUser);
    } catch (e) {
      console.error("Failed to fetch user data during refresh:", e);
      // Optionally, logout user if refresh fails due to auth issues
      // logout();
    }
  };

  // On initial load, check for an existing token and user data in localStorage
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const storedUser = localStorage.getItem('authUser');
    try {
      if (token && storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setIsLoggedIn(true);
        setUser(parsedUser);
        // Attempt to refresh user data from API after initial load
        // This makes sure the data is always fresh, not just from local storage
        getUser(parsedUser.id).then(fetchedUser => {
          localStorage.setItem('authUser', JSON.stringify(fetchedUser));
          setUser(fetchedUser);
        }).catch(e => console.error("Failed to refresh user on initial load:", e));

      }
    } catch (e) {
      console.error("Failed to parse stored user data from localStorage:", e);
      // Clear invalid data
      localStorage.removeItem('authToken');
      localStorage.removeItem('authUser');
      setIsLoggedIn(false);
      setUser(null);
    } finally {
      setIsLoading(false); // Set loading to false after checking
    }
  }, []);

  // Function to handle user login
  const login = (token: string, userData: AuthUser) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('authUser', JSON.stringify(userData));
    setIsLoggedIn(true);
    setUser(userData);
  };

  // Function to handle user logout
  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');
    setIsLoggedIn(false);
    setUser(null);
  };
  
  // The value that will be supplied to any consumer of the context
  const contextValue: AuthContextType = {
    isLoggedIn,
    user,
    isLoading, // Expose isLoading
    login,
    logout,
    refreshUser, // Expose refreshUser
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to consume the AuthContext
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthContextProvider');
  }
  return context;
}
