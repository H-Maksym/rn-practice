import { useState, useEffect, useRef, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import * as Location from "expo-location";
import axios from "axios";
import { XMLParser } from "fast-xml-parser";

import { useDispatch } from "react-redux";
import useTakePhoto from "src/hooks/useTakePhoto";
import { useVisibleTabBar } from "src/hooks/useVisibleTabBar";

import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  // KeyboardAvoidingView,
  // Platform,
} from "react-native";

import Icon from "react-native-vector-icons/Feather";

import Container from "src/components/Common/Container";
import CustomCamera from "src/components/Common/Camera";

import Input from "src/components/Common/Input";
import Button from "src/components/Common/Button";
import ButtonIcon from "src/components/Common/ButtonIcon";

import { stylesCreatePostsScreen } from "./CreatePostsScreen.styled";
import { theme } from "src/utils/theme";

const initialState = {
  photo: "",
  titlePost: "",
  place: "",
  location: "",
  placeTitle: "",
  likes: 0,
  comments: 0,
};

function CreatePostsScreen({ navigation, route }) {
  const { setVisibleBottom } = useVisibleTabBar();

  const [state, setState] = useState(initialState);
  const {
    // hasCameraPermission,
    cameraType,
    flashMode,
    isFullScreen,
    // setCameraPermission,
    setCameraFullScreen,
    switchCamera,
    switchFlashMode,
    takePicture,
  } = useTakePhoto();
  const [errors, setErrors] = useState({});
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const cameraRef = useRef();
  const ref_location = useRef();
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   setCameraPermission();
  //   (async () => {
  //     let { status } = await Location.requestForegroundPermissionsAsync();
  //     if (status !== "granted") {
  //       return;
  //     }
  //   })();
  // }, []);

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

  useFocusEffect(
    useCallback(() => {
      //INFO when focus screen
      getLocation();
      return () => {
        //INFO when unfocus screen
        setState(initialState);
        setErrors({});
        setIsShowKeyboard(false);
        setCameraFullScreen(null);
      };
    }, [])
  );

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <ButtonIcon
          title="go back"
          onPress={() => {
            navigation.goBack();
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
    });
  }, [navigation, isShowKeyboard, isFullScreen]);

  const handleOnChange = (text, input) => {
    setState((prevState) => ({
      ...prevState,
      [input]: text,
    }));
  };

  const validate = () => {
    Keyboard.dismiss();
    let valid = true;

    if (!state.titlePost) {
      handleError("Please input title", "titlePost");
      valid = false;
    } else if (state.titlePost.length < 3) {
      handleError("Min title length of 8", "titlePost");
      valid = false;
      return;
    }

    if (!state.place) {
      handleError("Please input your place", "place");
      valid = false;
    } else if (!state.place.match(/\S+\,\S+/)) {
      handleError('Please input your location "City, Country', "place");
      valid = false;
    }
    if (valid) {
      sendInfoPost();
    }
  };

  const handleError = (errorMessage, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
  };

  const takePhoto = async () => {
    if (cameraRef.current) {
      try {
        setCameraFullScreen(true);
        const { uri } = await takePicture(cameraRef.current);
        setState((prevState) => ({
          ...prevState,
          photo: uri,
        }));
      } catch (error) {
        console.log(error);
      } finally {
        setCameraFullScreen(false);
        setVisibleBottom(true);
      }
    }
  };

  // Image.getSize(state.photo, (width, height) => {
  //   console.log(width);
  //   console.log(height);
  // });

  const sendInfoPost = async () => {
    setState(initialState);
    keyboardHide();
    navigation.navigate("Posts", { postInfo: state });
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
          backgroundColor: "#FFFFFF",
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
                      backgroundColor: "#FFFFFF",
                    }}
                  >
                    <Icon
                      onPress={() => {
                        setCameraFullScreen(true);
                        setVisibleBottom(false);
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
                />
                <View
                  style={{
                    ...stylesCreatePostsScreen.snapContainer,
                    backgroundColor: "#FFFFFF20",
                  }}
                >
                  <Icon
                    onPress={() => {
                      setState((prevState) => ({
                        ...prevState,
                        photo: "",
                      }));
                      setCameraFullScreen(true);
                      setVisibleBottom(false);
                    }}
                    name="camera"
                    size={24}
                    color="#FFFFFF40"
                  />
                </View>
              </>
            )}
          </View>

          {!state.photo ? (
            <Text style={stylesCreatePostsScreen.textAction}>Upload photo</Text>
          ) : (
            <Text style={stylesCreatePostsScreen.textAction}>Redact photo</Text>
          )}

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
                handleError(null, "titlePost");
                setIsShowKeyboard(true);
              }}
              onChangeText={(text) => handleOnChange(text.trim(), "titlePost")}
              onSubmitEditing={() => ref_location.current.focus()}
              error={errors.titlePost}
            />

            <Input
              styleInputContainer={stylesCreatePostsScreen.inputStyle}
              autoCapitalize="none"
              placeholder="Enter your post place"
              iconName="map-marker-outline"
              value={state.place}
              onFocus={() => {
                handleError(null, "place");
                setIsShowKeyboard(true);
              }}
              onChangeText={(text) => handleOnChange(text.trim(), "place")}
              onSubmitEditing={() => keyboardHide()}
              error={errors.place}
              ref={ref_location}
            />
          </View>

          <Button
            title="Publish"
            activeOpacity={0.8}
            onPress={validate}
            style={
              !state.photo && !state.titlePost && !state.place
                ? stylesCreatePostsScreen.publishBtnDisabled
                : {}
            }
            styleTitle={
              !state.photo && !state.titlePost && !state.place
                ? stylesCreatePostsScreen.publishBtnTitleDisabled
                : {}
            }
            disabled={!state.photo && !state.titlePost && !state.place}
          />
        </View>
      </Container>
    </TouchableWithoutFeedback>
  );
}

export default CreatePostsScreen;
