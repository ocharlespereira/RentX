import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import { Container, Title } from './styles';

interface Props extends RectButtonProps {
  title: string;
  color?: string;
  enabled?: boolean;
}

const Button: React.FC<Props> = ({ title, color, enabled = true, ...rest }) => {
  return (
    <Container
      color={color}
      enabled={enabled}
      style={{ opacity: enabled ? 1 : 0.5 }}
      {...rest}
    >
      <Title>{title}</Title>
    </Container>
  );
};

export default Button;
