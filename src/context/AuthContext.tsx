import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import { authStorage } from '../utils/storage';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  demoLogin: () => Promise<void>;
  register: (email: string, password: string, businessName: string, ownerName: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const currentUser = authStorage.getCurrentUser();
    setUser(currentUser);
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const loggedInUser = await authStorage.login(email, password);
    setUser(loggedInUser);
  };

  const demoLogin = async () => {
    const demoUser = await authStorage.demoLogin();
    setUser(demoUser);
  };

  const register = async (email: string, password: string, businessName: string, ownerName: string) => {
    const newUser = await authStorage.register(email, password, businessName, ownerName);
    setUser(newUser);
  };

  const logout = () => {
    authStorage.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, demoLogin, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
