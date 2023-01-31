import { useState, useCallback, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useVisibleTabBar } from 'src/hooks/useVisibleTabBar';

import { useSelector } from 'react-redux';
import { selectUser } from 'src/redux/auth/authSelectors';
import { snapshotToArray } from 'src/redux/auth/firebaseAPI';

import {
  View,
  TextInput,
  Image,
  FlatList,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import { set, ref, push, onValue, runTransaction } from 'firebase/database';
import app from 'src/firebase/config';

import Container from 'src/components/Common/Container';
import CommentItem from 'src/components/Posts/CommentItem/CommentItem';
import ButtonIcon from 'src/components/Common/ButtonIcon/ButtonIcon';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Loader from 'src/components/Common/Loader';
import { stylesCommentsScreen } from './CommentsScreen.styled';
import { theme } from 'src/utils/theme';

function CommentsScreen({ navigation, route }) {
  const { postId, image, fromScreen } = route.params;
  const { setVisibleBottom } = useVisibleTabBar();
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { userId, email, photoURL, userName } = useSelector(selectUser);
  const { db } = app;

  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', e =>
      setKeyboardHeight(e.endCoordinates.height)
    );
    const hideSubscription = Keyboard.addListener('keyboardWillHide', () =>
      setKeyboardHeight(0)
    );
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, [setKeyboardHeight]);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <ButtonIcon
          title="go-back"
          onPress={() => navigation.goBack()}
          // onPress={() => navigation.navigate(fromScreen)}
        >
          <Icon
            name="arrow-left"
            style={stylesCommentsScreen.headerIconGoBack}
            size={24}
          />
        </ButtonIcon>
      ),
    });
  }, [navigation]);

  useFocusEffect(
    useCallback(() => {
      //INFO when focus screen
      setVisibleBottom(false);
      return () => {
        //INFO when unfocus screen
        setVisibleBottom(true);
      };
    }, [])
  );

  useEffect(() => {
    getCommentsFromDB();
  }, []);

  const keyboardHide = () => {
    Keyboard.dismiss();
    setIsShowKeyboard(false);
  };

  const sendCommentsToDB = async () => {
    if (!comment.trim()) {
      setComment('');
      return false;
    }
    setIsLoading(true);
    try {
      setComment('');
      keyboardHide();

      const commentsRef = ref(db, 'posts/' + postId + '/comments');
      const newCommentsRef = push(commentsRef);
      set(newCommentsRef, {
        userId,
        userImage: photoURL,
        email,
        userName,
        text: comment,
        date: Date.now(),
      });
      const postRef = ref(db, `posts/${postId}/postData`);
      runTransaction(postRef, post => {
        post.comments++;
        return post;
      });
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getCommentsFromDB = async () => {
    const postListRef = ref(db, 'posts/' + postId + '/comments');
    onValue(postListRef, snapshot => {
      const commentsArray = snapshotToArray(snapshot);
      setComments(commentsArray);
    });
  };

  return (
    <Container style={{ backgroundColor: '#ffffff' }}>
      <View
        style={{
          // justifyContent: !isShowKeyboard ? "space-between" : "flex-start",
          ...stylesCommentsScreen.container,
          backgroundColor: '#ffffff',
        }}
      >
        <TouchableWithoutFeedback onPress={keyboardHide}>
          <Image
            source={{ uri: image }}
            style={stylesCommentsScreen.imageComments}
          />
        </TouchableWithoutFeedback>

        {!isShowKeyboard && comments.length >= 0 && (
          <FlatList
            // style={{ marginBottom: 20 }}
            data={comments}
            renderItem={({ item }) => (
              <CommentItem
                commentId={item.key}
                isCurrentUser={item.userId === userId ? true : false}
                comment={item.text}
                date={item.date}
                // countLikes={item.postData.likes}
                userImage={item.userImage}
                // navigation={navigation}
                // fromScreen={route.name}
              />
            )}
            keyExtractor={item => item.key}
          />
        )}
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{
            ...Platform.select({
              ios: {
                marginBottom: theme.space[4],
              },
              android: {
                marginBottom: isShowKeyboard
                  ? theme.space[7] + 60
                  : theme.space[4],
              },
            }),
          }}
        >
          <View
            style={{
              height: !isShowKeyboard ? 50 : 80,
              backgroundColor: !isShowKeyboard ? '#F6F6F6' : '#FFFFFF',
              borderColor: !isShowKeyboard ? '#FFFFFF' : '#F6F6F6',
              borderWidth: 1,
              ...stylesCommentsScreen.inputContainer,
            }}
          >
            <TextInput
              style={{
                ...stylesCommentsScreen.inputComments,
              }}
              multiline={isShowKeyboard ? true : false}
              placeholder="Enter your comments"
              value={comment}
              onChangeText={setComment}
              onFocus={() => setIsShowKeyboard(true)}
            />
            <ButtonIcon
              onPress={() => sendCommentsToDB()}
              style={{
                marginLeft: 'auto',
                width: 34,
                height: 34,
              }}
            >
              <Icon
                style={{ color: '#FF6C00' }}
                name="arrow-up-circle"
                size={34}
              />
            </ButtonIcon>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Container>
  );
}

export default CommentsScreen;
