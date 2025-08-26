import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import api from '@/lib/api'

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}


export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Verificar localStorage ao inicializar
  useEffect(() => {
    const checkAuthStatus = () => {
      try {
        const storedUser = localStorage.getItem('admin_user');
        const storedAuth = localStorage.getItem('admin_auth');
        
        if (storedUser && storedAuth === 'true') {
          setUser(JSON.parse(storedUser));
          setIsAuthenticated(true);
        }
      } catch (e) {
        localStorage.removeItem('admin_user');
        localStorage.removeItem('admin_auth');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      const { data } = await api.post('/auth/login', { email, password })
      if (data) {
        const userData = { 
          id: data.id, 
          name: data.fullname ?? data.name ?? 'Admin', 
          email: data.email, 
          role: data.role?.name || 'ADMIN', 
          avatar: data.avatar 
        };
        
        // Salvar no localStorage
        localStorage.setItem('admin_user', JSON.stringify(userData));
        localStorage.setItem('admin_auth', 'true');
        
        setIsAuthenticated(true);
        setUser(userData);
        return true;
      }
      return false
    } catch (error) {
      console.error('Erro no login:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    // Limpar localStorage
    localStorage.removeItem('admin_user');
    localStorage.removeItem('admin_auth');
    
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};