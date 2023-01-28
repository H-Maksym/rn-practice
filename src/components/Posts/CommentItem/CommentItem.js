import { View, Text, Image } from "react-native";
import { stylesComment } from "./CommentItem.styled";

function CommentItem({
  isCurrentUser = false,
  commentId,
  comment,
  date,
  userImage,
}) {
  function convertUTCDateToLocalDate(date) {
    if (date) {
      const time = new Date(date);
      return time.toLocaleString();
    }
  }

  return (
    <View style={stylesComment.isCurrentUserComment(isCurrentUser)}>
      <View style={stylesComment.isCurrentUserWrapper(isCurrentUser)}>
        <Text style={stylesComment.text}>{comment}</Text>
        <Text style={stylesComment.isUserCurrentDate(isCurrentUser)}>
          {convertUTCDateToLocalDate(date)}
          {/* 09 June,2020 | 09:20 */}
        </Text>
      </View>
      <Image source={{ uri: userImage }} style={stylesComment.userImg} />
    </View>
  );
}

export default CommentItem;
