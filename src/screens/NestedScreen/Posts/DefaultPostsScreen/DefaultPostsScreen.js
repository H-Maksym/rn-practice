import { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { selectUser } from "src/redux/auth/authSelectors";

import { logout } from "src/redux/auth/authOperations";

import Icon from "react-native-vector-icons/Feather";
import { View, FlatList, SafeAreaView, StatusBar } from "react-native";
import Container from "src/components/Common/Container";
import ButtonIcon from "src/components/Common/ButtonIcon";

import UserData from "src/components/Posts/UserData";
import PostItem from "src/components/Posts/PostItem";

import { theme } from "src/utils/theme";
import { stylesPostScreen } from "./DefaultPostsScreen.styled";
import { ref, onValue } from "firebase/database";
import app from "src/firebase/config";
import { snapshotToArray } from "src/redux/auth/firebaseAPI";

import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

function DefaultPostsScreen({ navigation, route }) {
  const tabBarHeight = useBottomTabBarHeight();

  const { db } = app;
  const [posts, setPosts] = useState([]);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      //INFO when focus screen
      navigation.setOptions({
        headerRight: () => (
          <ButtonIcon title="log-out" onPress={logOut}>
            <Icon
              name="log-out"
              style={stylesPostScreen.headerIconLogOut}
              size={24}
            />
          </ButtonIcon>
        ),
      });
      return () => {
        //INFO when unfocus screen
      };
    }, [])
  );
  const getPostFromDB = async () => {
    const postListRef = ref(db, "posts/");
    onValue(postListRef, (snapshot) => {
      const newArray = snapshotToArray(snapshot);
      const userPosts = newArray
        .filter((data) => data.postData.userId === user.userId)
        .map((data) => {
          if (data.comments) {
            return {
              ...data,
              comments: Object.keys(data.comments).reduce((acc, id) => {
                acc.push({ id, ...data.comments[id] });
                return acc;
              }, []),
            };
          } else {
            return data;
          }
        })
        .reverse();
      setPosts(userPosts);
    });
  };

  useEffect(() => {
    getPostFromDB();
  }, []);

  // useEffect(() => {
  //   if (route.params?.postInfo) {
  //     const { postInfo } = route.params;
  //     setPosts((prevState) => [postInfo, ...prevState]);
  //   }
  // }, [route.params]);

  const logOut = () => {
    dispatch(logout());
  };

  // useEffect(() => {
  //   navigation.setOptions({
  //     headerLeft: () => (
  //       <ButtonIcon title="log-out" onPress={logOut}>
  //         <Icon
  //           name="log-out"
  //           style={stylesPostScreen.headerIconLogOut}
  //           size={24}
  //         />
  //       </ButtonIcon>
  //     ),
  //   });
  // }, [navigation]);

  return (
    <Container style={{ backgroundColor: theme.colors.primaryBackground }}>
      <View style={stylesPostScreen.containerPostScreen}>
        <UserData
          avatarUser={user.photoURL}
          userName={user.userName}
          email={user.email}
        />

        {posts.length >= 0 && (
          <FlatList
            style={{ marginBottom: tabBarHeight * 2 + 10 }}
            data={posts}
            renderItem={({ item }) => (
              <PostItem
                image={item.postData?.photo}
                title={item.postData?.titlePost}
                countComments={item.postData?.comments}
                countLikes={item.postData?.likes}
                coordinates={item.postData?.location}
                placeTitle={item.postData?.place}
                titlePlaceByCoordinates={item.postData?.placeTitle}
                navigation={navigation}
                fromScreen={route.name}
                postId={item.key}
              />
            )}
            keyExtractor={(item) => item.key}
          />
        )}
      </View>
    </Container>
  );
}

export default DefaultPostsScreen;
