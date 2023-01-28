<<<<<<< HEAD
import { useState, useRef } from "react";
=======
import { useState, useRef } from 'react';
>>>>>>> main
import {
  View,
  ImageBackground,
  Text,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Alert,
<<<<<<< HEAD
} from "react-native";
import { useImagePicker } from "src/hooks/useImagePicker";

import Container from "src/components/Common/Container";
import { formStyles } from "src/components/Common/Form/Form.styled";
import Input from "src/components/Common/Input";
import Button from "src/components/Common/Button";
import Loader from "src/components/Common/Loader";
import { theme } from "src/utils/theme";
import { stylesRegistration } from "./RegistrationScreen.styled";
import AddAvatar from "src/assets/icon/addAvatar.svg";
import { useDispatch } from "react-redux";
import { register } from "src/redux/auth/authOperations";

const initialState = {
  name: "",
  email: "",
  password: "",
=======
} from 'react-native';
import { useImagePicker } from 'src/hooks/useImagePicker';

import Container from 'src/components/Common/Container';
import { formStyles } from 'src/components/Common/Form/Form.styled';
import Input from 'src/components/Common/Input';
import Button from 'src/components/Common/Button';
import Loader from 'src/components/Common/Loader';
import { theme } from 'src/utils/theme';
import { stylesRegistration } from './RegistrationScreen.styled';
import AddAvatar from 'src/assets/icon/addAvatar.svg';

const initialState = {
  name: '',
  email: '',
  password: '',
>>>>>>> main
};

function RegistrationScreen({ navigation }) {
  const [state, setState] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [loading, setLoading] = useState(false);
  const { image, pickImage, resetImagePickerState } = useImagePicker();
<<<<<<< HEAD
  const dispatch = useDispatch();
=======

>>>>>>> main
  const ref_email = useRef();
  const ref_password = useRef();

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

    if (!state.name) {
<<<<<<< HEAD
      handleError("Please input name", "name");
      valid = false;
    }
    if (!state.email) {
      handleError("Please input email", "email");
      valid = false;
    } else if (!state.email.match(/\S+@\S+\.\S+/)) {
      handleError("Please input valid email", "email");
      valid = false;
    }
    if (!state.password) {
      handleError("Please input your password", "password");
      valid = false;
    } else if (state.password.length < 8) {
      handleError("Min password length of 8", "password");
=======
      handleError('Please input name', 'name');
      valid = false;
    }
    if (!state.email) {
      handleError('Please input email', 'email');
      valid = false;
    } else if (!state.email.match(/\S+@\S+\.\S+/)) {
      handleError('Please input valid email', 'email');
      valid = false;
    }
    if (!state.password) {
      handleError('Please input your password', 'password');
      valid = false;
    } else if (state.password.length < 8) {
      handleError('Min password length of 8', 'password');
>>>>>>> main
      valid = false;
    }

    if (valid) {
<<<<<<< HEAD
      handleSubmit();
=======
      register();
>>>>>>> main
    }
  };

  const handleError = (errorMessage, input) => {
<<<<<<< HEAD
    setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
  };

  const handleSubmit = () => {
    dispatch(register({ ...state, image }));
    setState(initialState);
    resetImagePickerState();
=======
    setErrors(prevState => ({ ...prevState, [input]: errorMessage }));
  };

  const register = () => {
    setLoading(true);
    setTimeout(() => {
      try {
        console.log({ ...state, image });
      } catch (error) {
        Alert.alert('Error', 'Something went wrong');
      } finally {
        setState(initialState);
        resetImagePickerState();
        setLoading(false);
      }
    }, 3000);
>>>>>>> main
  };

  const keyboardHide = () => {
    Keyboard.dismiss();
    setIsShowKeyboard(false);
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <Container>
        <Loader visible={loading} />
        <ImageBackground
<<<<<<< HEAD
          source={require("src/assets/image/backgroundImage.jpg")}
=======
          source={require('src/assets/image/backgroundImage.jpg')}
>>>>>>> main
          style={stylesRegistration.imageBackground}
        >
          <View
            style={{
              ...formStyles.form,
            }}
          >
            <KeyboardAvoidingView
<<<<<<< HEAD
              behavior={Platform.OS === "ios" ? "padding" : "height"}
=======
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
>>>>>>> main
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
              <View>
                <Text style={{ ...formStyles.titleForm, marginTop: 92 }}>
                  Register
                </Text>

                <View style={stylesRegistration.avatarBox}>
                  {image && (
                    <Image
                      source={{ uri: image }}
                      style={stylesRegistration.avatar}
                    />
                  )}
                  <TouchableOpacity
                    style={stylesRegistration.addAvatarButton}
                    activeOpacity={0.7}
                    accessibilityLabel="add avatar"
                    onPress={() => {
                      if (!image) {
                        pickImage();
                      } else {
                        resetImagePickerState();
                      }
                    }}
                  >
                    <AddAvatar
                      style={stylesRegistration.changeAvatarStatus(image)}
                    />
                  </TouchableOpacity>
                </View>
                <Input
                  // style={{ marginBottom: 8 }}
                  // autoCapitalize="none"
                  placeholder="Enter your name"
                  iconName="account-outline"
                  value={state.name}
                  onFocus={() => {
<<<<<<< HEAD
                    handleError(null, "name");
                    setIsShowKeyboard(true);
                  }}
                  onChangeText={(text) => handleOnChange(text, "name")}
=======
                    handleError(null, 'name');
                    setIsShowKeyboard(true);
                  }}
                  onChangeText={text => handleOnChange(text, 'name')}
