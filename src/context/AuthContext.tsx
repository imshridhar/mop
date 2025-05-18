import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';

// Define types for our user
interface User {
  id: string;
  name: string;
  email: string;
  role: 'owner' | 'supervisor' | 'worker' | 'client' | 'admin';
  avatar?: string;
}

// Define AuthContext interface
interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

// Mock users for demonstration
const mockUsers = [
  {
    id: '1',
    name: 'Anil Kumar',
    email: 'anil@example.com',
    password: 'password123',
    role: 'owner' as const,
    avatar: 'https://i.pravatar.cc/150?img=11'
  },
  {
    id: '2',
    name: 'Priya Sharma',
    email: 'priya@example.com',
    password: 'password123',
    role: 'supervisor' as const,
    avatar: 'https://i.pravatar.cc/150?img=5'
  },
  {
    id: '3',
    name: 'Rajesh Verma',
    email: 'rajesh@example.com',
    password: 'password123',
    role: 'worker' as const,
    avatar: 'https://i.pravatar.cc/150?img=12'
  },
  {
    id: '4',
    name: 'Tata Motors Ltd.',
    email: 'client@tata.com',
    password: 'password123',
    role: 'client' as const,
    avatar: 'https://i.pravatar.cc/150?img=15'
  }
];

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export const AuthProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const storedUser = localStorage.getItem('mop_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('mop_user');
      }
    }
    setLoading(false);
  }, []);

  // Redirect to appropriate dashboard based on role
  useEffect(() => {
    if (!loading && !user && location.pathname !== '/login') {
      navigate('/login');
    } else if (user) {
      // Redirect to role-specific dashboard if at root
      if (location.pathname === '/') {
        switch (user.role) {
          case 'worker':
            navigate('/worker');
            break;
          case 'client':
            navigate('/client');
            break;
          // Owner, supervisor, and admin see the main dashboard
          default:
            break;
        }
      }
    }
  }, [user, loading, navigate, location.pathname]);

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Find user with matching credentials
    const foundUser = mockUsers.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      // Remove password from user object before storing
      const { password, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('mop_user', JSON.stringify(userWithoutPassword));
      toast.success(`Welcome back, ${foundUser.name}!`);
      setLoading(false);
      
      // Redirect based on role
      switch (foundUser.role) {
        case 'worker':
          navigate('/worker');
          break;
        case 'client':
          navigate('/client');
          break;
        default:
          navigate('/');
      }
      
      return true;
    } else {
      toast.error('Invalid email or password');
      setLoading(false);
      return false;
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('mop_user');
    toast.success('Logged out successfully');
    navigate('/login');
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};