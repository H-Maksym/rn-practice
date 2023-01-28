import { StyleSheet } from 'react-native';
import { theme } from 'src/utils/theme';

export const stylesPostScreen = StyleSheet.create({
  headerIconLogOut: {
    marginRight: theme.space[4],
    color: theme.colors.button.iconLogOut,
  },
  containerPostScreen: {
    marginHorizontal: 16,
  },
});