>>>>>>> main
                  onSubmitEditing={() => ref_email.current.focus()}
                  returnKeyType="next"
                  error={errors.name}
                />
                <Input
                  autoCapitalize="none"
                  keyboardType="email-address"
                  // style={{ marginBottom: 8 }}
                  placeholder="Enter your email address"
                  iconName="email-outline"
                  value={state.email}
                  onFocus={() => {
<<<<<<< HEAD
                    handleError(null, "email");
                    setIsShowKeyboard(true);
                  }}
                  onChangeText={(text) => handleOnChange(text, "email")}
=======
                    handleError(null, 'email');
                    setIsShowKeyboard(true);
                  }}
                  onChangeText={text => handleOnChange(text, 'email')}
>>>>>>> main
                  onSubmitEditing={() => ref_password.current.focus()}
                  returnKeyType="next"
                  error={errors.email}
                  ref={ref_email}
                />
                <Input
                  autoCapitalize="none"
                  placeholder="Enter your password"
                  iconName="lock-outline"
                  value={state.password}
                  onFocus={() => {
<<<<<<< HEAD
                    handleError(null, "password");
                    setIsShowKeyboard(true);
                  }}
                  onChangeText={(text) => handleOnChange(text, "password")}
=======
                    handleError(null, 'password');
                    setIsShowKeyboard(true);
                  }}
                  onChangeText={text => handleOnChange(text, 'password')}
>>>>>>> main
                  onSubmitEditing={() => keyboardHide()}
                  password
                  returnKeyType="next"
                  error={errors.password}
                  ref={ref_password}
                />
              </View>
            </KeyboardAvoidingView>

            <Button
              style={{ marginBottom: 16 }}
              title="Register"
              activeOpacity={0.8}
              onPress={validate}
            />
            <TouchableOpacity
              style={stylesRegistration.gotoLoginBtn}
              activeOpacity={0.7}
<<<<<<< HEAD
              onPress={() => navigation.navigate("Login")}
=======
              onPress={() => navigation.navigate('Login')}
>>>>>>> main
            >
              <Text style={stylesRegistration.gotoLoginText}>
                Already have an account? Login
              </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </Container>
    </TouchableWithoutFeedback>
  );
}

export default RegistrationScreen;
