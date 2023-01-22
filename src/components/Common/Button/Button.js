import PropTypes from 'prop-types';
import { stylesButton } from './Button.styled';
import { TouchableOpacity, Text } from 'react-native';
function Button({ onPress, title, style, activeOpacity, ...props }) {
  return (
    <TouchableOpacity
      style={{ ...stylesButton.buttonContainer, ...style }}
      onPress={onPress}
      activeOpacity={activeOpacity}
      {...props}
    >
      <Text style={stylesButton.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

Button.propTypes = {
  style: PropTypes.object,
  activeOpacity: PropTypes.number,
  onPress: PropTypes.func,
};

Button.defaultProps = {
  style: {},
  activeOpacity: 0.8,
  onPress: () => {},
};

export default Button;
