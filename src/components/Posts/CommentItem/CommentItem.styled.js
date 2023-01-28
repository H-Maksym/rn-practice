import { StyleSheet } from "react-native";
import { theme } from "src/utils/theme";
export const stylesComment = StyleSheet.create({
  isCurrentUserComment: (isCurrentUser) => ({
    flexDirection: isCurrentUser ? "row" : "row-reverse",
    marginBottom: 24,
  }),
  isCurrentUserWrapper: (isCurrentUser) => ({
    flex: 1,
    marginRight: isCurrentUser ? 16 : 0,
    marginLeft: isCurrentUser ? 0 : 16,

    padding: 16,
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
  }),
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
  imgWrapper: {},

  userImg: {
    backgroundColor: "#F6F6F6",
    display: "flex",
    width: 28,
    height: 28,
    borderRadius: 50,
    resizeMode: "cover",
  },
});
