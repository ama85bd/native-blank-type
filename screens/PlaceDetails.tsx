import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import PlaceForm from '../components/Places/PlaceForm';
import { Place } from '../models/Place';
import { fetchPlaceDetails, insertPlace } from '../utils/database';
import OutlineButton from '../components/UI/OutlineButton';
import { Colors } from '../constants/colors';
import { useEffect, useState } from 'react';

interface IPlaceDetailsProps {
  route: any;
  navigation: any;
}

const PlaceDetails: React.FunctionComponent<IPlaceDetailsProps> = ({
  route,
  navigation,
}) => {
  const [fetchedPlace, setFetchedPlace] = useState<any>();

  const selectedPlaceId = route.params.placeId;
  function showOnMapHandler() {
    navigation.navigate('Map', {
      initialLat: fetchedPlace.location.lat,
      initialLon: fetchedPlace.location.lon,
    });
  }
  useEffect(() => {
    async function loadPlaceData() {
      const place: any = await fetchPlaceDetails(selectedPlaceId);
      setFetchedPlace(place);
      navigation.setOptions({
        title: place.title,
      });
    }

    loadPlaceData();
  }, [selectedPlaceId]);

  if (!fetchedPlace) {
    return (
      <View style={styles.fallback}>
        <Text>Loading plase data...</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <Image source={{ uri: fetchedPlace.imageUri }} style={styles.image} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{fetchedPlace.address}</Text>
        </View>
        <OutlineButton icon='map' onPress={showOnMapHandler}>
          View On Map
        </OutlineButton>
      </View>
    </ScrollView>
  );
};

export default PlaceDetails;

const styles = StyleSheet.create({
  fallback: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: '35%',
    minHeight: 300,
    width: '100%',
  },
  locationContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary500,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
