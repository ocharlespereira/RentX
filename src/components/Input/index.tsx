import React, { ComponentProps, useState } from 'react';
import { TextInputProps } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import { BorderlessButton } from 'react-native-gesture-handler';

import { Container, InputContainer, InputText } from './styles';

interface InputProps extends TextInputProps {
  icon: ComponentProps<typeof Feather>['name'];
  showPassword?: boolean;
}

const Input: React.FC<InputProps> = ({
  icon,
  showPassword = false,
  ...rest
}) => {
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const theme = useTheme();

  return (
    <Container>
      <InputContainer>
        <Feather name={icon} size={24} color={theme.colors.textDetail} />
      </InputContainer>
      <InputText
        secureTextEntry={showPassword && !isVisiblePassword ? true : false}
        {...rest}
      />

      {showPassword && (
        <BorderlessButton onPress={() => setIsVisiblePassword((prev) => !prev)}>
          <InputContainer>
            <Feather
              name={isVisiblePassword ? 'eye' : 'eye-off'}
              size={24}
              color={theme.colors.textDetail}
            />
          </InputContainer>
        </BorderlessButton>
      )}
    </Container>
  );
};

export default Input;
