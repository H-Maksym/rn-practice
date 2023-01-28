import { StyleSheet } from 'react-native';
import { theme } from 'src/utils/theme';

export const stylesPostItem = StyleSheet.create({
  postListWrapper: {
    marginTop: theme.space[5],
  },
  imagePost: {
    height: theme.space[8] - 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.radii.md,
    backgroundColor: theme.colors.imageBackground,
  },
  titlePost: {
    marginVertical: theme.space[3],
    fontFamily: 'Roboto-Medium',
    fontSize: theme.fontSizes.s,
    lineHeight: theme.lineHeights.button,
    color: theme.colors.text.primaryText,
  },

  detailPostWrapper: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
  },

  postCommentsWrapper: {
    flexDirection: 'row',
  },

  iconPostComments: {
    marginRight: theme.space[3],
    transform: [{ rotate: '-90deg' }],
    color: theme.colors.button.iconComments,
  },

  fillIconPostComments: {
    marginRight: theme.space[3],
  },

  textPostComments: {
    fontFamily: 'Roboto-Regular',
    fontSize: theme.fontSizes.s,
    lineHeight: theme.lineHeights.button,
    color: theme.colors.button.iconComments,
  },

  postLikeWrapper: {
    flexDirection: 'row',
  },

  iconPostLike: {
    marginLeft: theme.space[4] + 8,
    marginRight: theme.space[3],
    color: theme.colors.button.iconLike,
  },
  textPostLike: {
    fontFamily: 'Roboto-Regular',
    fontSize: theme.fontSizes.s,
    lineHeight: theme.lineHeights.button,
    color: theme.colors.button.iconLike,
  },

  postLocationWrapper: {
    flexDirection: 'row',
    marginLeft: 'auto',
  },

  iconPostLocation: {
    marginRight: theme.space[3],
    color: theme.colors.button.iconLocation,
  },
  textPostLocation: {
    fontFamily: 'Roboto-Regular',
    fontSize: theme.fontSizes.s,
    lineHeight: theme.lineHeights.button,
    textDecorationLine: 'underline',
    color: theme.colors.text.primaryText,
  },
});
