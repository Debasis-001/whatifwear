"use client";

import { createContext, useContext, useEffect, useState } from "react";

type User = {
  id: string;
  email: string;
  name: string;
  avatar?: string;
};

type AuthContextValue = {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<boolean>;
  logout: () => void;
  register: (email: string, password: string, name: string) => Promise<boolean>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

const AUTH_STORAGE_KEY = "whatifwear-auth";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Hydrate from localStorage after mount
  useEffect(() => {
    const savedAuth = localStorage.getItem(AUTH_STORAGE_KEY);
    if (savedAuth) {
      try {
        setUser(JSON.parse(savedAuth) as User);
      } catch {
        // Invalid data
      }
    }
    setIsLoading(false);
  }, []);

  // Persist auth to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }, [user]);

  const login = async (email: string, _password: string): Promise<boolean> => {
    // Mock login - in production, this would call an API
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    const mockUser: User = {
      id: "user-1",
      email,
      name: email.split("@")[0],
    };
    
    setUser(mockUser);
    setIsLoading(false);
    return true;
  };

  const loginWithGoogle = async (): Promise<boolean> => {
    // Mock Google login - in production, this would use OAuth
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    const mockUser: User = {
      id: "google-user-1",
      email: "user@gmail.com",
      name: "Google User",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    };
    
    setUser(mockUser);
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  const register = async (email: string, _password: string, name: string): Promise<boolean> => {
    // Mock registration - in production, this would call an API
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    const mockUser: User = {
      id: "user-" + Date.now(),
      email,
      name,
    };
    
    setUser(mockUser);
    setIsLoading(false);
    return true;
  };

  const value: AuthContextValue = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    loginWithGoogle,
    logout,
    register,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
