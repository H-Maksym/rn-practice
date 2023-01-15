import { StyleSheet, View, ImageBackground } from 'react-native';
import { ThemeProvider } from 'styled-components';
import { theme } from 'src/utils/theme';
import RegistrationScreen from 'src/screens/RegistrationScreen';
// import LoginScreen from 'screens/LoginScreen';
export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <View style={styles.container}>
        <ImageBackground
          source={require('src/assets/image/backgroundImage.jpg')}
          style={styles.imageBackground}
        >
          <RegistrationScreen />
        </ImageBackground>
      </View>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    // resizeMode: 'cover',
    justifyContent: 'center',
  },
});

// const loadGreen = (levels => {
//   const zabor = [i];

//   const lengthLevels = levels.length;
//   if (lengthLevels <= 2) {
//     return 0;
//   }

//   for (let i = 0; i <= lengthLevels; i++) {
//     const maxValue = Math.max(levels[i], levels[lengthLevels - 1]);
//   }
// })([7, 2, 1]);

// console.log(loadGreen);
