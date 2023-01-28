<<<<<<< HEAD
import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { login } from "src/redux/auth/authOperations";
=======
import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { login } from 'src/redux/auth/authSlice';
>>>>>>> main
import {
  View,
  ImageBackground,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
<<<<<<< HEAD
} from "react-native";
import Container from "src/components/Common/Container";
import { formStyles } from "src/components/Common/Form/Form.styled";
import Input from "src/components/Common/Input";
import Button from "src/components/Common/Button";
import Loader from "src/components/Common/Loader";
import { theme } from "src/utils/theme";
import { stylesLogin } from "./LoginScreen.styled";

const initialState = {
  email: "",
  password: "",
=======
} from 'react-native';
import Container from 'src/components/Common/Container';
import { formStyles } from 'src/components/Common/Form/Form.styled';
import Input from 'src/components/Common/Input';
import Button from 'src/components/Common/Button';
import Loader from 'src/components/Common/Loader';
import { theme } from 'src/utils/theme';
import { stylesLogin } from './LoginScreen.styled';

const initialState = {
  email: '',
  password: '',
>>>>>>> main
};
function LoginScreen({ navigation }) {
  const [state, setState] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
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

    if (!state.email) {
<<<<<<< HEAD
      handleError("Please input email", "email");
      valid = false;
    } else if (!state.email.match(/\S+@\S+\.\S+/)) {
      handleError("Please input valid email", "email");
=======
      handleError('Please input email', 'email');
      valid = false;
    } else if (!state.email.match(/\S+@\S+\.\S+/)) {
      handleError('Please input valid email', 'email');
>>>>>>> main
      valid = false;
    }

    if (!state.password) {
<<<<<<< HEAD
      handleError("Please input your password", "password");
=======
      handleError('Please input your password', 'password');
>>>>>>> main
      valid = false;
    }

    //TODO розкоментувати для валідації полів
<<<<<<< HEAD
    if (valid) {
      handleLogin();
    }
  };

  const handleError = (errorMessage, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
  };

  const handleLogin = () => {
    dispatch(login(state));
    setState(initialState);
=======
    // if (valid) {
    handleLogin();
    // }
  };

  const handleError = (errorMessage, input) => {
    setErrors(prevState => ({ ...prevState, [input]: errorMessage }));
  };

  const handleLogin = () => {
    dispatch(login());

    // setLoading(true);
    // setTimeout(() => {
    //   try {
    //     console.log("hello")
    //   } catch (error) {
    //     Alert.alert('Error', 'Something went wrong');
    //   } finally {
    //     setState(initialState);
    //     setLoading(false);
    //   }
    // }, 3000);
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
          style={stylesLogin.imageBackground}
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
                <Text style={{ ...formStyles.titleForm, marginTop: 32 }}>
                  Login
                </Text>

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
                  ref={ref_password}
                  error={errors.password}
                />
              </View>
            </KeyboardAvoidingView>

            <Button
              style={{ marginBottom: 16 }}
              title="Login"
              activeOpacity={0.8}
              onPress={validate}
            />
            <TouchableOpacity
              style={stylesLogin.gotoRegisterBtn}
              activeOpacity={0.7}
<<<<<<< HEAD
              onPress={() => navigation.navigate("Registration")}
=======
              onPress={() => navigation.navigate('Registration')}
>>>>>>> main
            >
              <Text style={stylesLogin.gotoRegisterText}>
                Don't have an account? Register
              </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </Container>
    </TouchableWithoutFeedback>
  );
}

export default LoginScreen;
