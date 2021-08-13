import React, { ComponentProps, useState } from 'react';
import { TextInputProps } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import { BorderlessButton } from 'react-native-gesture-handler';

import { Container, InputContainer, InputText } from './styles';

interface InputProps extends TextInputProps {
  icon: ComponentProps<typeof Feather>['name'];
  showPassword?: boolean;
  value?: string;
}

const Input: React.FC<InputProps> = ({
  icon,
  showPassword = false,
  value,
  ...rest
}) => {
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const theme = useTheme();

  const handleInputFocus = () => {
    setIsFocused(true);
  };

  const handleIsInputBlur = () => {
    setIsFocused(false);

    setIsFilled(!!value);
  };

  const handleVisibilityPassword = () => {
    setIsVisiblePassword((prev) => !prev);
  };

  return (
    <Container>
      <InputContainer isFocused={isFocused}>
        <Feather
          name={icon}
          size={24}
          color={
            isFocused || isFilled ? theme.colors.main : theme.colors.textDetail
          }
        />
      </InputContainer>
      <InputText
        isFocused={isFocused}
        secureTextEntry={showPassword && !isVisiblePassword ? true : false}
        onFocus={handleInputFocus}
        onBlur={handleIsInputBlur}
        autoCorrect={showPassword ? false : true}
        {...rest}
      />

      {showPassword && (
        <BorderlessButton onPress={handleVisibilityPassword}>
          <InputContainer isFocused={isFocused}>
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
