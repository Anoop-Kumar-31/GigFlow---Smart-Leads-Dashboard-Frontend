import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth.store';
import { UserRole } from '../types/user.types';

interface RoleGuardProps {
  allowedRoles: UserRole[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const RoleGuard: React.FC<RoleGuardProps> = ({
  allowedRoles,
  children,
  fallback,
}) => {
  const { user } = useAuthStore();

  if (!user || !allowedRoles.includes(user.role)) {
    return fallback ? <>{fallback}</> : <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};
