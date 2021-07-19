import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/core';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  interpolate,
  Extrapolate,
  runOnJS,
} from 'react-native-reanimated';

import BrandSvg from '../../assets/brand.svg';
import LogoSvg from '../../assets/logo.svg';

import { Container } from './styles';

const Splash: React.FC = () => {
  const splashAnimated = useSharedValue(0); //0 -> 50

  const { navigate } = useNavigation();

  const brandStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        splashAnimated.value,
        [0, 50], //etapas da animação
        [1, 0] //qual valor irá reportar quanto tiver no step da animaçao
      ),
      transform: [
        {
          translateX: interpolate(
            splashAnimated.value,
            [0, 50],
            [0, -50],
            Extrapolate.CLAMP //para nunca passar do limite que foi definido no spashAnimated.value do useEffect
          ),
        },
      ],
    };
  });

  const logoStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        splashAnimated.value,
        [0, 25, 50],
        [0, 0.3, 1] //etapas da animação que será inversa
      ),
      transform: [
        {
          translateX: interpolate(
            splashAnimated.value,
            [0, 50],
            [-50, 0],
            Extrapolate.CLAMP
          ),
        },
      ],
    };
  });

  const startApp = () => {
    navigate('SignIn');
  };

  useEffect(() => {
    splashAnimated.value = withTiming(50, { duration: 2500 }, () => {
      //duração das animaçoes
      'worklet';
      runOnJS(startApp)(); //executa funçao para fazer navegaçao
    });
  }, []);

  return (
    <Container>
      <Animated.View style={[brandStyle, { position: 'absolute' }]}>
        <BrandSvg width={80} height={50} />
      </Animated.View>

      <Animated.View style={[logoStyle, { position: 'absolute' }]}>
        <LogoSvg width={180} height={20} />
      </Animated.View>
    </Container>
  );
};

export default Splash;
