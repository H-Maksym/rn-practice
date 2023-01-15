import { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { formStyles } from 'src/components/Common/Form/Form.styled';
import Input from 'src/components/Common/Input';
import Button from 'src/components/Common/Button';
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

  return (
    <View style={formStyles.form}>
      <Text style={{ ...formStyles.titleForm, marginTop: 92 }}>Register</Text>
      <View style={stylesRegistration.avatarBox}>
        {/* avatar box + button */}
        <TouchableOpacity
          style={stylesRegistration.addAvatarButton}
          activeOpacity={0.7}
          accessibilityLabel="add avatar"
          onPress={() => console.log('add avatar')}
        >
          <AddAvatar fill={'#FF6C00'} stroke={'#FF6C00'} />
        </TouchableOpacity>
      </View>

      <Input />
      {/* <FormInput
        value={state.login}
        placeholder="Login"
        onChangeText={text =>
          setState(prevState => ({
            ...prevState,
            login: text,
          }))
        }
        placeholderTextColor={`${theme.colors.form.formPlaceholder}`}
      />
      <FormInput
        value={state.email}
        placeholder="email"
        onChangeText={text =>
          setState(prevState => ({
            ...prevState,
            email: text,
          }))
        }
        // placeholderTextColor={'red'}
        placeholderTextColor={`${theme.colors.form.formPlaceholder}`}
      />
      <FormInput
        value={state.password}
        placeholder="password"
        onChangeText={text =>
          setState(prevState => ({
            ...prevState,
            password: text,
          }))
        }
        // placeholderTextColor={'red'}
        placeholderTextColor={`${theme.colors.form.formPlaceholder}`}
      />*/}
      <Button
        style={{ marginBottom: 16 }}
        title="Register"
        activeOpacity={0.8}
        onPress={() => console.log(state)}
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
  );
}

export default RegistrationScreen;
