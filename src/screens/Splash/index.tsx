import React from 'react';
import { Button, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';

import { Container } from './styles';

const WIDTH = Dimensions.get('window').width;

const Splash: React.FC = () => {
  const animation = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withTiming(animation.value, {
            duration: 1000,
            easing: Easing.bezier(0, 0.72, 1, -0.57),
          }),
        },
      ],
    };
  });

  const handleAnimationPosition = () => {
    animation.value = Math.random() * (WIDTH - 100);
  };

  return (
    <Container>
      <Animated.View style={[styles.box, animatedStyles]} />

      <Button title="Mover" onPress={handleAnimationPosition} />
    </Container>
  );
};

const styles = StyleSheet.create({
  box: {
    width: 100,
    height: 100,
    backgroundColor: 'red',
  },
});

export default Splash;
