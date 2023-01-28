<<<<<<< HEAD
import { StyleSheet, Dimensions } from "react-native";
import { theme } from "src/utils/theme";
=======
import { StyleSheet, Dimensions } from 'react-native';
import { theme } from 'src/utils/theme';
>>>>>>> main

export const stylesProfileScreen = StyleSheet.create({
  // container: {
  //   flex: 1,
  // },
  imageBackground: {
    flex: 1,
<<<<<<< HEAD
    justifyContent: "flex-end",
=======
    justifyContent: 'flex-end',
>>>>>>> main
    paddingTop: theme.space[6] - 4,
  },
  containerProfileScreen: {
    flex: 1,
    paddingHorizontal: theme.space[4],
    borderTopLeftRadius: theme.radii.xl,
    borderTopRightRadius: theme.radii.xl,
    backgroundColor: theme.colors.primaryBackground,
  },

  avatarBox: {
<<<<<<< HEAD
    position: "absolute",
    top: -(theme.space[6] - 4),
    left: Dimensions.get("window").width / 2 - 60,
=======
    position: 'absolute',
    top: -(theme.space[6] - 4),
    left: Dimensions.get('window').width / 2 - 60,
>>>>>>> main
    width: theme.space[7] - 8,
    height: theme.space[7] - 8,
    backgroundColor: theme.colors.imageBackground,
    borderRadius: theme.radii.lg,
  },
<<<<<<< HEAD
  avatar: {
    width: 120,
    height: 120,
    borderRadius: theme.radii.lg,
  },
  addAvatarButton: {
    position: "absolute",
=======

  addAvatarButton: {
    position: 'absolute',
>>>>>>> main
    bottom: theme.space[4] - 2,
    right: -(theme.space[4] + 9) / 2,
    width: theme.space[4] + 9,
    height: theme.space[4] + 9,
  },

<<<<<<< HEAD
  changeAvatarStatus(image) {
    if (image || userImage) {
      return {
        fill: theme.colors.button.iconPlus,
        stroke: theme.colors.button.iconPlus,
        transform: [{ rotate: "-45deg" }],
      };
    }
    return {
      fill: theme.colors.button.accent,
      stroke: theme.colors.button.accent,
    };
  },

  buttonIconLogOut: {
    position: "absolute",
=======
  buttonIconLogOut: {
    position: 'absolute',
>>>>>>> main
    top: theme.space[4] + 6,
    right: theme.space[4],
  },
  iconLogOut: {
    color: theme.colors.button.iconLogOut,
  },

  titleProfileScreen: {
<<<<<<< HEAD
    textAlign: "center",
    marginTop: theme.space[6] + 28,
    fontFamily: "Roboto-Medium",
=======
    textAlign: 'center',
    marginTop: theme.space[6] + 28,
    fontFamily: 'Roboto-Medium',
>>>>>>> main
    fontSize: theme.fontSizes.l,
    fontWeight: theme.fontWeights.medium,
    lineHeight: theme.lineHeights.titleForm,
    letterSpacing: theme.letterSpacing.s,
    color: theme.colors.form.titleForm,
  },
});
