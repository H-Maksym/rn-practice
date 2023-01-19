import { useState, useEffect, useRef, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';

import { theme } from 'src/utils/theme';
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
import Input from 'src/components/Common/Input';

import Button from 'src/components/Common/Button';
import ButtonIcon from 'src/components/Common/ButtonIcon';

import { stylesCreatePostsScreen } from './CreatePostsScreen.styled';

const initialState = {
  titlePost: '',
  location: '',
};

function CreatePostsScreen({ navigation }) {
  const [state, setState] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const ref_location = useRef();

  useFocusEffect(
    useCallback(() => {
      //INFO when focus screen
      return () => {
        //INFO when unfocus screen
        setState(initialState);
        setErrors({});
        setIsShowKeyboard(false);
      };
    }, [])
  );

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <ButtonIcon title="go back" onPress={() => navigation.goBack()}>
          <Icon
            name="arrow-left"
            style={stylesCreatePostsScreen.headerIconGoBack}
            size={24}
          />
        </ButtonIcon>
      ),
    });
  }, [navigation, isShowKeyboard]);

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

  const sendInfoPost = () => {
    console.log('Info post', state);
    setState(initialState);
    keyboardHide();
  };

  const keyboardHide = () => {
    Keyboard.dismiss();
    setIsShowKeyboard(false);
  };
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
            <View
              style={{
                ...stylesCreatePostsScreen.snapContainer,
                backgroundColor: '#FFFFFF',
              }}
              onPress={() => {
                console.log('Take photo');
              }}
            >
              <Icon name="camera" size={24} color="#BDBDBD" />
            </View>

            <Image style={stylesCreatePostsScreen.imagePost} />
          </View>
          <Text style={stylesCreatePostsScreen.textAction}>Upload photo</Text>
          {/* <Text  style={stylesCreatePostsScreen.textAction}>Redact photo</Text> */}
          <View
            style={
              isShowKeyboard
                ? { ...stylesCreatePostsScreen.inputContainerIsShownKeyboard }
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
          <Button title="Publish" activeOpacity={0.8} onPress={validate} />
        </View>
      </Container>
    </TouchableWithoutFeedback>
  );
}

export default CreatePostsScreen;
