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
  PhotoButton,
  Content,
  ContentHeader,
  Options,
  Option,
  OptionTitle,
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

          <PhotoButton onPress={() => {}}>
            <Feather name="camera" size={24} color={theme.colors.shape} />
          </PhotoButton>
        </PhotoContainer>
      </Header>

      <Content>
        <ContentHeader>
          <Options>
            <Option active={true}>
              <OptionTitle active={true}>Dados</OptionTitle>
            </Option>
            <Option active={false}>
              <OptionTitle active={true}>Trocar senha</OptionTitle>
            </Option>
          </Options>
        </ContentHeader>
      </Content>
    </Container>
  );
};

export default Profile;
