import { View, Image, Text } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import ButtonIcon from "src/components/Common/ButtonIcon";
import { theme } from "src/utils/theme";
import { stylesPostItem } from "./PostItem.styled";
import CommentsIcon from "src/assets/icon/isComments.svg";
import {
  ref,
  onValue,
  push,
  set,
  runTransaction,
  remove,
} from "firebase/database";
import app from "src/firebase/config";
import { snapshotToArray } from "src/redux/auth/firebaseAPI";
import { useSelector } from "react-redux";
import { selectUser } from "src/redux/auth/authSelectors";
import { useCallback } from "react";

function PostItem({
  image,
  title,
  countComments,
  countLikes,
  coordinates,
  placeTitle,
  titlePlaceByCoordinates,
  like,
  postId,
  navigation,
  fromScreen,
}) {
  const { db } = app;
  const user = useSelector(selectUser);

  const sendLikeToDB = () => {
    const likesRef = ref(db, "posts/" + postId + "/likes");
    const postRef = ref(db, `posts/${postId}/postData`);
    const newLikesRef = push(likesRef);
    let keyUserId;
    onValue(
      likesRef,
      async (snapshot) => {
        const likesArray = snapshotToArray(snapshot);
        const isUserLike = likesArray.find((item) => {
          keyUserId = item.key;
          return item.userId === user.userId;
        });

        runTransaction(postRef, (post) => {
          if (!isUserLike) {
            set(newLikesRef, { userId: user.userId });
            post.likes++;
          } else {
            const userRef = ref(db, "posts/" + postId + "/likes/" + keyUserId);
            remove(userRef);
            post.likes--;
          }
          return post;
        });
      },
      {
        onlyOnce: true,
      }
    );
  };

  return (
    <View style={stylesPostItem.postListWrapper}>
      <View>
        <Image source={{ uri: image }} style={stylesPostItem.imagePost}></Image>
        <Text style={stylesPostItem.titlePost}>{title}</Text>
        <View style={stylesPostItem.detailPostWrapper}>
          <ButtonIcon
            style={{
              ...stylesPostItem.postCommentsWrapper,
            }}
            title="goto comments"
            onPress={() => navigation.navigate("Comments")}
          >
            {Number(countComments) === 0 ? (
              <Icon
                name="message-circle"
                style={stylesPostItem.iconPostComments}
                size={18}
              />
            ) : (
              <CommentsIcon style={stylesPostItem.fillIconPostComments} />
            )}

            <Text
              style={[
                stylesPostItem.textPostComments,
                Number(countComments) !== 0
                  ? { color: theme.colors.text.primaryText }
                  : { color: theme.colors.text.secondaryText },
              ]}
            >
              {countComments}
            </Text>
          </ButtonIcon>

          {like && (
            <ButtonIcon
              style={stylesPostItem.postLikeWrapper}
              title="goto like"
              onPress={sendLikeToDB}
            >
              <Icon
                name="thumbs-up"
                style={[
                  stylesPostItem.iconPostLike,
                  ,
                  Number(countLikes) !== 0
                    ? { color: theme.colors.button.accent }
                    : { color: theme.colors.button.iconLike },
                ]}
                size={18}
              />
              <Text
                style={[
                  stylesPostItem.textPostLike,
                  Number(countLikes) !== 0
                    ? { color: theme.colors.text.primaryText }
                    : { color: theme.colors.text.secondaryText },
                ]}
              >
                {countLikes}
              </Text>
            </ButtonIcon>
          )}

          <ButtonIcon
            style={stylesPostItem.postLocationWrapper}
            title="goto location"
            onPress={() =>
              navigation.navigate("Map", {
                location: {
                  coordinates: coordinates,
                  titlePlaceByCoordinates: titlePlaceByCoordinates,
                  fromScreen: fromScreen,
                },
              })
            }
          >
            <Icon
              name="map-pin"
              style={stylesPostItem.iconPostLocation}
              size={18}
            />
            <Text style={stylesPostItem.textPostLocation}>
              {like ? placeTitle?.split(",")[1] : placeTitle}
            </Text>
          </ButtonIcon>
        </View>
      </View>
    </View>
  );
}

export default PostItem;
