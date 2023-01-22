import { forwardRef } from 'react';
import { View, Text } from 'react-native';
import { Camera } from 'expo-camera';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import ButtonIcon from 'src/components/Common/ButtonIcon';
import { stylesCamera } from './Camera.styled';

const CustomCamera = forwardRef(
  ({ type, flash, takePhoto, switchCamera, switchFlashMode }, ref) => {
    return (
      <>
        <Camera
          style={{
            ...stylesCamera.camera,
          }}
          type={type}
          flashMode={flash}
          ref={ref}
        ></Camera>
        <View style={stylesCamera.buttonContainer}>
          <ButtonIcon
            title="switch flash mode"
            style={stylesCamera.buttonSwitchFlashMode}
          >
            <Icon
              style={!flash ? { color: '#ffffff50' } : { color: '#ffffff' }}
              onPress={switchFlashMode}
              name="lightning-bolt"
              size={24}
            />
          </ButtonIcon>
          <ButtonIcon
            onPress={takePhoto}
            title="take-photo"
            style={stylesCamera.buttonTakePhoto}
          >
            {/* <Icon onPress={takePhoto} name="camera" size={24} color="#FFFFFF" /> */}
            <View style={stylesCamera.takePhotoOut}>
              <View style={stylesCamera.takePhotoInner} />
            </View>
          </ButtonIcon>
          <ButtonIcon title="flip camera" style={stylesCamera.buttonTakePhoto}>
            <Icon
              onPress={switchCamera}
              name="camera-flip"
              size={24}
              color="#FFFFFF"
            />
          </ButtonIcon>
        </View>
      </>
    );
  }
);

export default CustomCamera;
