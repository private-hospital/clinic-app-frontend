import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { JwtPayload } from '../types/jwt';
import { getTokenPayload } from '../service/authUtils';

export interface AuthContextType {
  tokenPayload: JwtPayload | null;
  setTokenPayload: React.Dispatch<React.SetStateAction<JwtPayload | null>>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const initialToken = localStorage.getItem(
    import.meta.env.VITE_AUTH_TOKEN_LS_KEY_NAME!,
  );
  const [tokenPayload, setTokenPayload] = useState<JwtPayload | null>(
    initialToken ? getTokenPayload(initialToken) : null,
  );

  useEffect(() => {
    const token = localStorage.getItem(
      import.meta.env.VITE_AUTH_TOKEN_LS_KEY_NAME!,
    );
    if (token) {
      setTokenPayload(getTokenPayload(token));
    } else {
      setTokenPayload(null);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ tokenPayload, setTokenPayload }}>
      {children}
    </AuthContext.Provider>
  );
};
