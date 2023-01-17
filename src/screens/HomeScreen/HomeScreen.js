import useRoute from 'src/hooks/useRoute';
import { NavigationContainer } from '@react-navigation/native';

function HomeScreen() {
  const isAuth = true;
  const routing = useRoute(isAuth);
  return <NavigationContainer>{routing}</NavigationContainer>;
}

export default HomeScreen;
