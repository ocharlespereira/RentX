import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  /* justify-content: center;
  align-items: center; */

  background-color: ${({ theme }) => theme.colors.backgroundPrimary};
`;

export const Header = styled.View`
  width: 100%;
  height: 113px;

  background-color: ${({ theme }) => theme.colors.header};
  /* font-size: 30px;
  font-family: ${({ theme }) => theme.fonts.secundary600}; */
`;
