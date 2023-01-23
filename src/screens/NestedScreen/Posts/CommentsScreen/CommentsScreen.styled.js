import { StyleSheet } from "react-native";
import { theme } from "src/utils/theme";
export const stylesCommentsScreen = StyleSheet.create({
  container: {
    paddingHorizontal: theme.space[4],
  },

  commentsContainer: {},

  imageComments: {
    marginBottom: theme.space[5],
    height: theme.space[8] - 16,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: theme.radii.md,
    backgroundColor: theme.colors.imageBackground,
  },

  itemComments: {},

  inputCommentsContainer: {},

  inputComments: {},
});
