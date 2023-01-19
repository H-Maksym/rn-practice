import { StyleSheet } from 'react-native';
import { theme } from 'src/utils/theme';

export const stylesInput = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.space[4],
    height: theme.space[6] - 14,
    backgroundColor: theme.colors.form.formInputBackground,
    borderRadius: theme.radii.md,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.colors.form.formInputBorder,
  },
  iconInput: {
    fontFamily: 'Roboto-Regular',
    fontSize: theme.fontSizes.s,
    color: theme.colors.text.secondaryText,
    marginRight: theme.space[3],
  },
  textInput: {
    paddingVertical: theme.space[4],
    fontFamily: 'Roboto-Regular',
    fontSize: theme.fontSizes.s,
    fontStyle: 'normal',
    fontWeight: theme.fontWeights.normal,
    lineHeight: theme.lineHeights.dataText,
    color: theme.colors.text.primaryText,
  },
  iconShowPassword: {
    fontFamily: 'Roboto-Regular',
    fontSize: theme.fontSizes.s,
    color: theme.colors.text.secondaryText,
    marginLeft: 'auto',
  },

  errorMessageInput: {
    marginTop: theme.space[2],
    fontFamily: 'Roboto-Regular',
    fontSize: theme.fontSizes.xxs,
    fontWeight: theme.fontWeights.normal,
    color: theme.colors.form.formErrorMessage,
  },
});
