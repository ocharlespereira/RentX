import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';

import BackButton from '../../../components/BackButton';
import Bullet from '../../../components/Bullet';
import Input from '../../../components/Input';
import Button from '../../../components/Button';

import {
  Container,
  Header,
  Steps,
  Title,
  SubTitle,
  Form,
  FormTitle,
} from './styles';

interface SignUpFistStepProps {}

const SignUpFistStep: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [driveLicense, setDriveLicense] = useState('');

  const { goBack, navigate } = useNavigation();

  const handleBack = () => {
    goBack();
  };

  const handleNextStep = async () => {
    try {
      const schema = Yup.object().shape({
        driveLicense: Yup.string().required('CNH é obrigatório.'),
        email: Yup.string()
          .email('E-mail inválido.')
          .required('E-mail é obrigatório.'),
        name: Yup.string().required('Nome é obrigatório.'),
      });

      const data = { name, email, driveLicense };
      await schema.validate(data);

      navigate('SignUpSecond', { user: data });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        return Alert.alert('Opa', error.message);
      }
    }
  };

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
            <FormTitle>1. Dados</FormTitle>
            <Input
              icon="user"
              placeholder="Nome"
              onChangeText={setName}
              value={name}
            />
            <Input
              icon="mail"
              placeholder="E-mail"
              keyboardType="email-address"
              onChangeText={setEmail}
              value={email}
            />
            <Input
              icon="credit-card"
              placeholder="CNH"
              keyboardType="numeric"
              onChangeText={setDriveLicense}
              value={driveLicense}
            />
          </Form>

          <Button title="Próximo" onPress={handleNextStep} />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default SignUpFistStep;
