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
import { stylesRegistration } from './RegistrationScreen.styled';
import AddAvatar from 'src/assets/icon/addAvatar.svg';

const initialState = {
  login: '',
  email: '',
  password: '',
};

function RegistrationScreen() {
  const [state, setState] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [loading, setLoading] = useState(false);

  const ref_email = useRef();
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

    if (!state.login) {
      handleError('Please input login', 'login');
      valid = false;
    }
    if (!state.email) {
      handleError('Please input email', 'email');
      valid = false;
    } else if (!state.email.match(/\S+@\S+\.\S+/)) {
      handleError('Please input valid email', 'email');
    }
    if (!state.password) {
      handleError('Please input your password', 'password');
      valid = false;
    } else if (state.password.length < 8) {
      handleError('Min password length of 8', 'password');
      valid = false;
    }

    if (valid) {
      register();
    }
  };

  const handleError = (errorMessage, input) => {
    setErrors(prevState => ({ ...prevState, [input]: errorMessage }));
  };

  const register = () => {
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
      <View style={stylesRegistration.container}>
        <Loader visible={loading} />
        <ImageBackground
          source={require('src/assets/image/backgroundImage.jpg')}
          style={stylesRegistration.imageBackground}
        >
          <View
            style={{
              ...formStyles.form,
            }}
          >
            <KeyboardAvoidingView
              behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
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
                  <TouchableOpacity
                    style={stylesRegistration.addAvatarButton}
                    activeOpacity={0.7}
                    accessibilityLabel="add avatar"
                    onPress={() => console.log('add avatar')}
                  >
                    <AddAvatar fill={'#FF6C00'} stroke={'#FF6C00'} />
                  </TouchableOpacity>
                </View>
                <Input
                  // style={{ marginBottom: 8 }}
                  // autoCapitalize="none"
                  placeholder="Enter your login"
                  iconName="account-outline"
                  value={state.login}
                  onFocus={() => {
                    handleError(null, 'login');
                    setIsShowKeyboard(true);
                  }}
                  onChangeText={text => handleOnChange(text, 'login')}
                  onSubmitEditing={() => ref_email.current.focus()}
                  // returnKeyType="next"
                  error={errors.login}
                />
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
                  ref={ref_email}
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
              onPress={() => console.log('goto login')}
            >
              <Text style={stylesRegistration.gotoLoginText}>
                Already have an account? Login
              </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default RegistrationScreen;
