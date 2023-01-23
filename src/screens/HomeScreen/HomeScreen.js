import { NavigationContainer } from "@react-navigation/native";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import * as Location from "expo-location";
import useRoute from "src/hooks/useRoute";
import useTakePhoto from "src/hooks/useTakePhoto";

import { selectIsAuth } from "src/redux/auth/authSelectors";

function HomeScreen() {
  const isAuth = useSelector(selectIsAuth);
  const routing = useRoute(isAuth);
  const { setCameraPermission } = useTakePhoto();

  useEffect(() => {
    setCameraPermission();
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }
    })();
  }, []);

  return <NavigationContainer>{routing}</NavigationContainer>;
}

export default HomeScreen;
