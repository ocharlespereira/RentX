import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from '../screens/Home';
import MyCars from '../screens/MyCars';
import SignUpSecond from '../screens/SignUp/SignUpSecond';
import AppStackRoutes from './app.stack.routes';

const { Navigator, Screen } = createBottomTabNavigator();

/**
 * initialRouteName -> seta componente a ser iniciado primeiro
 * gestureEnabled -> desabilita o gesto voltar do ios
 */

const AppTabRoutes: React.FC = () => {
  return (
    <Navigator>
      <Screen name="Home" component={AppStackRoutes} />
      <Screen name="Profile" component={Home} />
      <Screen name="MyCars" component={MyCars} />
      <Screen name="SignUpSecond" component={SignUpSecond} />
    </Navigator>
  );
};

export default AppTabRoutes;
