import PropTypes from 'prop-types';
import { View } from 'react-native';
import { stylesContainer } from './Container.styled';

function Container({ style, children, ...props }) {
  return (
    <View style={{ ...style, ...stylesContainer.container }} {...props}>
      {children}
    </View>
  );
}

Container.propTypes = {
  style: PropTypes.object,
  children: PropTypes.node.isRequired,
};

Container.defaultProps = {
  style: {},
};

export default Container;
