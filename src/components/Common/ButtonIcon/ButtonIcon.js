import PropTypes from 'prop-types';
// import { stylesButton } from './ButtonIcon.styled';
import { TouchableOpacity } from 'react-native';
function ButtonIcon({
  onPress,
  title,
  style,
  activeOpacity,
  children,
  ...props
}) {
  return (
    <TouchableOpacity
      style={style}
      accessibilityRole="button"
      accessibilityLabel={title}
      onPress={onPress}
      activeOpacity={activeOpacity}
      {...props}
    >
      {children}
    </TouchableOpacity>
  );
}

ButtonIcon.propTypes = {
  style: PropTypes.object,
  activeOpacity: PropTypes.number,
  onPress: PropTypes.func,
  children: PropTypes.node.isRequired,
};

ButtonIcon.defaultProps = {
  style: {},
  activeOpacity: 0.8,
  onPress: () => {},
};

export default ButtonIcon;
