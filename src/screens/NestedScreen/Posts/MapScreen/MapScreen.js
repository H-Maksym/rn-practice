<<<<<<< HEAD
import { useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useVisibleTabBar } from "src/hooks/useVisibleTabBar";
import MapView, { Marker } from "react-native-maps";
import Container from "src/components/Common/Container";
import ButtonIcon from "src/components/Common/ButtonIcon/ButtonIcon";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { stylesMapScreen } from "./MapScreen.styled";

function MapScreen({ route, navigation }) {
  const { setVisibleBottom } = useVisibleTabBar();
  const { coordinates, titlePlaceByCoordinates } = route.params?.location;
  const { fromScreen } = route.params;
=======
import { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';

import { Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Container from 'src/components/Common/Container';
import { useVisibleTabBar } from 'src/hooks/useVisibleTabBar';

function MapScreen() {
  const { setVisibleBottom } = useVisibleTabBar();
>>>>>>> main

  useFocusEffect(
    useCallback(() => {
      //INFO when focus screen
      setVisibleBottom(false);
      return () => {
        //INFO when unfocus screen
        setVisibleBottom(true);
      };
    }, [])
  );
<<<<<<< HEAD

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <ButtonIcon
          title="go-back"
          onPress={() => navigation.goBack()}

          // onPress={() => navigation.navigate(fromScreen)}
        >
          <Icon
            name="arrow-left"
            style={stylesMapScreen.headerIconGoBack}
            size={24}
          />
        </ButtonIcon>
      ),
    });
  }, [navigation]);

=======
>>>>>>> main
  return (
    <Container>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
<<<<<<< HEAD
          latitude: coordinates.latitude ? coordinates.latitude : 0,
          longitude: coordinates.longitude ? coordinates.longitude : 0,
=======
          latitude: 22,
          longitude: 6,
>>>>>>> main
          latitudeDelta: 0.001,
          longitudeDelta: 0.006,
        }}
      >
        <Marker
          coordinate={{
<<<<<<< HEAD
            latitude: coordinates.latitude ? coordinates.latitude : 0,
            longitude: coordinates.longitude ? coordinates.longitude : 0,
          }}
          title={titlePlaceByCoordinates}
=======
            latitude: 22,
            longitude: 6,
          }}
          title="post"
>>>>>>> main
        />
      </MapView>
    </Container>
  );
}

export default MapScreen;
