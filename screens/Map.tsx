import { useCallback, useLayoutEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import IconButton from '../components/UI/IconButton';

interface IMapProps {
  navigation: any;
  route: any;
}

const Map: React.FunctionComponent<IMapProps> = ({ navigation, route }) => {
  const initialLocation = route.params && {
    lat: route.params.initialLat,
    lon: route.params.initialLon,
  };
  const [selectedLocation, setSelectedLocation] =
    useState<any>(initialLocation);

  const region = {
    latitude: initialLocation ? initialLocation.lat : 23.7845177,
    longitude: initialLocation ? initialLocation.lon : 90.3621518,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.421,
  };
  function selectLocationHandler(event: any) {
    if (initialLocation) {
      return;
    }

    const lat = event.nativeEvent.coordinate.latitude;
    const lon = event.nativeEvent.coordinate.longitude;
    setSelectedLocation({
      lat: lat,
      lon: lon,
    });
  }
  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert(
        'No location picked!',
        'You have to pick a location (by tapping on the map) first'
      );
      return;
    }
    navigation.navigate('AddPlace', {
      pickedLat: selectedLocation.lat,
      pickedLon: selectedLocation.lon,
    });
  }, [navigation, selectedLocation]);

  useLayoutEffect(() => {
    if (initialLocation) {
      return;
    }

    navigation.setOptions({
      headerRight: ({ tintColor }: any) => (
        <IconButton
          icon='save'
          size={24}
          color={tintColor}
          onPress={savePickedLocationHandler}
        />
      ),
    });
  }, [navigation, savePickedLocationHandler, initialLocation]);
  return (
    <MapView
      style={styles.map}
      initialRegion={region}
      onPress={selectLocationHandler}
    >
      {selectedLocation && (
        <Marker
          title='Picked Location'
          coordinate={{
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lon,
          }}
        />
      )}
    </MapView>
  );
};

export default Map;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
