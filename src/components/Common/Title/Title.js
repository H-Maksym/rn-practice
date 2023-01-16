import { Text } from 'react-native';
import { stylesTitle } from './Title.styled';

function Title({ style, title, ...props }) {
  return <Text style={{ ...style, ...stylesTitle.title }}>{title}</Text>;
}

Title.propTypes = {
  style: PropTypes.object,
  title: PropTypes.string,
};

Title.defaultProps = {
  style: {},
  title: '',
};

export default Title;
