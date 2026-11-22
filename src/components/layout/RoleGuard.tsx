import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types/database.types';

interface RoleGuardProps {
  allowedRoles: UserRole[];
  children: React.ReactNode;
}

export const RoleGuard: React.FC<RoleGuardProps> = ({ allowedRoles, children }) => {
  const { role, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-sky-600 border-t-transparent" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(role)) {
    // If student tries to visit faculty routes, redirect to student dashboard, and vice-versa
    const redirectPath = role === 'faculty' ? '/faculty/dashboard' : '/student/dashboard';
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
};
