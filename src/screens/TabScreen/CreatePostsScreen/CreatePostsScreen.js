<<<<<<< HEAD
import { useState, useEffect, useRef, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import * as Location from "expo-location";
import axios from "axios";
import { XMLParser } from "fast-xml-parser";

import useTakePhoto from "src/hooks/useTakePhoto";
import { useVisibleTabBar } from "src/hooks/useVisibleTabBar";
import { uploadPhoto } from "src/redux/auth/authOperations";
import { set, ref, push } from "firebase/database";
import app from "src/firebase/config";
=======
import { useState, useEffect, useRef, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import useTakePhoto from 'src/hooks/useTakePhoto';
>>>>>>> main

import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
<<<<<<< HEAD
} from "react-native";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import Container from "src/components/Common/Container";
import CustomCamera from "src/components/Common/Camera";
import Input from "src/components/Common/Input";
import Button from "src/components/Common/Button";
import ButtonIcon from "src/components/Common/ButtonIcon";

import { stylesCreatePostsScreen } from "./CreatePostsScreen.styled";
import { theme } from "src/utils/theme";
import { selectUser } from "../../../redux/auth/authSelectors";
import { useSelector } from "react-redux";
import ImageCompress from "../../../utils/compressImage";

const initialState = {
  photo: "",
  titlePost: "",
  place: "",
  location: "",
  placeTitle: "",
  likes: 0,
  comments: 0,
=======
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';

import Container from 'src/components/Common/Container';
import CustomCamera from 'src/components/Common/Camera';

import Input from 'src/components/Common/Input';
import Button from 'src/components/Common/Button';
import ButtonIcon from 'src/components/Common/ButtonIcon';

import { stylesCreatePostsScreen } from './CreatePostsScreen.styled';
import { theme } from 'src/utils/theme';
import { useVisibleTabBar } from '../../../hooks/useVisibleTabBar';

const initialState = {
  titlePost: '',
  location: '',
  photo: '',
>>>>>>> main
};

function CreatePostsScreen({ navigation, route }) {
  const { setVisibleBottom } = useVisibleTabBar();
<<<<<<< HEAD
  const [state, setState] = useState(initialState);

  const {
    cameraType,
    flashMode,
    isFullScreen,
=======
  const [prevScreen, setPrevScreen] = useState({});
  const [state, setState] = useState(initialState);
  const {
    hasCameraPermission,
    cameraType,
    flashMode,
    isFullScreen,
    setCameraPermission,
>>>>>>> main
    setCameraFullScreen,
    switchCamera,
    switchFlashMode,
    takePicture,
  } = useTakePhoto();
  const [errors, setErrors] = useState({});
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

<<<<<<< HEAD
  const { db } = app;
  const user = useSelector(selectUser);

  const cameraRef = useRef();
  const ref_location = useRef();

  const getLocation = async () => {
    const location = await Location.getCurrentPositionAsync({});
    const coordinates = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
    //INFO Place location
    try {
      const { data } = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?lat=${coordinates.latitude}&lon=${coordinates.longitude}`
      );
      const options = {
        ignoreAttributes: false,
      };
      const parser = new XMLParser(options);
      const jsonObj = parser.parse(data);
      const place = `${jsonObj.reversegeocode.addressparts.city},${jsonObj.reversegeocode.addressparts.country}`;
      const placeTitle = `${jsonObj.reversegeocode.addressparts.amenity}`;

      setState((prevState) => ({
        ...prevState,
        location: coordinates,
        place,
        placeTitle,
      }));
    } catch (error) {
      console.log("Set tittle location", error.message);
    }
  };
=======
  const cameraRef = useRef();
  const ref_location = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    setCameraPermission();
  }, []);
>>>>>>> main

  useFocusEffect(
    useCallback(() => {
      //INFO when focus screen
<<<<<<< HEAD
      getLocation();
      setVisibleBottom(false);
=======
>>>>>>> main
      return () => {
        //INFO when unfocus screen
        setState(initialState);
        setErrors({});
        setIsShowKeyboard(false);
        setCameraFullScreen(null);
<<<<<<< HEAD
        setVisibleBottom(true);
=======
>>>>>>> main
      };
    }, [])
  );

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <ButtonIcon
          title="go back"
          onPress={() => {
<<<<<<< HEAD
            navigation.navigate("Posts");
=======
            navigation.goBack();
>>>>>>> main
          }}
        >
          <Icon
            name="arrow-left"
            style={stylesCreatePostsScreen.headerIconGoBack}
            size={24}
          />
        </ButtonIcon>
      ),
      headerShown: !isFullScreen ? true : false,
<<<<<<< HEAD
=======
      // tabStyle: !isFullScreen
      //   ? { display: 'flex' }
      //   : { display: 'none', heights: 0 },
>>>>>>> main
    });
  }, [navigation, isShowKeyboard, isFullScreen]);

  const handleOnChange = (text, input) => {
<<<<<<< HEAD
    setState((prevState) => ({
=======
    setState(prevState => ({
>>>>>>> main
      ...prevState,
      [input]: text,
    }));
  };

  const validate = () => {
    Keyboard.dismiss();
    let valid = true;

    if (!state.titlePost) {
<<<<<<< HEAD
      handleError("Please input title", "titlePost");
      valid = false;
    } else if (state.titlePost.length < 3) {
      handleError("Min title length of 8", "titlePost");
=======
      handleError('Please input title', 'titlePost');
      valid = false;
    } else if (state.titlePost.length < 3) {
      handleError('Min title length of 8', 'titlePost');
>>>>>>> main
      valid = false;
      return;
    }

<<<<<<< HEAD
    if (!state.place) {
      handleError("Please input your place", "place");
      valid = false;
    } else if (!state.place.match(/\S+\,\S+/)) {
      handleError('Please input your location "City, Country', "place");
=======
    if (!state.location) {
      handleError('Please input your location', 'location');
      valid = false;
    } else if (!state.location.match(/\S+\,\S+/)) {
      handleError('Please input your location "City, Country', 'location');
>>>>>>> main
      valid = false;
    }
    if (valid) {
      sendInfoPost();
    }
  };

  const handleError = (errorMessage, input) => {
<<<<<<< HEAD
    setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
=======
    setErrors(prevState => ({ ...prevState, [input]: errorMessage }));
>>>>>>> main
  };

  const takePhoto = async () => {
    if (cameraRef.current) {
      try {
        setCameraFullScreen(true);
        const { uri } = await takePicture(cameraRef.current);
<<<<<<< HEAD
        const image = await ImageCompress(uri, { width: 1200, height: 600 });

        setState((prevState) => ({
          ...prevState,
          photo: image,
=======
        setState(prevState => ({
          ...prevState,
          photo: uri,
>>>>>>> main
        }));
      } catch (error) {
        console.log(error);
      } finally {
        setCameraFullScreen(false);
<<<<<<< HEAD
=======
        setVisibleBottom(true);
>>>>>>> main
      }
    }
  };

<<<<<<< HEAD
  const sendToDB = async () => {
    const photoURL = await uploadPhoto(state.photo, "posts");
    const postListRef = ref(db, "posts");
    const newPostRef = push(postListRef);
    set(newPostRef, {
      postData: {
        ...user,
        ...state,
        photo: photoURL,
        date: Date.now(),
      },
    });
  };

  const sendInfoPost = async () => {
    try {
      await sendToDB(state);
      setState(initialState);
      keyboardHide();
      navigation.navigate("Posts");
    } catch (error) {
      console.log(error.message);
    }
=======
  // Image.getSize(state.photo, (width, height) => {
  //   console.log(width);
  //   console.log(height);
  // });

  const sendInfoPost = () => {
    console.log('Info post', state);
    setState(initialState);
    keyboardHide();
>>>>>>> main
  };

  const keyboardHide = () => {
    Keyboard.dismiss();
    setIsShowKeyboard(false);
  };

  if (isFullScreen) {
    return (
      <CustomCamera
        takePhoto={takePhoto}
        switchCamera={switchCamera}
        switchFlashMode={switchFlashMode}
        type={cameraType}
        flash={flashMode}
        ref={cameraRef}
      />
    );
  }

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <Container
        style={{
<<<<<<< HEAD
          backgroundColor: "#FFFFFF",
=======
          backgroundColor: '#FFFFFF',
>>>>>>> main
        }}
      >
        <View style={stylesCreatePostsScreen.container}>
          <View
            style={{
              ...stylesCreatePostsScreen.imageContainer,
              opacity: isShowKeyboard ? 0.2 : 1,
            }}
          >
            {!state.photo ? (
              <>
                <View style={stylesCreatePostsScreen.imagePost}>
                  <View
                    style={{
                      ...stylesCreatePostsScreen.snapContainer,
<<<<<<< HEAD
                      backgroundColor: "#FFFFFF",
=======
                      backgroundColor: '#FFFFFF',
>>>>>>> main
                    }}
                  >
                    <Icon
                      onPress={() => {
                        setCameraFullScreen(true);
<<<<<<< HEAD
=======
                        setVisibleBottom(false);
>>>>>>> main
                      }}
                      name="camera"
                      size={24}
                      color="#BDBDBD"
                    />
                  </View>
                </View>
              </>
            ) : (
              <>
                <Image
                  source={{ uri: state.photo }}
                  alt="post picture"
                  style={{
                    ...stylesCreatePostsScreen.imagePost,
                  }}
<<<<<<< HEAD
=======
                  resizeMode="contain"
>>>>>>> main
                />
                <View
                  style={{
                    ...stylesCreatePostsScreen.snapContainer,
<<<<<<< HEAD
                    backgroundColor: "#FFFFFF20",
=======
                    backgroundColor: '#FFFFFF20',
>>>>>>> main
                  }}
                >
                  <Icon
                    onPress={() => {
<<<<<<< HEAD
                      setState((prevState) => ({
                        ...prevState,
                        photo: "",
                      }));
                      setCameraFullScreen(true);
=======
                      setState(prevState => ({
                        ...prevState,
                        photo: '',
                      }));
                      setCameraFullScreen(true);
                      setVisibleBottom(false);
>>>>>>> main
                    }}
                    name="camera"
                    size={24}
                    color="#FFFFFF40"
                  />
                </View>
              </>
            )}
          </View>
<<<<<<< HEAD
=======

>>>>>>> main
          {!state.photo ? (
            <Text style={stylesCreatePostsScreen.textAction}>Upload photo</Text>
          ) : (
            <Text style={stylesCreatePostsScreen.textAction}>Redact photo</Text>
          )}
<<<<<<< HEAD
=======

>>>>>>> main
          <View
            style={
              isShowKeyboard
                ? {
                    ...stylesCreatePostsScreen.inputContainerIsShownKeyboard,
                  }
                : { marginBottom: theme.space[5] }
            }
          >
            <Input
              styleInputContainer={stylesCreatePostsScreen.inputStyle}
              autoCapitalize="none"
              placeholder="Enter your post title"
              // iconName="chevron-right"
              value={state.titlePost}
              onFocus={() => {
<<<<<<< HEAD
                handleError(null, "titlePost");
                setIsShowKeyboard(true);
              }}
              onChangeText={(text) => handleOnChange(text, "titlePost")}
=======
                handleError(null, 'titlePost');
                setIsShowKeyboard(true);
              }}
              onChangeText={text => handleOnChange(text.trim(), 'titlePost')}
>>>>>>> main
              onSubmitEditing={() => ref_location.current.focus()}
              error={errors.titlePost}
            />

            <Input
              styleInputContainer={stylesCreatePostsScreen.inputStyle}
              autoCapitalize="none"
<<<<<<< HEAD
              placeholder="Enter your post place"
              iconName="map-marker-outline"
              value={state.place}
              onFocus={() => {
                handleError(null, "place");
                setIsShowKeyboard(true);
              }}
              onChangeText={(text) => handleOnChange(text, "place")}
              onSubmitEditing={() => keyboardHide()}
              error={errors.place}
              ref={ref_location}
            />
          </View>
          {!isShowKeyboard && (
            <Button
              title="Publish"
              activeOpacity={0.8}
              onPress={validate}
              style={
                !state.photo || !state.titlePost || !state.place
                  ? stylesCreatePostsScreen.publishBtnDisabled
                  : {}
              }
              styleTitle={
                !state.photo || !state.titlePost || !state.place
                  ? stylesCreatePostsScreen.publishBtnTitleDisabled
                  : {}
              }
              disabled={!state.photo || !state.titlePost || !state.place}
            />
          )}
        </View>
        <View style={stylesCreatePostsScreen.iconContainerTab}>
          <ButtonIcon
            style={stylesCreatePostsScreen.buttonIcon}
            onPress={() => {
              setState(initialState);
              navigation.navigate("Posts");
            }}
            // disabled={!state.photo && !state.titlePost && !state.place}
          >
            <Icon name="trash-can-outline" size={24} color={"#BDBDBD"} />
          </ButtonIcon>
=======
              placeholder="Enter your post location"
              iconName="map-marker-outline"
              value={state.location}
              onFocus={() => {
                handleError(null, 'location');
                setIsShowKeyboard(true);
              }}
              onChangeText={text => handleOnChange(text.trim(), 'location')}
              onSubmitEditing={() => keyboardHide()}
              error={errors.location}
              ref={ref_location}
            />
          </View>

          <Button
            title="Publish"
            activeOpacity={0.8}
            onPress={validate}
            style={
              !state.photo ? stylesCreatePostsScreen.publishBtnDisabled : {}
            }
            styleTitle={
              !state.photo
                ? stylesCreatePostsScreen.publishBtnTitleDisabled
                : {}
            }
            disabled={!state.photo}
          />
>>>>>>> main
        </View>
      </Container>
    </TouchableWithoutFeedback>
  );
}

export default CreatePostsScreen;
