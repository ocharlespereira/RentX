import React from 'react';
import LottieView from 'lottie-react-native';

import loadCar from '../../assets/loadAnimated.json';

import { Container } from './styles';

const LoadAnimation: React.FC = () => {
  return (
    <Container>
      <LottieView
        source={loadCar}
        style={{ height: 200 }}
        resizeMode="center"
        autoPlay
        loop
      />
    </Container>
  );
};

export default LoadAnimation;
