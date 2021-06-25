import React, { ComponentProps } from 'react';
import { TextInputProps } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';

import { Container } from './styles';

interface InputProps extends TextInputProps {
  icon: ComponentProps<typeof Feather>['name'];
}

const Input: React.FC<InputProps> = ({ icon, ...rest }) => {
  const theme = useTheme();

  return (
    <Container {...rest}>
      <Feather name={icon} size={24} color={theme.colors.textDetail} />
    </Container>
  );
};

export default Input;
