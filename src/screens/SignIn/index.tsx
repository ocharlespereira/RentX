import React from 'react';

import { Container, Header, Title, SubTitle } from './styles';

const SignIn: React.FC = () => {
  return (
    <Container>
      <Header></Header>
      <Title>Estamos {'\n'} quase lá</Title>
      <SubTitle>
        Faça seu login para começar {'\n'} uma experiência incrível.
      </SubTitle>
    </Container>
  );
};

export default SignIn;
