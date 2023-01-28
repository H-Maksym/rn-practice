import { StyleSheet, Dimensions } from 'react-native';

export const stylesCamera = StyleSheet.create({
  camera: {
    flex: 1,
    backgroundColor: '#000000',
  },
  buttonContainer: {
    flexDirection: 'row',
    backgroundColor: '#000000',
    justifyContent: 'space-between',
    paddingHorizontal: 72,
    paddingVertical: 16,
  },

  buttonSwitchFlashMode: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTakePhoto: {
    alignItems: 'center',
    justifyContent: 'center',
    // marginLeft: Dimensions.get('window').width / 2 - 12,
  },
  takePhotoOut: {
    borderWidth: 2,
    borderColor: 'white',
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },

  takePhotoInner: {
    borderWidth: 2,
    borderColor: 'white',
    height: 40,
    width: 40,
    backgroundColor: 'white',
    borderRadius: 50,
  },
  buttonSwitchCamera: {},
});
