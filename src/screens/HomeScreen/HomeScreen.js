<<<<<<< HEAD
import { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import * as Location from "expo-location";

import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "src/redux/auth/firebaseAPI";
import { selectIsAuth } from "src/redux/auth/authSelectors";

import useRoute from "src/hooks/useRoute";
import useTakePhoto from "src/hooks/useTakePhoto";
=======
import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import useRoute from 'src/hooks/useRoute';
import { selectIsAuth } from 'src/redux/auth/authSelectors';
>>>>>>> main

function HomeScreen() {
  const isAuth = useSelector(selectIsAuth);
  const routing = useRoute(isAuth);
<<<<<<< HEAD
  const { setCameraPermission } = useTakePhoto();
  const dispatch = useDispatch();

  useEffect(() => {
    setCameraPermission();
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }
    })();
    dispatch(getUserInfo());
  }, []);
=======
>>>>>>> main

  return <NavigationContainer>{routing}</NavigationContainer>;
}

export default HomeScreen;
