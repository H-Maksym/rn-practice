import { StyleSheet, Dimensions } from "react-native";
import { theme } from "src/utils/theme";

export const stylesCreatePostsScreen = StyleSheet.create({
  headerIconGoBack: {
    marginLeft: theme.space[4],
    color: theme.colors.button.iconLogOut,
  },
  container: {
    paddingHorizontal: theme.space[4],
  },
  imageContainer: {
    marginTop: theme.space[5],
    marginBottom: theme.space[3],
  },
  imagePost: {
    height: theme.space[8] - 16,
    backgroundColor: "#E8E8E8",
    // alignItems: 'center',
    // justifyContent: 'center',
    resizeMode: "cover",

    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#E8E8E8",
    borderRadius: theme.radii.md,
  },

  snapContainer: {
    position: "absolute",
    top: "50%",
    left: Dimensions.get("window").width / 2 - 60 + 16,
    transform: [{ translateY: -30 }],
    justifyContent: "center",
    alignItems: "center",
    width: theme.space[6] - 4,
    height: theme.space[6] - 4,
    borderRadius: theme.space[6] - 14,
    zIndex: 10,
  },
  textAction: {
    marginBottom: theme.space[5],
    fontFamily: "Roboto-Regular",
    fontSize: theme.fontSizes.s,
    lineHeight: theme.lineHeights.dataText,
    color: theme.colors.text.secondaryText,
  },
  inputStyle: {
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
  },
  inputContainerIsShownKeyboard: {
    position: "absolute",
    zIndex: 100,
    bottom: theme.space[7] - 8,
    left: theme.space[3],
    width: "100%",
    paddingVertical: theme.space[4],
    paddingHorizontal: theme.space[3],
    borderRadius: theme.radii.md,
    opacity: 1,

    elevation: theme.space[4] + 4,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: theme.space[3],

    backgroundColor: theme.colors.primaryBackground,
  },

  publishBtnDisabled: {
    backgroundColor: theme.colors.button.secondaryBackground,
  },
  publishBtnTitleDisabled: {
    color: theme.colors.text.secondaryText,
  },

  iconContainerTab: {
    flex: 1,
    alignItems: "center",
    // paddingTop: theme.space[3] + 1,
    paddingBottom: theme.space[4] + 6,
  },

  buttonIcon: {
    alignItems: "center",
    justifyContent: "center",
    width: theme.space[6] + 6,
    height: theme.space[5] + 8,
    borderRadius: theme.radii.x,
    backgroundColor: "#F6F6F6",
  },
});
