import React from 'react';
import { useTheme } from 'styled-components';
import { StatusBar } from 'react-native';
import Button from '../../components/Button';

import Input from '../../components/Input';

import { Container, Header, Form, Title, SubTitle, Footer } from './styles';

const SignIn: React.FC = () => {
  const theme = useTheme();

  return (
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
        />
        <Input icon="lock" placeholder="Senha" showPassword />
      </Form>

      <Footer>
        <Button
          title="login"
          onPress={() => {}}
          enabled={false}
          loading={false}
        />
        <Button
          title="Criar conta gratuíta"
          color={theme.colors.backgroundSecundary}
          onPress={() => {}}
          enabled={false}
          loading={false}
          light
        />
      </Footer>
    </Container>
  );
};

export default SignIn;
