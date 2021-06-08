import React from 'react';
import { StatusBar } from 'react-native';

import { Container, Header } from './styles';

const Home: React.FC = () => {
  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Header />
    </Container>
  );
};

export default Home;
