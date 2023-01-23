import { useEffect, useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";

import { logout } from "src/redux/auth/authSlice";

import Icon from "react-native-vector-icons/Feather";
import { View, ScrollView } from "react-native";
import Container from "src/components/Common/Container";
import ButtonIcon from "src/components/Common/ButtonIcon";

import UserData from "src/components/Posts/UserData";
import PostItem from "src/components/Posts/PostItem";

import { theme } from "src/utils/theme";
import { stylesPostScreen } from "./DefaultPostsScreen.styled";

function DefaultPostsScreen({ navigation, route }) {
  const [posts, setPosts] = useState([]);

  const dispatch = useDispatch();
  useFocusEffect(
    useCallback(() => {
      //INFO when focus screen
      return () => {
        //INFO when unfocus screen
      };
    }, [])
  );

  useEffect(() => {
    if (route.params?.postInfo) {
      const { postInfo } = route.params;
      setPosts((prevState) => [postInfo, ...prevState]);
    }
  }, [route.params]);

  const logOut = () => {
    dispatch(logout());
    // navigation.navigate('Login');
  };

  useEffect(() => {
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
  }, [navigation]);

  return (
    <Container style={{ backgroundColor: theme.colors.primaryBackground }}>
      <View style={stylesPostScreen.containerPostScreen}>
        <UserData
          avatarUser="avatar"
          userName="Maksym"
          userSurName="Holovachuk"
          email="maksym@gmail.com"
        />

        {posts.length >= 0 && (
          <ScrollView>
            {posts.map((item, idx) => (
              <PostItem
                key={idx}
                image={item.photo}
                title={item.titlePost}
                countComments={item.comments}
                countLikes={item.likes}
                coordinates={item.location}
                placeTitle={item.place}
                titlePlaceByCoordinates={item.placeTitle}
                navigation={navigation}
              />
            ))}
          </ScrollView>
        )}
      </View>
    </Container>
  );
}

export default DefaultPostsScreen;
