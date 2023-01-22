import { useState } from "react";
// import axios from 'axios';
import { XMLParser } from "fast-xml-parser";

const coordApi = {
  lat: 50.37127995507571,
  lon: 30.461804576247705,
};

// export const useGetPlaceByCoordinates = () => {
//   const [place, SetPlace] = useState();

//   const getInfoPlaceByCoords = async api => {
//     // const { data } = await axios.get(
//     //   `https://nominatim.openstreetmap.org/reverse?lat=${api.lat}&lon=${api.lon}`
//     // );
//     const options = {
//       ignoreAttributes: false,
//     };
//     const parser = new XMLParser(options);
//     let jsonObj = parser.parse(data);
//     SetPlace(jsonObj);
//   };

//   return { place, getInfoPlaceByCoords };
// };
