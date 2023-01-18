import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import useRoute from 'src/hooks/useRoute';
import { selectIsAuth } from 'src/redux/auth/authSelectors';

function HomeScreen() {
  const isAuth = useSelector(selectIsAuth);
  const routing = useRoute(isAuth);

  return <NavigationContainer>{routing}</NavigationContainer>;
}

export default HomeScreen;
