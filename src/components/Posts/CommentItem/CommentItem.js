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
      <View style={stylesComment.wrapper}>
        <Text style={stylesComment.text}>CommentText My first comment</Text>
        <Text style={stylesComment.isUserCurrentDate(isCurrentUser)}>
          09 June,2020 | 09:20
        </Text>
      </View>
      <Image style={stylesComment.userImage} />
    </View>
  );
}

export default CommentItem;
