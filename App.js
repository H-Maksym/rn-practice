import { useCallback } from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from 'src/utils/theme';
import Container from 'src/components/Common/Container';
// import RegistrationScreen from 'src/screens/RegistrationScreen';
import LoginScreen from 'screens/LoginScreen';

import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

const loadFonts = async () => {
  await Font.loadAsync({});
};

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    'Roboto-Regular': require('./src/assets/fonts/roboto/Roboto-Regular.ttf'),
    'Roboto-Bold': require('./src/assets/fonts/roboto/Roboto-Bold.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <Container onLayout={onLayoutRootView}>
        {/*//TODO Прописати route */}
        {/* <RegistrationScreen /> */}
        <LoginScreen />
      </Container>
    </ThemeProvider>
  );
}
