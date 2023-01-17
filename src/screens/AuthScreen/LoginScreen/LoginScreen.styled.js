import { StyleSheet } from 'react-native';
import { theme } from 'src/utils/theme';

export const stylesLogin = StyleSheet.create({
  // container: {
  //   flex: 1,
  // },
  imageBackground: {
    flex: 1,
    // resizeMode: 'cover',
    justifyContent: 'flex-end',
  },

  gotoRegisterBtn: { marginBottom: theme.space[6] + 2 },

  gotoRegisterText: {
    fontFamily: 'Roboto-Regular',
    fontSize: theme.fontSizes.s,
    lineHeight: theme.lineHeights.dataText,
    fontWeight: theme.fontWeights.normal,
    textAlign: 'center',
    color: theme.colors.text.link,
  },
});
