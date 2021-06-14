import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';

interface Props {
  color?: string;
}

export const Container = styled(RectButton)<Props>`
  width: 100%;

  padding: 19px;
  align-items: center;
  justify-content: center;

  background-color: ${({ theme, color }) =>
    color ? color : theme.colors.main};
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary500};
  color: ${({ theme }) => theme.colors.shape};
  font-size: ${RFValue(15)}px;
`;
