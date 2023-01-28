import PropTypes from 'prop-types';

import {
  useWindowDimensions,
  View,
  Text,
  ActivityIndicator,
} from 'react-native';
import { theme } from 'src/utils/theme';
import { stylesLoader } from './Loader.styled';

function Loader({ visible }) {
  const { height, width } = useWindowDimensions();
  return (
    <>
      {visible && (
        <View style={[stylesLoader.loaderContainer, { height, width }]}>
          <View style={stylesLoader.Loader}>
            <ActivityIndicator size="large" color={theme.colors.accent} />
            <Text style={stylesLoader.textLoader}>Loading...</Text>
          </View>
        </View>
      )}
    </>
  );
}

Loader.propTypes = {
  visible: PropTypes.bool,
};

Loader.defaultProps = {
  visible: true,
};

export default Loader;
