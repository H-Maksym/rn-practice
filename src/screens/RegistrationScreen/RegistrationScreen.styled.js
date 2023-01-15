import { StyleSheet, Dimensions } from 'react-native';
import { theme } from 'src/utils/theme';

export const stylesRegistration = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    // resizeMode: 'cover',
    justifyContent: 'flex-end',
  },
  avatarBox: {
    position: 'absolute',
    top: -(theme.space[6] - 4),
    left: Dimensions.get('window').width / 2 - 60 - 32 / 2,
    width: theme.space[7] - 8,
    height: theme.space[7] - 8,
    backgroundColor: theme.colors.imageBackground,
    borderRadius: theme.radii.lg,
  },
  addAvatarButton: {
    position: 'absolute',
    bottom: theme.space[4] - 2,
    right: -(theme.space[4] + 9) / 2,
    width: theme.space[4] + 9,
    height: theme.space[4] + 9,
  },

  gotoLoginBtn: { marginBottom: theme.space[6] + 2 },

  gotoLoginText: {
    fontFamily: 'Roboto-Regular',
    fontSize: theme.fontSizes.s,
    lineHeight: theme.lineHeights.dataText,
    fontWeight: theme.fontWeights.normal,
    textAlign: 'center',
    color: theme.colors.text.link,
  },
});
