import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import {
  StatusBar,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { useTheme } from 'styled-components';
import * as Yup from 'yup';

import { useAuth } from '../../hooks/auth';

import { database } from '../../databases';

import Button from '../../components/Button';
import Input from '../../components/Input';

import { Container, Header, Form, Title, SubTitle, Footer } from './styles';

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const theme = useTheme();
  const { signIn } = useAuth();
  const { navigate } = useNavigation();

  const handleSignIn = async () => {
    try {
      const schema = Yup.object().shape({
        password: Yup.string().required('A senha é obrigatória'),
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Digite um e-mail válido'),
      });

      await schema.validate({ password, email });

      signIn({ email, password });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        return Alert.alert('Opa', error.message);
      } else {
        Alert.alert(
          'Erro na autenticação',
          'Ocorreu um erro ao fazer login, verifique as credenciais'
        );
      }
    }
  };

  const handleNewAccount = () => {
    console.log('passei aqui');
    navigate('SignUpFistStep');
  };

  useEffect(() => {
    //Teste criação database no watermelon
    const loadData = async () => {
      const userCollection = database.get('users');
      const users = await userCollection.query().fetch();
      console.log('Users cadastrados na base de dados');
      console.log(users);
    };

    loadData();
  }, []);

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <StatusBar
            barStyle="dark-content"
            backgroundColor="transparent"
            translucent
          />

          <Header>
            <Title>Estamos{'\n'}quase lá</Title>
            <SubTitle>
              Faça seu login para começar{'\n'}uma experiência incrível.
            </SubTitle>
          </Header>

          <Form>
            <Input
              icon="mail"
              placeholder="E-mail"
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={setEmail}
              value={email}
            />
            <Input
              icon="lock"
              placeholder="Senha"
              showPassword
              onChangeText={setPassword}
              value={password}
            />
          </Form>

          <Footer>
            <Button
              title="login"
              onPress={handleSignIn}
              enabled={true}
              loading={false}
            />
            <Button
              title="Criar conta gratuíta"
              color={theme.colors.backgroundSecundary}
              onPress={handleNewAccount}
              enabled={true}
              loading={false}
              light
            />
          </Footer>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default SignIn;
