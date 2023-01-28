<<<<<<< HEAD
import { View, ImageBackground, Text, Image, FlatList } from "react-native";
import { useEffect, useCallback, useState } from "react";
// import { useHeaderHeight } from '@react-navigation/elements';
import { useFocusEffect } from "@react-navigation/native";
import { useImagePicker } from "src/hooks/useImagePicker";

import { useDispatch, useSelector } from "react-redux";
import {
  updatePhotoAvatar,
  deletePhotoAvatar,
  logout,
} from "src/redux/auth/authOperations";
import { selectUser } from "src/redux/auth/authSelectors";

import Icon from "react-native-vector-icons/Feather";
import Container from "src/components/Common/Container";
import ButtonIcon from "src/components/Common/ButtonIcon";
import AddAvatar from "src/assets/icon/addAvatar.svg";
import PostItem from "src/components/Posts/PostItem";

import { stylesProfileScreen } from "./ProfileScreen.styled";
import { ref, onValue, push, set, runTransaction } from "firebase/database";
import app from "src/firebase/config";
import { snapshotToArray } from "src/redux/auth/firebaseAPI";

function ProfileScreen({ navigation, route }) {
  const { db } = app;
  const [posts, setPosts] = useState([]);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const { image, pickImage, resetImagePickerState } = useImagePicker();
  // const headerHeight = useHeaderHeight();
  // const [heightHeader] = useState(headerHeight);
=======
import { View, ImageBackground, Text } from 'react-native';
import { useEffect, useCallback } from 'react';
// import { useHeaderHeight } from '@react-navigation/elements';
import { useFocusEffect } from '@react-navigation/native';

import { useDispatch } from 'react-redux';
import { logout } from 'src/redux/auth/authSlice';

import Icon from 'react-native-vector-icons/Feather';
import Container from 'src/components/Common/Container';
import ButtonIcon from 'src/components/Common/ButtonIcon';
import AddAvatar from 'src/assets/icon/addAvatar.svg';
import PostItem from 'src/components/Posts/PostItem';

import { stylesProfileScreen } from './ProfileScreen.styled';

function ProfileScreen({ navigation }) {
  const dispatch = useDispatch();
  // const headerHeight = useHeaderHeight();
  // const [heightHeader] = useState(headerHeight);

>>>>>>> main
  useFocusEffect(
    useCallback(() => {
      //INFO when focus screen
      return () => {
        //INFO when unfocus screen
      };
    }, [])
  );

<<<<<<< HEAD
  const getPostFromDB = async () => {
    const postListRef = ref(db, "posts/");
    onValue(postListRef, (snapshot) => {
      const newArray = snapshotToArray(snapshot)
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

      setPosts(newArray);
    });
  };

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
    getPostFromDB();
  }, []);

  useEffect(() => {
    if (image) {
      dispatch(
        updatePhotoAvatar({ oldAvatar: user.photoURL, newAvatar: image })
      );
      resetImagePickerState();
    }
  }, [image]);

=======
  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);

>>>>>>> main
  const logOut = () => {
    dispatch(logout());
  };

  return (
<<<<<<< HEAD
    <Container style={{ backgroundColor: "#FFFFFF" }}>
      <ImageBackground
        source={require("src/assets/image/backgroundImage.jpg")}
=======
    <Container style={{ backgroundColor: '#FFFFFF' }}>
      <ImageBackground
        source={require('src/assets/image/backgroundImage.jpg')}
>>>>>>> main
        style={{
          ...stylesProfileScreen.imageBackground,
        }}
      >
        <View
          style={{
            ...stylesProfileScreen.containerProfileScreen,
            // marginTop: heightHeader,
            marginTop: 60,
          }}
        >
          <View style={stylesProfileScreen.avatarBox}>
<<<<<<< HEAD
            <Image
              source={{ uri: user.photoURL }}
              style={stylesProfileScreen.avatar}
            />
            <ButtonIcon
              style={stylesProfileScreen.addAvatarButton}
              title="add avatar"
              onPress={() => {
                if (!image) {
                  pickImage();
                } else {
                  resetImagePickerState();
                }
              }}
            >
              <AddAvatar
                style={stylesProfileScreen.changeAvatarStatus(user.photoURL)}
              />
=======
            <ButtonIcon
              style={stylesProfileScreen.addAvatarButton}
              title="add avatar"
              onPress={() => console.log('add avatar')}
            >
              <AddAvatar fill={'#FF6C00'} stroke={'#FF6C00'} />
>>>>>>> main
            </ButtonIcon>
          </View>

          <ButtonIcon
            title="log-out"
            onPress={logOut}
            style={stylesProfileScreen.buttonIconLogOut}
          >
            <Icon
              name="log-out"
              size={24}
              style={stylesProfileScreen.iconLogOut}
            />
          </ButtonIcon>

          <Text style={stylesProfileScreen.titleProfileScreen}>
<<<<<<< HEAD
            {user.name}
          </Text>

          {posts.length >= 0 && (
            <FlatList
              style={{ marginBottom: 20 }}
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
                  like
                  postId={item.key}
                  navigation={navigation}
                  fromScreen={route.name}
                />
              )}
              keyExtractor={(item) => item.key}
            />
          )}
=======
            Maksym Holovachuk
          </Text>

          <PostItem
            imagePost={'imageURL'}
            countCommentsPost={10}
            like
            countLikesPost={0}
            locationPost={"Ivano-Frankivs'k Region, Ukraine"}
          />
>>>>>>> main
        </View>
      </ImageBackground>
    </Container>
  );
}

export default ProfileScreen;
