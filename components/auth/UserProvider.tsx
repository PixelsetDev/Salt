import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { LogtoClient, useLogto } from '@logto/rn';
import { useApiCall } from '../../utils/api';
import { API_BASE } from '../../utils/settings';

interface UserContextType {
  user: {
    username: string;
    name: string;
    email: string;
    uuid: string;
  };
  loading: boolean;
  logto: {
    client: LogtoClient;
    isAuthenticated: boolean;
    getAccessToken: Function;
    getIdToken: Function;
  };
}

interface UserProviderProps {
  children: ReactNode;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: UserProviderProps) => {
  const logto = useLogto();
  const { isAuthenticated } = logto;

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const apiCall = useApiCall();

  useEffect(() => {
    if (!isAuthenticated) {
      setLoading(false);
      return;
    }

    const getMe = async () => {
      try {
        const fetchUser = async () => {
          try {
            const res = await apiCall(`${API_BASE}/v1/users/[me]`, true); // true = requires auth
            if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

            const json = await res.json();
            setUser(json.data);
          } catch (err: any) {
            console.error(err);
          }
        };

        await fetchUser();
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