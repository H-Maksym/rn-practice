import styled from 'styled-components/native';
// import { View, Text } from 'react-native';

export const MainView = styled.View`
  flex: 1;
  background-color: ${p => p.theme.colors.white};
  justify-content: center;
  /* align-items: center; */
`;

export const ImageBG = styled.ImageBackground`
  flex: 1;
  resize: cover;
  align-items: center;
`;
