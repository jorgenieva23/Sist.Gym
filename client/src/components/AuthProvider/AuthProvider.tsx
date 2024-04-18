import { useContext, createContext, useState } from "react";

interface AuthProviderProps {
  children: React.ReactNode;
}

import React from "react";

const AuthContext = createContext({
  isAuthenticate: false,
});

const AuthProvider: React.FC<AuthProviderProps> = ({
  children,
}: AuthProviderProps): JSX.Element => {
  const [isAuthenticate] = useState(false);
  return (
    <AuthContext.Provider value={{ isAuthenticate }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
