import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../pages/Home';
import CarDetails from '../pages/CarDetails';
import Scheduling from '../pages/Scheduling';
import SchedulingDetails from '../pages/SchedulingDetails';
import SchedulingComplete from '../pages/SchedulingComplete';

const { Navigator, Screen } = createStackNavigator();

const StackRoutes: React.FC = () => {
  return (
    <Navigator headerMode="none">
      <Screen name="Home" component={Home} />
      <Screen name="CarDetails" component={CarDetails} />
      <Screen name="Scheduling" component={Scheduling} />
      <Screen name="SchedulingDetails" component={SchedulingDetails} />
      <Screen name="SchedulingComplete" component={SchedulingComplete} />
    </Navigator>
  );
};

export default StackRoutes;
