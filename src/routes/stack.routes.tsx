import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../screens/Home';
import CarDetails from '../screens/CarDetails';
import Scheduling from '../screens/Scheduling';
import SchedulingDetails from '../screens/SchedulingDetails';
import SchedulingComplete from '../screens/SchedulingComplete';
import MyCars from '../screens/MyCars';
import Splash from '../screens/Splash';
import SignIn from '../screens/SignIn';
import SignUpFistStep from '../screens/SignUp/SignUpFistStep';
import SignUpSecond from '../screens/SignUp/SignUpSecond';

const { Navigator, Screen } = createStackNavigator();

/**
 * initialRouteName -> seta componente a ser iniciado primeiro
 * gestureEnabled -> desabilita o gesto voltar do ios
 */

const StackRoutes: React.FC = () => {
  return (
    <Navigator headerMode="none" initialRouteName="SignUpSecond">
      {/* <Screen name="Splash" component={Splash} /> */}
      <Screen name="SignIn" component={SignIn} />
      <Screen
        name="SignUpFistStep"
        component={SignUpFistStep}
        options={{ gestureEnabled: false }}
      />
      <Screen
        name="SignUpSecond"
        component={SignUpSecond}
        options={{ gestureEnabled: false }}
      />
      <Screen
        name="Home"
        component={Home}
        options={{ gestureEnabled: false }}
      />
      <Screen name="MyCars" component={MyCars} />
      <Screen name="CarDetails" component={CarDetails} />
      <Screen name="Scheduling" component={Scheduling} />
      <Screen name="SchedulingDetails" component={SchedulingDetails} />
      <Screen name="SchedulingComplete" component={SchedulingComplete} />
    </Navigator>
  );
};

export default StackRoutes;
