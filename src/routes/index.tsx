import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import StackRoutes from './stack.routes';

const routes: React.FC = () => {
  return (
    <NavigationContainer>
      <StackRoutes />
    </NavigationContainer>
  );
};

export default routes;
