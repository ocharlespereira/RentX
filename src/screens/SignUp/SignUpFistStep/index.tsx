import React from 'react';
import { useNavigation } from '@react-navigation/native';

import BackButton from '../../../components/BackButton';
import Bullet from '../../../components/Bullet';

import { Container, Header, Steps } from './styles';

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
    </Container>
  );
};

export default SignUpFistStep;
