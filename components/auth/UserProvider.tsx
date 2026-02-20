import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useLogto } from '@logto/rn';
import { useAuthenticatedFetch } from '../../utils/api';
import { API_BASE } from '../../utils/settings';

interface UserContextType {
  user: any;
  loading: boolean;
}

interface UserProviderProps {
  children: ReactNode;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { isAuthenticated } = useLogto();
  const authFetch = useAuthenticatedFetch();

  useEffect(() => {
    if (!isAuthenticated) {
      setLoading(false);
      return;
    }

    const getMe = async () => {
      try {
        const res = await authFetch(`${API_BASE}/v1/users/[me]`);
        const json = await res.json();
        setUser(json.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    getMe();
  }, [isAuthenticated]);

  return (
    <UserContext.Provider value={{ user, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};