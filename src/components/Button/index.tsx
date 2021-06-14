import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import { Container, Title } from './styles';

interface Props extends RectButtonProps {
  title: string;
  color?: string;
}

const Button: React.FC<Props> = ({ title, color, ...rest }) => {
  return (
    <Container color={color} {...rest}>
      <Title>{title}</Title>
    </Container>
  );
};

export default Button;
