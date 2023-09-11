import { View, Text, StyleSheet } from 'react-native';
import PlacesList from '../components/Places/PlacesList';
import { useIsFocused } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { fetchPlaces } from '../utils/database';

interface IAllPlacesProps {
  route: any;
}

const AllPlaces: React.FunctionComponent<IAllPlacesProps> = ({ route }) => {
  const [loadedPlaces, setLoadedPlaces] = useState<any>([]);
  const isFocused = useIsFocused();
  useEffect(() => {
    async function loadPlaces() {
      const places = await fetchPlaces();
      setLoadedPlaces(places);
    }

    if (isFocused) {
      loadPlaces();
      // setLoadedPlaces((currPlaces: any) => [
      //   ...currPlaces,
      //   route.params?.place,
      // ]);
    }
  }, [isFocused]);
  return <PlacesList places={loadedPlaces} />;
};

export default AllPlaces;

const styles = StyleSheet.create({});
