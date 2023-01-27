import { useState, useEffect } from "react";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";

function useLoadFonts() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync({
          "Roboto-Regular": require("src/assets/fonts/roboto/Roboto-Regular.ttf"),
          "Roboto-Medium": require("src/assets/fonts/roboto/Roboto-Medium.ttf"),
          "Roboto-Bold": require("src/assets/fonts/roboto/Roboto-Bold.ttf"),
        });
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        // await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  return appIsReady;
}

export default useLoadFonts;
