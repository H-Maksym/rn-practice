import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import * as Location from 'expo-location';
import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';

import useTakePhoto from 'src/hooks/useTakePhoto';
import { useVisibleTabBar } from 'src/hooks/useVisibleTabBar';
import { uploadPhoto } from 'src/redux/auth/authOperations';
import app from 'src/firebase/config';
import { set, ref, push } from 'firebase/database';

import { useSelector } from 'react-redux';
import { selectUser } from 'src/redux/auth/authSelectors';
import ImageCompress from 'src/utils/compressImage';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Container from 'src/components/Common/Container';
import CustomCamera from 'src/components/Common/Camera';
import Input from 'src/components/Common/Input';
import Button from 'src/components/Common/Button';
import ButtonIcon from 'src/components/Common/ButtonIcon';

import { stylesCreatePostsScreen } from './CreatePostsScreen.styled';
import { theme } from 'src/utils/theme';

const initialState = {
  photo: '',
  titlePost: '',
  place: '',
  location: '',
  placeTitle: '',
  likes: 0,
  comments: 0,
};

function CreatePostsScreen({ navigation }) {
  const { setVisibleBottom } = useVisibleTabBar();
  const [state, setState] = useState(initialState);

  const {
    cameraType,
    flashMode,
    isFullScreen,
    setCameraFullScreen,
    switchCamera,
    switchFlashMode,
    takePicture,
  } = useTakePhoto();
  const [errors, setErrors] = useState({});
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
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

      setState(prevState => ({
        ...prevState,
        location: coordinates,
        place,
        placeTitle,
      }));
    } catch (error) {
      console.log('Set tittle location', error.message);
    }
  };

  useFocusEffect(
    useCallback(() => {
      //INFO when focus screen
      getLocation();
      setVisibleBottom(false);
      return () => {
        //INFO when unfocus screen
        setState(initialState);
        setErrors({});
        setIsShowKeyboard(false);
        setCameraFullScreen(null);
        setVisibleBottom(true);
      };
    }, [])
  );

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <ButtonIcon
          title="go back"
          onPress={() => {
            navigation.navigate('Posts');
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
    setState(prevState => ({
      ...prevState,
      [input]: text,
    }));
  };

  const validate = () => {
    Keyboard.dismiss();
    let valid = true;

    if (!state.titlePost) {
      handleError('Please input title', 'titlePost');
      valid = false;
    } else if (state.titlePost.length < 3) {
      handleError('Min title length of 8', 'titlePost');
      valid = false;
      return;
    }

    if (!state.place) {
      handleError('Please input your place', 'place');
      valid = false;
    } else if (!state.place.match(/\S+\,\S+/)) {
      handleError('Please input your location "City, Country', 'place');
      valid = false;
    }
    if (valid) {
      sendInfoPost();
    }
  };

  const handleError = (errorMessage, input) => {
    setErrors(prevState => ({ ...prevState, [input]: errorMessage }));
  };

  const takePhoto = async () => {
    if (cameraRef.current) {
      try {
        setCameraFullScreen(true);
        const { uri } = await takePicture(cameraRef.current);
        const image = await ImageCompress(uri, { width: 1200, height: 600 });

        setState(prevState => ({
          ...prevState,
          photo: image,
        }));
      } catch (error) {
        console.log(error);
      } finally {
        setCameraFullScreen(false);
      }
    }
  };

  const sendToDB = async () => {
    const photoURL = await uploadPhoto(state.photo, 'posts');
    const postListRef = ref(db, 'posts');
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
      navigation.navigate('Posts');
    } catch (error) {
      console.log(error.message);
    }
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
          backgroundColor: '#FFFFFF',
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
                      backgroundColor: '#FFFFFF',
                    }}
                  >
                    <Icon
                      onPress={() => {
                        setCameraFullScreen(true);
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
                    backgroundColor: '#FFFFFF20',
                  }}
                >
                  <Icon
                    onPress={() => {
                      setState(prevState => ({
                        ...prevState,
                        photo: '',
                      }));
                      setCameraFullScreen(true);
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
                handleError(null, 'titlePost');
                setIsShowKeyboard(true);
              }}
              onChangeText={text => handleOnChange(text, 'titlePost')}
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
                handleError(null, 'place');
                setIsShowKeyboard(true);
              }}
              onChangeText={text => handleOnChange(text, 'place')}
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
              navigation.navigate('Posts');
            }}
            // disabled={!state.photo && !state.titlePost && !state.place}
          >
            <Icon name="trash-can-outline" size={24} color={'#BDBDBD'} />
          </ButtonIcon>
        </View>
      </Container>
    </TouchableWithoutFeedback>
  );
}

export default CreatePostsScreen;
