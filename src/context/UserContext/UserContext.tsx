import { createContext, useContext, useState, ReactNode } from 'react';
import { UserContextType } from './UserContext.types';

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [login, setLogin] = useState<string | null>(null);

  return <UserContext.Provider value={{ login, setLogin }}>{children}</UserContext.Provider>;
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
