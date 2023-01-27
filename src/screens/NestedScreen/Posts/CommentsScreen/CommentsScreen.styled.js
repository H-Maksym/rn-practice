import { StyleSheet, Dimensions } from "react-native";
import { theme } from "src/utils/theme";
export const stylesCommentsScreen = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: theme.space[4],
  },
  headerIconGoBack: { marginLeft: 16, color: "#21212180" },
  commentsContainer: {},

  imageComments: {
    marginVertical: theme.space[5],
    height: theme.space[8] - 16,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: theme.radii.md,
    backgroundColor: theme.colors.imageBackground,
  },

  itemComments: {},

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: theme.space[4],
    borderRadius: 100,
    // height: 50,
  },

  inputComments: {
    width: Dimensions.get("window").width - 32 - 20 - 34,
    paddingVertical: theme.space[4],
    fontFamily: "Roboto-Regular",
    fontSize: theme.fontSizes.s,
    fontStyle: "normal",
    fontWeight: theme.fontWeights.normal,
    lineHeight: theme.lineHeights.dataText,
    color: theme.colors.text.primaryText,
  },
});
