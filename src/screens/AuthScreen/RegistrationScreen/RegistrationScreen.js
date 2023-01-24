import { useState, useRef } from "react";
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
};

function RegistrationScreen({ navigation }) {
  const [state, setState] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [loading, setLoading] = useState(false);
  const { image, pickImage, resetImagePickerState } = useImagePicker();
  const dispatch = useDispatch();
  const ref_email = useRef();
  const ref_password = useRef();

  const handleOnChange = (text, input) => {
    setState((prevState) => ({
      ...prevState,
      [input]: text,
    }));
  };

  const validate = () => {
    Keyboard.dismiss();
    let valid = true;

    if (!state.name) {
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
      valid = false;
    }

    if (valid) {
      handleSubmit();
    }
  };

  const handleError = (errorMessage, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
  };

  const handleSubmit = () => {
    dispatch(register({ ...state, image }));
    setState(initialState);
    resetImagePickerState();
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
          source={require("src/assets/image/backgroundImage.jpg")}
          style={stylesRegistration.imageBackground}
        >
          <View
            style={{
              ...formStyles.form,
            }}
          >
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
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
                    handleError(null, "name");
                    setIsShowKeyboard(true);
                  }}
                  onChangeText={(text) => handleOnChange(text, "name")}
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
                    handleError(null, "email");
                    setIsShowKeyboard(true);
                  }}
                  onChangeText={(text) => handleOnChange(text, "email")}
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
                    handleError(null, "password");
                    setIsShowKeyboard(true);
                  }}
                  onChangeText={(text) => handleOnChange(text, "password")}
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
              onPress={() => navigation.navigate("Login")}
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
