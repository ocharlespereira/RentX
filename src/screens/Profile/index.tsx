import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { Feather } from '@expo/vector-icons';

import BackButton from '../../components/BackButton';

import {
  Container,
  Header,
  HeaderTop,
  HeanderTitle,
  LogoutButton,
  PhotoContainer,
  Photo,
} from './styles';

const Profile: React.FC = () => {
  const theme = useTheme();
  const { goBack } = useNavigation();

  const handleSinOut = () => {};

  return (
    <Container>
      <Header>
        <HeaderTop>
          <BackButton color={theme.colors.shape} onPress={() => goBack()} />
          <HeanderTitle>Editar Perfil</HeanderTitle>
          <LogoutButton onPress={handleSinOut}>
            <Feather name="power" size={24} color={theme.colors.shape} />
          </LogoutButton>
        </HeaderTop>

        <PhotoContainer>
          <Photo source={{ uri: 'https://github.com/charlespereira1.png' }} />
        </PhotoContainer>
      </Header>
    </Container>
  );
};

export default Profile;
