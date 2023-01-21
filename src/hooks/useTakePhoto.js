const { useState } = require('react');

import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';

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
    setHasCameraPermission(status === 'canAskAgain');
  };

  const setCameraFullScreen = status => {
    setIsFullScreen(status);
  };

  const switchCamera = () => {
    setCameraType(prevCameraType =>
      prevCameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  //TODO написати метод
  const switchFlashMode = () => {
    setFlashMode(
      flashMode === Camera.Constants.FlashMode.off
        ? Camera.Constants.FlashMode.on
        : Camera.Constants.FlashMode.off
    );
  };

  const takePicture = cameraRef => {
    const options = {
      quality: 1,
      base64: true,
      skipProcessing: false,
      fixOrientation: true,
      orientation: 'landscapeLeft',
    };
    const photo = cameraRef.takePictureAsync(options);
    console.log(photo);
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
