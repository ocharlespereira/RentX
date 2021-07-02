import { ReactNode } from 'react';

import { Text } from 'react-native';

import { Container } from './styles';

interface SignUpProps {
  children: ReactNode;
}

function SignUp({ children }: SignUpProps) {
  return (
    <Container>
      <Text>SignUp</Text>
      {children}
    </Container>
  );
};

export default SignUp;
