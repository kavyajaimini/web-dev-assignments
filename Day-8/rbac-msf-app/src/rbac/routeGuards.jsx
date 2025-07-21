import React from 'react';
import { Navigate } from 'react-router-dom';
import { useRBAC } from './RBACProvider';

export const ProtectedRoute = ({ permission, children }) => {
  const { hasPermission } = useRBAC();
  if (!hasPermission(permission)) {
    return <Navigate to="/onboarding" replace />;
  }
  return children;
};
