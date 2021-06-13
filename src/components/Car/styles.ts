import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  height: 126px;

  background-color: ${({ theme }) => theme.colors.backgroundSecundary};

  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding: 24px;
  margin-bottom: 16px;
`;

export const Details = styled.View``;

export const Brand = styled.Text`
  font-family: ${({ theme }) => theme.fonts.secundary500};
  color: ${({ theme }) => theme.colors.textDetail};
  font-size: ${RFValue(10)}px;
  text-transform: uppercase;
`;

export const Name = styled.Text`
  font-family: ${({ theme }) => theme.fonts.secundary500};
  color: ${({ theme }) => theme.colors.title};
  font-size: ${RFValue(15)}px;
`;

export const About = styled.View``;

export const Rent = styled.View``;

export const Period = styled.Text``;

export const Price = styled.Text``;

export const Type = styled.View``;

export const CarImage = styled.Image``;
