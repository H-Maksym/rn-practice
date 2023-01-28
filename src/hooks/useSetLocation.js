// import { useState } from 'react';
// import * as Location from 'expo-location';

// export const useSetLocation = () => {
//   const [hasLocationPermission, setHasLocationPermission] = useState(null);
//   const [errorMsg, setErrorMsg] = useState(null);
//   const [coords, SetCoords] = useState(null);

//   const setLocationPermission = async () => {
//     let { status } = await Location.requestForegroundPermissionsAsync();
//     setHasLocationPermission(status === 'granted');
//   };

//   const getLocation = () => {
//     let location = Location.getCurrentPositionAsync({});
//     //   const coords = {
//     //     latitude: location.coords.latitude,
//     //     longitude: location.coords.longitude,
//     //   };
//     return location.then(location);
//   };

//   return { coords, errorMsg, setLocationPermission, getLocation };
// };
