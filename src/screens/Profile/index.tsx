import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useTheme } from 'styled-components';
import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as Yup from 'Yup';

import { useAuth } from '../../hooks/auth';

import BackButton from '../../components/BackButton';
import Input from '../../components/Input';
import Button from '../../components/Button';

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
  Options,
  Option,
  OptionTitle,
  Section,
} from './styles';

const Profile: React.FC = () => {
  const { user, signOut, updateUser } = useAuth();

  const [option, setOption] = useState<'dataEdit' | 'passwordEdit'>('dataEdit');
  const [avatar, setAvatar] = useState(user.avatar);
  const [name, setName] = useState(user.name);
  const [driverLicense, setDriverLicense] = useState(user.driver_license);

  const theme = useTheme();
  const { goBack } = useNavigation();

  const handleOptionChange = (optionSelected: 'dataEdit' | 'passwordEdit') => {
    setOption(optionSelected);
  };

  const handleChangeAvatar = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (result.cancelled) {
      return;
    }

    if (result.uri) {
      setAvatar(result.uri);
    }
  };

  const handleProfileUpdate = async () => {
    try {
      const schema = Yup.object().shape({
        driverLicense: Yup.string().required('CNH é obrigatõria'),
        name: Yup.string().required('Nome é obrigatório'),
      });

      const data = { name, driverLicense };
      await schema.validate(data);

      await updateUser({
        id: user.id,
        user_id: user.user_id,
        email: user.email,
        name,
        driver_license: driverLicense,
        avatar,
        token: user.token,
      });

      Alert.alert('Perfil atualizado!');
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        Alert.alert('Opa!', error.message);
        return;
      }
      Alert.alert('Não foi possível atualizar o perfil');
    }
  };

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <HeaderTop>
              <BackButton color={theme.colors.shape} onPress={() => goBack()} />
              <HeanderTitle>Editar Perfil</HeanderTitle>
              <LogoutButton onPress={signOut}>
                <Feather name="power" size={24} color={theme.colors.shape} />
              </LogoutButton>
            </HeaderTop>

            <PhotoContainer>
              {!!avatar && <Photo source={{ uri: avatar }} />}

              <PhotoButton onPress={handleChangeAvatar}>
                <Feather name="camera" size={24} color={theme.colors.shape} />
              </PhotoButton>
            </PhotoContainer>
          </Header>

          <Content style={{ marginBottom: useBottomTabBarHeight() }}>
            <Options>
              <Option
                active={option === 'dataEdit'}
                onPress={() => handleOptionChange('dataEdit')}
              >
                <OptionTitle active={option === 'dataEdit'}>Dados</OptionTitle>
              </Option>
              <Option
                active={option === 'passwordEdit'}
                onPress={() => handleOptionChange('passwordEdit')}
              >
                <OptionTitle active={option === 'passwordEdit'}>
                  Trocar senha
                </OptionTitle>
              </Option>
            </Options>
            {option === 'dataEdit' ? (
              <Section>
                <Input
                  icon="user"
                  placeholder="Nome"
                  autoCorrect={false}
                  defaultValue={user.name}
                  onChangeText={setName}
                />
                <Input icon="mail" editable={false} defaultValue={user.email} />
                <Input
                  icon="credit-card"
                  placeholder="CNH"
                  keyboardType="numeric"
                  defaultValue={user.driver_license}
                  onChangeText={setDriverLicense}
                />
              </Section>
            ) : (
              <Section>
                <Input icon="lock" placeholder="Senha atual" showPassword />
                <Input icon="lock" placeholder="Nova senha" showPassword />
                <Input icon="lock" placeholder="Repetir senha" showPassword />
              </Section>
            )}

            <Button title="Salvar alterações" onPress={handleProfileUpdate} />
          </Content>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Profile;
