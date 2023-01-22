import PropTypes from 'prop-types';
import { useState, forwardRef } from 'react';
import { View, Text, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from 'src/utils/theme';
import { stylesInput } from './Input.styled';

const Input = forwardRef(
  (
    {
      style,
      styleInputContainer,
      label,
      iconName,
      error,
      password,
      onFocus,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hidePassword, setHidePassword] = useState(password);
    return (
      <View style={style}>
        <Text>{label}</Text>
        <View
          style={[
            stylesInput.inputContainer,
            {
              borderColor: error
                ? theme.colors.form.formErrorMessage
                : isFocused
                ? theme.colors.form.formInputBorderAccent
                : theme.colors.form.formInputBorder,
              backgroundColor: isFocused && theme.colors.white,
            },
            styleInputContainer,
          ]}
        >
          <Icon name={iconName} style={stylesInput.iconInput} />
          <TextInput
            ref={ref}
            secureTextEntry={password ? hidePassword : false}
            autoCorrect={false}
            onFocus={() => {
              onFocus();
              setIsFocused(true);
            }}
            onBlur={() => {
              setIsFocused(false);
            }}
            styled={{ ...stylesInput.textInput }}
            {...props}
          />
          {password && (
            <Icon
              name={hidePassword ? 'eye-outline' : 'eye-off-outline'}
              style={stylesInput.iconShowPassword}
              onPress={() => setHidePassword(!hidePassword)}
            />
          )}
        </View>
        {error && <Text style={stylesInput.errorMessageInput}>{error}</Text>}
      </View>
    );
  }
);

Input.displayName = 'Input';

Input.propTypes = {
  style: PropTypes.object,
  label: PropTypes.string,
  iconName: PropTypes.string,
  error: PropTypes.string,
  password: PropTypes.bool,
  onFocus: PropTypes.func,
};

Input.defaultProps = {
  style: {},
  label: '',
  iconName: '',
  error: '',
  password: false,
  onFocus: () => {},
};

export default Input;
