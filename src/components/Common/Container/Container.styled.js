import styled from 'styled-components';
import { View } from 'react-native';

export const Wrap = styled(View)`
  padding-left: ${p => `${p.theme.space[4]}px`};
  padding-right: ${p => `${p.theme.space[4]}px`};
`;
