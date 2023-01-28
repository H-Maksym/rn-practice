<<<<<<< HEAD
const { useState } = require("react");

import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
=======
const { useState } = require('react');

import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
>>>>>>> main

export default function useTakePhoto() {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);

  const onCameraReady = () => {
    setIsCameraReady(true);
  };

  const setCameraPermission = async () => {
    MediaLibrary.requestPermissionsAsync();
    const { status } = await Camera.requestCameraPermissionsAsync();
<<<<<<< HEAD
    setHasCameraPermission(status === "granted");
  };

  const setCameraFullScreen = (status) => {
=======
    setHasCameraPermission(status === 'canAskAgain');
  };

  const setCameraFullScreen = status => {
>>>>>>> main
    setIsFullScreen(status);
  };

  const switchCamera = () => {
<<<<<<< HEAD
    setCameraType((prevCameraType) =>
=======
    setCameraType(prevCameraType =>
>>>>>>> main
      prevCameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

<<<<<<< HEAD
=======
  //TODO написати метод
>>>>>>> main
  const switchFlashMode = () => {
    setFlashMode(
      flashMode === Camera.Constants.FlashMode.off
        ? Camera.Constants.FlashMode.on
        : Camera.Constants.FlashMode.off
    );
  };

<<<<<<< HEAD
  const takePicture = (cameraRef) => {
=======
  const takePicture = cameraRef => {
>>>>>>> main
    const options = {
      quality: 1,
      base64: true,
      skipProcessing: false,
      fixOrientation: true,
<<<<<<< HEAD
      orientation: "landscapeLeft",
=======
      orientation: 'landscapeLeft',
>>>>>>> main
    };
    const photo = cameraRef.takePictureAsync(options);
    return photo;
  };

  return {
    hasCameraPermission,
    isCameraReady,
    isFullScreen,
    cameraType,
    flashMode,
    onCameraReady,
    setCameraPermission,
    setCameraFullScreen,
    switchCamera,
    switchFlashMode,
    takePicture,
  };
}
