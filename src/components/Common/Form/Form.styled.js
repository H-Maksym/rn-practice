import { StyleSheet } from 'react-native';
import { theme } from 'src/utils/theme';

export const formStyles = StyleSheet.create({
  form: {
    borderTopLeftRadius: theme.radii.xl,
    borderTopRightRadius: theme.radii.xl,
    backgroundColor: theme.colors.white,
    paddingHorizontal: 16,
  },

  titleForm: {
    marginBottom: theme.space[5],
    fontFamily: 'Roboto-Medium',
    fontSize: theme.fontSizes.l,
    fontWeight: theme.fontWeights.medium,
    lineHeight: theme.lineHeights.titleForm,
    letterSpacing: theme.letterSpacing.s,
    color: theme.colors.form.titleForm,
    textAlign: 'center',
  },

  inputForm: {},
});
