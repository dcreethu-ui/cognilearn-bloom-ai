import React, { createContext, useContext, useState, useEffect } from 'react';
import { Profile, UserRole } from '../types/database.types';

interface AuthContextType {
  user: Profile | null;
  role: UserRole;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, role?: UserRole) => Promise<void>;
  logout: () => void;
  switchRole: (newRole: UserRole) => void; // Provided for rapid testing of both Faculty & Student experiences
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Default mock profiles for immediate responsive development & verification
const MOCK_PROFILES: Record<UserRole, Profile> = {
  faculty: {
    id: 'f101-faculty-id',
    email: 'dr.sharma@university.edu',
    full_name: 'Dr. Aruna Sharma',
    role: 'faculty',
    avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256',
    department: 'Computer Science & Engineering',
    created_at: new Date().toISOString(),
  },
  student: {
    id: 's202-student-id',
    email: 'alex.rivera@student.edu',
    full_name: 'Alex Rivera',
    role: 'student',
    avatar_url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=256',
    department: 'Software Engineering (Year 3)',
    created_at: new Date().toISOString(),
  },
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole>(() => {
    const saved = localStorage.getItem('cognilearn_demo_role');
    return (saved as UserRole) || 'faculty';
  });

  const [user, setUser] = useState<Profile | null>(() => MOCK_PROFILES[role]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setUser(MOCK_PROFILES[role]);
    localStorage.setItem('cognilearn_demo_role', role);
  }, [role]);

  const login = async (email: string, selectedRole: UserRole = 'faculty') => {
    setIsLoading(true);
    try {
      setRole(selectedRole);
      setUser({
        ...MOCK_PROFILES[selectedRole],
        email,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
  };

  const switchRole = (newRole: UserRole) => {
    setRole(newRole);
    setUser(MOCK_PROFILES[newRole]);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role || role,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        switchRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
