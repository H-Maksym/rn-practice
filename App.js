import { Provider } from 'react-redux';
import { store } from 'src/redux/store';
import useLoadFonts from 'src/hooks/useLoadFonts';

import { ThemeProvider } from 'styled-components';
import { theme } from 'src/utils/theme';

import HomeScreen from 'src/screens/HomeScreen';
import Loader from './src/components/Common/Loader';
import { View } from 'react-native-web';

export default function App() {
  const appIsReady = useLoadFonts();

  if (!appIsReady) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <HomeScreen />
      </Provider>
    </ThemeProvider>
  );
}
