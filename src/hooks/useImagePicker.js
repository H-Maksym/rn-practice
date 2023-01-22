import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';

export const useImagePicker = (
  allowsEditing = true,
  aspect = [4, 3],
  quality = 1
) => {
  const [image, setImage] = useState(null);
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing,
      aspect,
      quality,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const resetImagePickerState = () => {
    setImage(null);
  };

  return { image, pickImage, resetImagePickerState };
};
