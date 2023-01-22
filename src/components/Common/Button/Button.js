import { stylesButton } from './Button.styled';
import { TouchableOpacity, Text } from 'react-native';
function Button({ onPress = () => {}, title, style, activeOpacity }) {
  return (
    <TouchableOpacity
      style={{ ...stylesButton.buttonContainer, ...style }}
      onPress={onPress}
      activeOpacity={activeOpacity}
    >
      <Text style={stylesButton.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

export default Button;
