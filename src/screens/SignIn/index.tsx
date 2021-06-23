import React from 'react';
import { StatusBar } from 'react-native';
import Button from '../../components/Button';

import { Container, Header, Title, SubTitle, Footer } from './styles';

const SignIn: React.FC = () => {
  return (
    <Container>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />

      <Header>
        <Title>Estamos {'\n'} quase lá</Title>
        <SubTitle>
          Faça seu login para começar {'\n'} uma experiência incrível.
        </SubTitle>
      </Header>

      <Footer>
        <Button
          title="login"
          onPress={() => {}}
          enabled={false}
          loading={false}
        />
        <Button
          title="Criar conta gratuíta"
          onPress={() => {}}
          enabled={false}
          loading={false}
        />
      </Footer>
    </Container>
  );
};

export default SignIn;
