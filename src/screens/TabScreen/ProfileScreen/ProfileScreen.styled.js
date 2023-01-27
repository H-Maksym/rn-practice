import { StyleSheet, Dimensions } from "react-native";
import { theme } from "src/utils/theme";

export const stylesProfileScreen = StyleSheet.create({
  // container: {
  //   flex: 1,
  // },
  imageBackground: {
    flex: 1,
    justifyContent: "flex-end",
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
    position: "absolute",
    top: -(theme.space[6] - 4),
    left: Dimensions.get("window").width / 2 - 60,
    width: theme.space[7] - 8,
    height: theme.space[7] - 8,
    backgroundColor: theme.colors.imageBackground,
    borderRadius: theme.radii.lg,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: theme.radii.lg,
  },
  addAvatarButton: {
    position: "absolute",
    bottom: theme.space[4] - 2,
    right: -(theme.space[4] + 9) / 2,
    width: theme.space[4] + 9,
    height: theme.space[4] + 9,
  },

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
    top: theme.space[4] + 6,
    right: theme.space[4],
  },
  iconLogOut: {
    color: theme.colors.button.iconLogOut,
  },

  titleProfileScreen: {
    textAlign: "center",
    marginTop: theme.space[6] + 28,
    fontFamily: "Roboto-Medium",
    fontSize: theme.fontSizes.l,
    fontWeight: theme.fontWeights.medium,
    lineHeight: theme.lineHeights.titleForm,
    letterSpacing: theme.letterSpacing.s,
    color: theme.colors.form.titleForm,
  },
});
