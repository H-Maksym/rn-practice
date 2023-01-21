import PropTypes from 'prop-types';
import { stylesButton } from './Button.styled';
import { TouchableOpacity, Text } from 'react-native';
function Button({
  onPress,
  title,
  style,
  styleTitle,
  activeOpacity,
  ...props
}) {
  return (
    <TouchableOpacity
      style={{ ...stylesButton.buttonContainer, ...style }}
      onPress={onPress}
      activeOpacity={activeOpacity}
      {...props}
    >
      <Text style={{ ...stylesButton.buttonText, ...styleTitle }}>{title}</Text>
    </TouchableOpacity>
  );
}

Button.propTypes = {
  style: PropTypes.object,
  styleTitle: PropTypes.object,

  activeOpacity: PropTypes.number,
  onPress: PropTypes.func,
};

Button.defaultProps = {
  style: {},
  styleTitle: {},

  activeOpacity: 0.8,
  onPress: () => {},
};

export default Button;
