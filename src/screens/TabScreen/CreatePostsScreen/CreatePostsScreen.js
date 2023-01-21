import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import useTakePhoto from 'src/hooks/useTakePhoto';

import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
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

const initialState = {
  titlePost: '',
  location: '',
  photo: '',
};

function CreatePostsScreen({ navigation, route }) {
  const [prevScreen, setPrevScreen] = useState({});
  const [state, setState] = useState(initialState);
  const {
    hasCameraPermission,
    cameraType,
    flashMode,
    isFullScreen,
    setCameraPermission,
    setCameraFullScreen,
    switchCamera,
    switchFlashMode,
    takePicture,
  } = useTakePhoto();
  const [errors, setErrors] = useState({});
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const cameraRef = useRef();
  const ref_location = useRef();
  useEffect(() => {
    setCameraPermission();
  }, []);

  useFocusEffect(
    useCallback(() => {
      //INFO when focus screen
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
            console.log(route.params);
            navigation.navigate(route.params?.prevScreen);
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
      tabStyle: !isFullScreen
        ? { display: 'flex' }
        : { display: 'none', heights: 0 },
    });
  }, [navigation, isShowKeyboard, isFullScreen, route]);

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

    if (!state.location) {
      handleError('Please input your location', 'location');
      valid = false;
    } else if (!state.location.match(/\S+\,\S+/)) {
      handleError('Please input your location "City, Country', 'location');
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
        setState(prevState => ({
          ...prevState,
          photo: uri,
        }));
      } catch (error) {
        console.log(error);
      } finally {
        setCameraFullScreen(false);
      }
    }
  };

  // Image.getSize(state.photo, (width, height) => {
  //   console.log(width);
  //   console.log(height);
  // });

  const sendInfoPost = () => {
    console.log('Info post', state);
    setState(initialState);
    keyboardHide();
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
                      onPress={() => setCameraFullScreen(true)}
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
                  resizeMode="contain"
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
              onChangeText={text => handleOnChange(text.trim(), 'titlePost')}
              onSubmitEditing={() => ref_location.current.focus()}
              error={errors.titlePost}
            />

            <Input
              styleInputContainer={stylesCreatePostsScreen.inputStyle}
              autoCapitalize="none"
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
        </View>
      </Container>
    </TouchableWithoutFeedback>
  );
}

export default CreatePostsScreen;
