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

  return (
    <Container>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: coordinates.latitude ? coordinates.latitude : 0,
          longitude: coordinates.longitude ? coordinates.longitude : 0,
          latitudeDelta: 0.001,
          longitudeDelta: 0.006,
        }}
      >
        <Marker
          coordinate={{
            latitude: coordinates.latitude ? coordinates.latitude : 0,
            longitude: coordinates.longitude ? coordinates.longitude : 0,
          }}
          title={titlePlaceByCoordinates}
        />
      </MapView>
    </Container>
  );
}

export default MapScreen;
