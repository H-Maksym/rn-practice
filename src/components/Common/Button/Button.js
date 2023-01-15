import { stylesButton } from './Button.styled';
import { TouchableOpacity, Text } from 'react-native';
function Button({ onPress, title, activeOpacity }) {
  return (
    <TouchableOpacity
      style={stylesButton.buttonContainer}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={stylesButton.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

export default Button;
