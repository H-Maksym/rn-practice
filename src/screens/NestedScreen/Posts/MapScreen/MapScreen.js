import { useEffect } from "react";
import { useVisibleTabBar } from "src/hooks/useVisibleTabBar";
import MapView, { Marker } from "react-native-maps";
import Container from "src/components/Common/Container";
import { Text } from "react-native";

function MapScreen({ route, navigation }) {
  console.log(route);
  const { setVisibleBottom } = useVisibleTabBar();
  const { coordinates, titlePlaceByCoordinates, fromScreen } =
    route.params?.location;
  useEffect(() => {
    setVisibleBottom(false);
    return () => {
      setVisibleBottom(true);
    };
  }, []);

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
      <Text
        style={{ fontSize: 40 }}
        onPress={() => {
          navigation.navigate(fromScreen);
        }}
      >
        go back{" "}
      </Text>
    </Container>
  );
}

export default MapScreen;
