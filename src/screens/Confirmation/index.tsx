import React from 'react';
import { useWindowDimensions, StatusBar } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import ConfirmButton from '../../components/ConfirmButton';

import LogoSvg from '../../assets/logo_background_gray.svg';
import DoneSvg from '../../assets/done.svg';

import { Container, Content, Title, Message, Footer } from './styles';

interface ConfirmationProps {
  title: string;
  message: string;
  nextScreenRoute: string;
}

const Confirmation: React.FC = () => {
  const { width } = useWindowDimensions();
  const navigation = useNavigation();
  const route = useRoute();
  const { title, message, nextScreenRoute } = route.params as ConfirmationProps;

  const handleHome = () => {
    navigation.navigate(nextScreenRoute);
  };
  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <LogoSvg width={width} />

      <Content>
        <DoneSvg width={80} height={80} />
        {/* <Title>Carro alugado!</Title> */}
        <Title>{title}</Title>

        <Message>{message}</Message>
        {/* <Message>
          Agora você só precisa ir {'\n'}
          até a concessionária da RENTX{'\n'}
          pegar o seu automóvel.
        </Message> */}
      </Content>

      <Footer>
        <ConfirmButton title="OK" onPress={handleHome} />
      </Footer>
    </Container>
  );
};

export default Confirmation;
