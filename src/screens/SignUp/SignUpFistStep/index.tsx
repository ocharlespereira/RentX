import React from 'react';
import { useNavigation } from '@react-navigation/native';

import BackButton from '../../../components/BackButton';
import Bullet from '../../../components/Bullet';

import {
  Container,
  Header,
  Steps,
  Title,
  SubTitle,
  Form,
  FormTitle,
} from './styles';
import Input from '../../../components/Input';

interface SignUpFistStepProps {}

const SignUpFistStep: React.FC = () => {
  const { goBack } = useNavigation();

  const handleBack = () => {
    goBack();
  };

  return (
    <Container>
      <Header>
        <BackButton onPress={handleBack} />
        <Steps>
          <Bullet active={true} />
          <Bullet />
        </Steps>
      </Header>

      <Title>Crie sua{'\n'}conta</Title>
      <SubTitle>Faça seu cadastro de{'\n'}forma rápida e fácil</SubTitle>

      <Form>
        <FormTitle>1. dados</FormTitle>
        <Input icon="user" placeholder="Nome" />
        <Input icon="mail" placeholder="E-mail" />
        <Input icon="credit-card" placeholder="CNH" />
      </Form>
    </Container>
  );
};

export default SignUpFistStep;
