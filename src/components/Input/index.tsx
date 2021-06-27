import React, { ComponentProps } from 'react';
import { TextInputProps } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';

import { Container, InputContainer, InputText } from './styles';

interface InputProps extends TextInputProps {
  icon: ComponentProps<typeof Feather>['name'];
}

const Input: React.FC<InputProps> = ({ icon, ...rest }) => {
  const theme = useTheme();

  return (
    <Container>
      <InputContainer>
        <Feather name={icon} size={24} color={theme.colors.textDetail} />
      </InputContainer>
      <InputText {...rest} />
    </Container>
  );
};

export default Input;
