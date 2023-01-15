import { useState, useRef } from 'react';
import {
  View,
  ImageBackground,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { formStyles } from 'src/components/Common/Form/Form.styled';
import Input from 'src/components/Common/Input';
import Button from 'src/components/Common/Button';
import Loader from 'src/components/Common/Loader';
import { theme } from 'src/utils/theme';
import { stylesLogin } from './LoginScreen.styled';

const initialState = {
  email: '',
  password: '',
};
function LoginScreen() {
  const [state, setState] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [loading, setLoading] = useState(false);

  const ref_password = useRef();

  const handleOnChange = (text, input) => {
    setState(prevState => ({
      ...prevState,
      [input]: text,
    }));
  };

  const validate = () => {
    Keyboard.dismiss();
    let valid = true;

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
    }

    if (valid) {
      login();
    }
  };

  const handleError = (errorMessage, input) => {
    setErrors(prevState => ({ ...prevState, [input]: errorMessage }));
  };

  const login = () => {
    setLoading(true);
    setTimeout(() => {
      try {
        console.log(state);
      } catch (error) {
        Alert.alert('Error', 'Something went wrong');
      } finally {
        setState(initialState);
        setLoading(false);
      }
    }, 3000);
  };

  const keyboardHide = () => {
    Keyboard.dismiss();
    setIsShowKeyboard(false);
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={stylesLogin.container}>
        <Loader visible={loading} />
        <ImageBackground
          source={require('src/assets/image/backgroundImage.jpg')}
          style={stylesLogin.imageBackground}
        >
          <View
            style={{
              ...formStyles.form,
            }}
          >
            <KeyboardAvoidingView
              behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
              style={{
                marginBottom: !isShowKeyboard
                  ? theme.space[5] + 14
                  : theme.space[7] + 12,
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
                    handleError(null, 'email');
                    setIsShowKeyboard(true);
                  }}
                  onChangeText={text => handleOnChange(text, 'email')}
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
                    handleError(null, 'password');
                    setIsShowKeyboard(true);
                  }}
                  onChangeText={text => handleOnChange(text, 'password')}
                  onSubmitEditing={() => keyboardHide()}
                  password
                  ref={ref_password}
                  error={errors.password}
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
              style={stylesLogin.gotoRegisterBtn}
              activeOpacity={0.7}
              onPress={() => console.log('goto login')}
            >
              <Text style={stylesLogin.gotoRegisterText}>
                Don't have an account? Register
              </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default LoginScreen;
