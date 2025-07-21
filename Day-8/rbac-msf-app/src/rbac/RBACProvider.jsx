import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { defaultPermissions } from './permissions';

const RBACContext = createContext();

export const RBACProvider = ({ children }) => {
  const { user } = useAuth();
  const [role, setRole] = useState(user?.role || null);
  const [permissions, setPermissions] = useState(user?.permissions || []);

  useEffect(() => {
    if (user) {
      setRole(user.role);
      setPermissions(defaultPermissions[user.role] || []);
    } else {
      setRole(null);
      setPermissions([]);
    }
  }, [user]);

  const hasPermission = (perm) => permissions.includes(perm);

  return (
    <RBACContext.Provider value={{ role, setRole, permissions, setPermissions, hasPermission }}>
      {children}
    </RBACContext.Provider>
  );
};

export const useRBAC = () => useContext(RBACContext);
