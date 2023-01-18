import { StyleSheet, Dimensions } from 'react-native';
import { theme } from 'src/utils/theme';

export const stylesCreatePostsScreen = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  imageContainer: {
    marginTop: theme.space[5],
    marginBottom: theme.space[3],
  },
  imagePost: {
    height: 240,
    backgroundColor: '#E8E8E8',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#E8E8E8',
    borderRadius: theme.radii.md,
  },

  snapContainer: {
    position: 'absolute',
    top: '50%',
    left: Dimensions.get('window').width / 2 - 60 + 16,
    transform: [{ translateY: -30 }],
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    borderRadius: '50%',
    zIndex: 10,
  },
  textAction: {
    marginBottom: theme.space[5],
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 19,
    color: '#BDBDBD',
  },
});
