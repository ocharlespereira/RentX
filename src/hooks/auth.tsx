import React, { createContext, useState, useContext } from 'react';

import api from '../services/api';
import { database } from '../databases';

import { User as ModelUser } from '../databases/model/User';

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
    try {
      const response = await api.post('/sessions', {
        email,
        password,
      });

      const { token, user } = response.data;

      api.defaults.headers.authorization = `Bearer ${token}`;

      //salvar database local
      const userCollection = database.get<ModelUser>('users');
      await database.action(async () => {
        await userCollection.create((newUser) => {
          (newUser.user_id = user.id),
            (newUser.name = user.name),
            (newUser.email = user.email),
            (newUser.driver_license = user.driver_license),
            (newUser.avatar = user.avatar),
            (newUser.token = token);
        });
      });

      setData({ token, user });
    } catch (error) {
      throw new Error(error);
    }
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
