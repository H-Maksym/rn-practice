import { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';

import { Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Container from 'src/components/Common/Container';
import { useVisibleTabBar } from 'src/hooks/useVisibleTabBar';

function MapScreen() {
  const { setVisibleBottom } = useVisibleTabBar();

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
  return (
    <Container>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 22,
          longitude: 6,
          latitudeDelta: 0.001,
          longitudeDelta: 0.006,
        }}
      >
        <Marker
          coordinate={{
            latitude: 22,
            longitude: 6,
          }}
          title="post"
        />
      </MapView>
    </Container>
  );
}

export default MapScreen;
