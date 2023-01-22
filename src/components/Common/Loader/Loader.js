import {
  useWindowDimensions,
  View,
  Text,
  ActivityIndicator,
} from 'react-native';
import { theme } from 'src/utils/theme';
import { stylesLoader } from './Loader.styled';

function Loader({ visible = true }) {
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

export default Loader;
