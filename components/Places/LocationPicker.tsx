import { useEffect, useState } from 'react';
import { View, StyleSheet, Alert, Image, Text } from 'react-native';
import { Colors } from '../../constants/colors';
import OutlineButton from '../UI/OutlineButton';
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from 'expo-location';
import { getMapPreview } from '../../utils/location';
import {
  useNavigation,
  useRoute,
  useIsFocused,
} from '@react-navigation/native';

interface ILocationPickerProps {
  onLocationPick: (location: any) => void;
}

const LocationPicker: React.FunctionComponent<ILocationPickerProps> = ({
  onLocationPick,
}) => {
  const isFocused = useIsFocused();
  const navigation: any = useNavigation();
  const route: any = useRoute();

  const [pickedLocation, setPickedLocation] = useState<any>();
  const [locationPermissionInformation, requestPermission] =
    useForegroundPermissions();

  useEffect(() => {
    if (isFocused && route.params) {
      const mapPickedLocation = route.params && {
        lat: route.params.pickedLat,
        lon: route.params.pickedLon,
      };
      setPickedLocation(mapPickedLocation);
    }
  }, [route, isFocused]);

  useEffect(() => {
    onLocationPick(pickedLocation);
  }, [pickedLocation, onLocationPick]);

  async function verifyPermissions() {
    if (
      locationPermissionInformation?.status === PermissionStatus.UNDETERMINED
    ) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }
    if (locationPermissionInformation?.status === PermissionStatus.DENIED) {
      Alert.alert(
        'Insufficient Permissions!',
        'You need to grant location permissions to use this app'
      );
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }
    return true;
  }

  async function getLocationHandler() {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const location = await getCurrentPositionAsync();
    setPickedLocation({
      lat: location.coords.latitude,
      lon: location.coords.longitude,
    });
  }
  function pickOnMapHandler() {
    navigation.navigate('Map');
  }

  let locationPreview = <Text>No location picked yet</Text>;

  if (pickedLocation) {
    locationPreview = (
      <Image
        style={styles.image}
        source={{ uri: getMapPreview(pickedLocation.lat, pickedLocation.lon) }}
      />
    );
  }
  return (
    <View>
      <View style={styles.mapPreview}>{locationPreview}</View>
      <View style={styles.actions}>
        <OutlineButton icon='location' onPress={getLocationHandler}>
          Locate User
        </OutlineButton>
        <OutlineButton icon='map' onPress={pickOnMapHandler}>
          Pick on Map
        </OutlineButton>
      </View>
    </View>
  );
};

export default LocationPicker;

const styles = StyleSheet.create({
  mapPreview: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    overflow: 'hidden',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
