import React from 'react';
import { useRBAC } from '../rbac/RBACProvider';


const PermissionGuard = ({ permission, children }) => {
  const { hasPermission } = useRBAC();
  return hasPermission(permission)
    ? children
    : null;
};

export default PermissionGuard;
