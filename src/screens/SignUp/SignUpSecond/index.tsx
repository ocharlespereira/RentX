import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import { useTheme } from 'styled-components';
import { useNavigation, useRoute } from '@react-navigation/native';

import BackButton from '../../../components/BackButton';
import Bullet from '../../../components/Bullet';
import Input from '../../../components/Input';
import Button from '../../../components/Button';

import {
  Container,
  Header,
  Steps,
  Title,
  SubTitle,
  Form,
  FormTitle,
} from './styles';

interface SignUpSecondProps {
  user: {
    name: string;
    email: string;
    driveLicense: string;
  };
}

const SignUpSecond: React.FC = () => {
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const { goBack } = useNavigation();
  const route = useRoute();
  const theme = useTheme();

  const { user } = route.params as SignUpSecondProps;

  const handleBack = () => {
    goBack();
  };

  const handleRegister = () => {
    if (!password || !passwordConfirm) {
      return Alert.alert('Informe a senha e a confirmação.');
    }

    if (password !== passwordConfirm) {
      return Alert.alert('As senhas não são iguais.');
    }
  };

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <BackButton onPress={handleBack} />
            <Steps>
              <Bullet />
              <Bullet active={true} />
            </Steps>
          </Header>

          <Title>Crie sua{'\n'}conta</Title>
          <SubTitle>Faça seu cadastro de{'\n'}forma rápida e fácil</SubTitle>

          <Form>
            <FormTitle>2. Senha</FormTitle>
            <Input
              icon="lock"
              placeholder="Senha"
              showPassword
              onChangeText={setPassword}
              value={password}
            />
            <Input
              icon="lock"
              placeholder="Repetir senha"
              showPassword
              onChangeText={setPasswordConfirm}
              value={passwordConfirm}
            />
          </Form>

          <Button
            title="Cadastrar"
            color={theme.colors.success}
            onPress={handleRegister}
          />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default SignUpSecond;
