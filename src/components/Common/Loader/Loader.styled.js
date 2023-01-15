import { backgroundColor } from 'styled-system';
import { theme } from '../../../utils/theme';
const { StyleSheet } = require('react-native');

export const stylesLoader = StyleSheet.create({
  loaderContainer: {
    position: 'absolute',
    zIndex: 10,
    backgroundColor: '#ffffff50',
    justifyContent: 'center',
  },
  Loader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: theme.space[6] - 14,
    paddingHorizontal: theme.space[4] + 4,
    height: theme.space[6],
    borderRadius: theme.radii.xl,
    backgroundColor: theme.colors.loader,
  },
  textLoader: {
    marginLeft: theme.space[4],
    fontFamily: 'Roboto-Regular',
    fontSize: theme.fontSizes.sm,
    fontWeight: theme.fontWeights.bold,
    letterSpacing: theme.letterSpacing.xxl,
    color: theme.colors.accent,
  },
});
