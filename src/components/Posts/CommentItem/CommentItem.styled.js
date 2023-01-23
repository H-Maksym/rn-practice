import { StyleSheet } from "react-native";
import { theme } from "src/utils/theme";
export const stylesComment = StyleSheet.create({
  isCurrentUserComment: (isCurrentUser) => ({
    flexDirection: isCurrentUser ? "row" : "row-reverse",
  }),
  wrapper: {
    flex: 1,
    padding: 16,
  },
  text: {
    marginBottom: 8,
    fontFamily: "Roboto-Regular",
    fontSize: 13,
    lineHeight: 18,
    color: "#212121",
  },
  isUserCurrentDate: (isCurrentUser) => ({
    textAlign: isCurrentUser ? "left" : "right",
    fontFamily: "Roboto-Regular",
    fontSize: 10,
    lineHeight: 12,
    color: "#BDBDBD",
  }),
  userImage: {
    weight: 28,
    height: 28,
    borderRadius: 50,
    resizeMode: "cover",
  },
});
