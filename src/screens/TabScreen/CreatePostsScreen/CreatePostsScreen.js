import { useState, useRef } from 'react';
import { theme } from 'src/utils/theme';
import {
  View,
  Text,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto';

import Container from 'src/components/Common/Container';
import Input from 'src/components/Common/Input';

import Button from 'src/components/Common/Button';
import ButtonIcon from 'src/components/Common/ButtonIcon';

import { stylesCreatePostsScreen } from './CreatePostsScreen.styled';

const initialState = {
  title: '',
  location: '',
};

function CreatePostsScreen() {
  const [state, setState] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const ref_location = useRef();

  const handleOnChange = (text, input) => {
    setState(prevState => ({
      ...prevState,
      [input]: text,
    }));
  };

  const validate = () => {
    Keyboard.dismiss();
    let valid = true;

    if (!state.title) {
      handleError('Please input login', 'login');
      valid = false;
    } else if (state.title.length < 3) {
      handleError('Min title length of 8', 'title');
      valid = false;
    }

    if (!state.location) {
      handleError('Please input your location', 'location');
      valid = false;
    } else if (!state.email.match(/\S+\,\S+/)) {
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
    console.log('Info post');
  };

  const keyboardHide = () => {
    Keyboard.dismiss();
    setIsShowKeyboard(false);
  };
  return (
    <Container style={{ backgroundColor: '#FFFFFF' }}>
      <View style={stylesCreatePostsScreen.container}>
        <View style={stylesCreatePostsScreen.imageContainer}>
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
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{
            ...Platform.select({
              ios: {
                marginBottom: !isShowKeyboard
                  ? theme.space[5] + 14
                  : theme.space[7] + 12,
              },
              android: {
                marginBottom: theme.space[4],
              },
            }),
          }}
        >
          <Input
            autoCapitalize="none"
            placeholder="Enter your post title"
            // iconName="chevron-right"
            value={state.title}
            onFocus={() => {
              handleError(null, 'password');
              setIsShowKeyboard(true);
            }}
            onChangeText={text => handleOnChange(text, 'title')}
            onSubmitEditing={() => ref_location.current.focus()}
            error={errors.title}
          />

          <Input
            autoCapitalize="none"
            placeholder="Enter your post location"
            iconName="map-marker-outline"
            value={state.location}
            onFocus={() => {
              handleError(null, 'password');
              setIsShowKeyboard(true);
            }}
            onChangeText={text => handleOnChange(text, 'location')}
            onSubmitEditing={() => keyboardHide()}
            error={errors.location}
            ref={ref_location}
          />
        </KeyboardAvoidingView>
        <Button
          title="Publish"
          activeOpacity={0.8}
          onPress={() => console.log('Publish')}
        />
      </View>
    </Container>
  );
}

export default CreatePostsScreen;
