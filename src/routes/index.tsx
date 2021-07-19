import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { useAuth } from '../hooks/auth';

import AppTabRoutes from './app.tab.routes';
import AppStackRoutes from './app.stack.routes';

const routes: React.FC = () => {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      {user ? <AppTabRoutes /> : <AppStackRoutes />}
    </NavigationContainer>
  );
};

export default routes;
