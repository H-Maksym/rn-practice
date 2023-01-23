import { StyleSheet } from "react-native";
import { theme } from "src/utils/theme";
export const stylesCommentsScreen = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: theme.space[4],
  },

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

  inputCommentsContainer: {
    marginTop: "auto",
    marginBottom: 16,
    borderRadius: 100,
    backgroundColor: "#F6F6F6",
    height: 50,
  },

  inputComments: {},
});
