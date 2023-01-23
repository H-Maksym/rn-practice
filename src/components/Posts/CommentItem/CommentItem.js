import { View, Text, Image } from "react-native";
import { stylesComment } from "./CommentItem.styled";

function CommentItem({
  image,
  isCurrentUser = false,
  comment,
  date,
  userImage,
}) {
  return (
    <View style={stylesComment.isCurrentUserComment(isCurrentUser)}>
      <View style={stylesComment.isCurrentUserWrapper(isCurrentUser)}>
        <Text style={stylesComment.text}>CommentText My first comment</Text>
        <Text style={stylesComment.isUserCurrentDate(isCurrentUser)}>
          09 June,2020 | 09:20
        </Text>
      </View>
      <Image style={stylesComment.userImg} />
    </View>
  );
}

export default CommentItem;
