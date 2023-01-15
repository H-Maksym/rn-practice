import { StyleSheet } from 'react-native';
import { theme } from 'src/utils/theme';

export const stylesButton = StyleSheet.create({
  buttonContainer: {
    paddingVertical: theme.space[4],
    borderRadius: theme.radii.xxxxl,
    backgroundColor: theme.colors.button.accent,
    alignItems: 'center',
  },
  buttonText: {
    // fontFamily:
    fontSize: theme.fontSizes.s,
    fontWeight: theme.fontWeights.normal,
    fontStyle: 'normal',
    lineHeight: theme.lineHeights.button,
    color: theme.colors.white,
  },
});
