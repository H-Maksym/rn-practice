import { View, Image, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import ButtonIcon from 'src/components/Common/ButtonIcon';
import { theme } from 'src/utils/theme';
import { stylesPostItem } from './PostItem.styled';
import CommentsIcon from 'src/assets/icon/isComments.svg';

function PostItem({
  imagePost,
  countCommentsPost,
  like,
  countLikesPost,
  locationPost,
}) {
  return (
    <View style={stylesPostItem.postListWrapper}>
      <View>
        <Image style={stylesPostItem.imagePost}></Image>
        <Text style={stylesPostItem.titlePost}>Title post</Text>
        <View style={stylesPostItem.detailPostWrapper}>
          <ButtonIcon
            style={{
              ...stylesPostItem.postCommentsWrapper,
            }}
            title="goto comments"
            onPress={() => console.log('Comments')}
          >
            {Number(countCommentsPost) === 0 ? (
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
                Number(countCommentsPost) !== 0
                  ? { color: theme.colors.text.primaryText }
                  : { color: theme.colors.text.secondaryText },
              ]}
            >
              {countCommentsPost}
            </Text>
          </ButtonIcon>

          {like && (
            <ButtonIcon
              style={stylesPostItem.postLikeWrapper}
              title="goto like"
              onPress={() => console.log('Like')}
            >
              <Icon
                name="thumbs-up"
                style={[
                  stylesPostItem.iconPostLike,
                  ,
                  Number(countLikesPost) !== 0
                    ? { color: theme.colors.button.accent }
                    : { color: theme.colors.button.iconLike },
                ]}
                size={18}
              />
              <Text
                style={[
                  stylesPostItem.textPostLike,
                  Number(countLikesPost) !== 0
                    ? { color: theme.colors.text.primaryText }
                    : { color: theme.colors.text.secondaryText },
                ]}
              >
                {countLikesPost}
              </Text>
            </ButtonIcon>
          )}

          <ButtonIcon
            style={stylesPostItem.postLocationWrapper}
            title="goto location"
            onPress={() => console.log('Location')}
          >
            <Icon
              name="map-pin"
              style={stylesPostItem.iconPostLocation}
              size={18}
            />
            <Text style={stylesPostItem.textPostLocation}>
              {like ? locationPost.split(', ')[1] : locationPost}
            </Text>
          </ButtonIcon>
        </View>
      </View>
    </View>
  );
}

export default PostItem;
