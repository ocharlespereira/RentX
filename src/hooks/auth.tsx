import React, { createContext, useState, useContext, ReactNode } from 'react';

import api from '../services/api';

interface User {
  id: string;
  email: string;
  driver_license: string;
  avatar: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface SigninCredentials {
  email: string;
  password: string;
}

interface AuthcontextData {
  user: User;
  signIn: (credential: SigninCredentials) => Promise<void>;
}

const AuthContext = createContext<AuthcontextData>({} as AuthcontextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState);

  const signIn = async ({ email, password }: SigninCredentials) => {
    const response = await api.post('/sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, user });
  };

  return (
    <AuthContext.Provider value={{ user: data.user, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = (): AuthcontextData => {
  const context = useContext(AuthContext);

  return context;
};

export { AuthProvider, useAuth };
