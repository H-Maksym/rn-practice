import { useState } from 'react';
import { formStyles } from 'src/components/Common/Form/Form.styled';
import Button from 'src/components/Common/Button';
import { View, Text } from 'react-native';
import { theme } from 'src/utils/theme';

const initialState = {
  login: '',
  email: '',
  password: '',
};
function RegistrationScreen() {
  const [state, setState] = useState(initialState);

  return (
    <View style={formStyles.form}>
      <Text style={{ ...formStyles.titleForm, marginTop: 92 }}>
        Registration
      </Text>
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
      <Button title="Register" />
    </View>
  );
}

export default RegistrationScreen;
